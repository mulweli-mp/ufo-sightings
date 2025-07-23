import {
	fetchSightings,
	getSightingsFromCache,
	saveSightingsToCache,
} from "@/features/sightings/sightingsService";
import { AppDispatch } from "@/store/store";
import { Sighting } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SightingsState {
	data: Sighting[];
	loading: boolean;
	error: string | null;
	isOfflineData: boolean;
}

const initialState: SightingsState = {
	data: [],
	loading: false,
	error: null,
	isOfflineData: false,
};

const loadAndDispatchCachedData = async (dispatch: AppDispatch) => {
	const cached = await getSightingsFromCache();
	if (cached && cached.length > 0) {
		dispatch(
			getSightings.fulfilled({ data: cached, isOffline: true }, "", undefined)
		);
	}
};

// Thunk: fetch data from API, fallback to cache if failed
export const getSightings = createAsyncThunk<
	{ data: Sighting[]; isOffline: boolean },
	void,
	{ dispatch: AppDispatch; rejectValue: string }
>("sightings/getSightings", async (_, { dispatch, rejectWithValue }) => {
	try {
		await loadAndDispatchCachedData(dispatch); // Show cached data instantly

		const data = await fetchSightings(); // Try to fetch fresh data
		await saveSightingsToCache(data); // Cache fresh data
		return { data, isOffline: false };
	} catch {
		const cached = await getSightingsFromCache();
		if (cached && cached.length > 0) {
			return { data: cached, isOffline: true }; // Fallback to cache
		}
		return rejectWithValue(
			"Failed to fetch sightings and no offline data available"
		);
	}
});

// Slice
const sightingsSlice = createSlice({
	name: "sightings",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSightings.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getSightings.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload.data;
				state.isOfflineData = action.payload.isOffline;
			})
			.addCase(getSightings.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload ?? action.error.message ?? "Failed to fetch sightings";
			});
	},
});

export default sightingsSlice.reducer;
