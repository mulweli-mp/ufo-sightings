import { getSightings } from "@/features/sightings/sightingsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useSightings = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, loading, error, isOfflineData } = useSelector(
		(state: RootState) => state.sightings
	);

	useEffect(() => {
		if (data.length === 0 && !loading && !error) {
			dispatch(getSightings());
		}
	}, [dispatch, data, loading, error]);

	return { data, loading, error, isOfflineData };
};
