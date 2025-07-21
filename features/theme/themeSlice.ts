import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemePreference = "light" | "dark" | "system";

interface ThemeState {
	preference: ThemePreference;
}

const initialState: ThemeState = {
	preference: "system",
};

const THEME_KEY = "user-theme-preference";

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setThemePreference: (state, action: PayloadAction<ThemePreference>) => {
			state.preference = action.payload;
			AsyncStorage.setItem(THEME_KEY, action.payload).catch((err) =>
				console.warn("Failed to save theme preference", err)
			);
		},
		setInitialTheme: (state, action: PayloadAction<ThemePreference>) => {
			state.preference = action.payload;
		},
	},
});

export const { setThemePreference, setInitialTheme } = themeSlice.actions;

export const loadStoredTheme = async (dispatch: any) => {
	try {
		const stored = await AsyncStorage.getItem(THEME_KEY);
		if (stored === "light" || stored === "dark" || stored === "system") {
			dispatch(setInitialTheme(stored));
		}
	} catch (err) {
		console.warn("Failed to load stored theme", err);
	}
};

export default themeSlice.reducer;
