import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React, { JSX } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";

import CustomStatusBar from "./CustomStatusBar";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type HeaderProps = {
	title?: string;
	type?: "homeHeader" | "default";
};

const ICON_SIZE = 24;

const getIcon = (type: HeaderProps["type"]): JSX.Element => {
	if (type === "homeHeader") {
		return <Ionicons name="menu" size={ICON_SIZE} color="white" />;
	}
	return <Ionicons name="arrow-back-outline" size={ICON_SIZE} color="white" />;
};

const Header: React.FC<HeaderProps> = ({ title, type = "default" }) => {
	const colors = useThemeColor();
	const backgroundColor =
		colors.themeName === "dark" ? colors.background : colors.primary;

	const router = useRouter();
	const navigation = useNavigation();

	const handlePress = () => {
		if (type === "homeHeader") {
			navigation.dispatch(DrawerActions.toggleDrawer());
		} else {
			router.back();
		}
	};

	return (
		<>
			<CustomStatusBar />
			<ThemedView style={[styles.container, { backgroundColor }]}>
				<TouchableOpacity
					onPress={handlePress}
					style={styles.iconContainer}
					accessible
					accessibilityLabel="Back Button"
				>
					{getIcon(type)}
				</TouchableOpacity>

				{type === "homeHeader" ? (
					<Image
						source={require("@/assets/images/ufo_logo.png")}
						style={styles.logo}
						resizeMode="contain"
					/>
				) : (
					<ThemedText style={styles.title} type="title">
						{title}
					</ThemedText>
				)}
			</ThemedView>
		</>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		height: DEVICE_HEIGHT * 0.09,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 16,
	},

	iconContainer: {
		position: "absolute",
		left: 8,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		width: DEVICE_HEIGHT * 0.07,
	},

	logo: {
		height: 60,
		width: 120,
	},

	title: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
});
