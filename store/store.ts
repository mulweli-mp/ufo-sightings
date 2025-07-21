import sightingsReducer from "@/features/sightings/sightingsSlice";
import themeReducer from "@/features/theme/themeSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		sightings: sightingsReducer,
		theme: themeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
