import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

type ButtonProps = {
	title: string;
	onPress: () => void;
	disabled?: boolean;
	style?: ViewStyle;
};

export const Button = ({ title, onPress, disabled, style }: ButtonProps) => {
	const colors = useThemeColor();

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [
				{ backgroundColor: colors.primary },
				styles.button,
				disabled && styles.disabled,
				pressed && styles.pressed,
				style,
			]}
		>
			<ThemedText style={styles.text}> {title} </ThemedText>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 12,
		shadowColor: "#0ff",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.6,
		shadowRadius: 6,
		elevation: 5,
	},
	text: {
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
	},
	pressed: {
		backgroundColor: "#0cc",
	},
	disabled: {
		backgroundColor: "#999",
		opacity: 0.6,
	},
});
