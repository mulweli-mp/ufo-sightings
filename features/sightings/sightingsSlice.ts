import {
	fetchSightings,
	getSightingsFromCache,
	saveSightingsToCache,
} from "@/features/sightings/sightingsService";
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

export const getSightings = createAsyncThunk<
	{ data: Sighting[]; isOffline: boolean },
	void,
	{ rejectValue: string }
>("sightings/getSightings", async (_, { rejectWithValue }) => {
	try {
		const data = await fetchSightings();
		await saveSightingsToCache(data);
		return { data, isOffline: false };
	} catch (err) {
		const cached = await getSightingsFromCache();
		if (cached) {
			return { data: cached, isOffline: true };
		}
		return rejectWithValue(
			"Failed to fetch sightings and no offline data available"
		);
	}
});

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
