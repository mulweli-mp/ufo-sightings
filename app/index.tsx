import { ThemedView } from "@/components/general/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";

export default function Index() {
	const colors = useThemeColor();

	useEffect(() => {
		//A 1 second delay is implimented to enhance user experience
		setTimeout(() => {
			router.replace("./home");
		}, 1000);
	}, []);
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
				style={{
					height: 200,
					width: 200,
				}}
			/>
			<ActivityIndicator size={"large"} color={colors.primary} />
		</ThemedView>
	);
}
