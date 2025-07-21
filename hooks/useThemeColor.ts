import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export function useThemeColor() {
	const systemTheme = useColorScheme() ?? "light";

	const preference = useSelector((state: RootState) => state.theme.preference);

	const resolvedTheme = preference === "system" ? systemTheme : preference;

	return Colors[resolvedTheme];
}
