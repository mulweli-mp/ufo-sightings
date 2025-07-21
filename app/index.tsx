import { ErrorMessage } from "@/components/general";
import { ThemedView } from "@/components/general/ThemedView";
import { loadStoredTheme } from "@/features/theme/themeSlice";
import { useSightings } from "@/hooks/useSightings";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { useDispatch } from "react-redux";

export default function Index() {
	const colors = useThemeColor();
	const [loaded, setLoaded] = useState(false);

	const { data, loading, error } = useSightings();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!loading && data.length > 0 && !error && loaded) {
			router.replace("/home");
		}
	}, [data, loading, error]);

	useEffect(() => {
		loadStoredTheme(dispatch).finally(() => setLoaded(true));
	}, []);

	if (error) return <ErrorMessage message={error} />;

	return (
		<ThemedView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Image
				source={require("@/assets/images/ufo_logo.png")}
				style={{ height: 200, width: 200 }}
			/>
			<ActivityIndicator size="large" color={colors.primary} />
		</ThemedView>
	);
}
