import { ThemedText } from "@/components/general";
import { ThemedView } from "@/components/general/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Index() {
	const colors = useThemeColor();

	return (
		<ThemedView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ThemedText>Welcome To UFO Sighting</ThemedText>
		</ThemedView>
	);
}
