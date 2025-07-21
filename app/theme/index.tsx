import { Header, ThemedText, ThemedView } from "@/components/general";
import { setThemePreference } from "@/features/theme/themeSlice";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AppDispatch, RootState } from "@/store/store";
import {
	Pressable,
	PressableStateCallbackType,
	StyleSheet,
	TextStyle,
	ViewStyle,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ThemeOptions = ["light", "dark", "system"] as const;

export default function ThemesScreen() {
	const colors = useThemeColor();
	const dispatch = useDispatch<AppDispatch>();
	const selected = useSelector((state: RootState) => state.theme.preference);

	const getButtonStyle =
		(theme: string): ((state: PressableStateCallbackType) => ViewStyle) =>
		({ pressed }) => {
			const isSelected = selected === theme;
			return {
				...styles.button,
				backgroundColor: isSelected ? colors.primary : colors.card,
				transform: [{ scale: pressed ? 0.98 : 1 }],
				shadowColor: theme === "dark" && isSelected ? colors.primary : "#000",
				shadowOpacity: theme === "dark" && isSelected ? 0.8 : 0.1,
				shadowOffset: { width: 0, height: 4 },
				shadowRadius: 10,
				elevation: isSelected ? 4 : 1,
			};
		};

	const getTextStyle = (theme: string): TextStyle => ({
		color: "#fff",
		textTransform: "capitalize",
		fontWeight: "600",
		letterSpacing: 0.5,
	});

	return (
		<>
			<Header title="Select Theme" />
			<ThemedView style={styles.container}>
				{ThemeOptions.map((theme) => (
					<Pressable
						key={theme}
						onPress={() => dispatch(setThemePreference(theme))}
						style={getButtonStyle(theme)}
					>
						<ThemedText style={getTextStyle(theme)}>{theme}</ThemedText>
					</Pressable>
				))}
			</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	button: {
		paddingVertical: 14,
		paddingHorizontal: 18,
		marginBottom: 12,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});
