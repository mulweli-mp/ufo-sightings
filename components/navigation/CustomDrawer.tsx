import {
	Entypo,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appVersion } from "@/utilities/getVersionNumber";
import LottieView from "lottie-react-native";
import { JSX } from "react";
import { CustomStatusBar, ThemedText, ThemedView } from "../general";

type MenuOption = {
	optionName: string;
	key: string;
	navigationScreen?: any;
	icon: JSX.Element;
};

export default function CustomDrawer() {
	const colors = useThemeColor();

	const menuOptions: MenuOption[] = [
		{
			optionName: "Home",
			key: "home",
			navigationScreen: "/home",
			icon: <FontAwesome5 name="home" size={24} color={colors.primary} />,
		},

		{
			optionName: "Theme",
			key: "theme",
			navigationScreen: "/theme",
			icon: (
				<MaterialCommunityIcons
					name="theme-light-dark"
					size={24}
					color={colors.primary}
				/>
			),
		},
	];

	return (
		<ThemedView style={styles.container}>
			<CustomStatusBar />
			<View style={styles.profileContainer}>
				<Image
					source={
						colors.themeName === "dark"
							? require("@/assets/images/alien.png")
							: require("@/assets/images/seagull.png")
					}
					style={styles.profileImage}
				/>
				<View style={styles.profileDetails}>
					<ThemedText style={styles.usernameText}>
						{colors.themeName === "dark" ? "Space Cadet" : "Earthling"}
					</ThemedText>
				</View>
			</View>
			<ScrollView
				style={styles.scrollViewContainer}
				contentContainerStyle={styles.scrollContentContainer}
			>
				{menuOptions.map(
					({ optionName, key, icon, navigationScreen }, index) => (
						<TouchableOpacity
							onPress={() => {
								router.navigate({
									pathname: navigationScreen,
								});
							}}
							key={key + index}
							style={[
								styles.menuButton,
								{
									backgroundColor:
										colors.themeName == "light" ? "white" : colors.background,
								},
							]}
						>
							{icon}
							<ThemedText style={styles.menuTitleText}>{optionName}</ThemedText>
							<Entypo
								name="chevron-small-right"
								size={24}
								color={colors.primary}
							/>
						</TouchableOpacity>
					)
				)}

				<View style={styles.spaceContainer}>
					<LottieView
						source={require("@/assets/lottie/space-runner.json")}
						autoPlay
						loop
						style={{ width: DEVICE_HEIGHT * 0.3, height: DEVICE_HEIGHT * 0.3 }}
					/>
				</View>
			</ScrollView>
			<View style={styles.appVersionContainer}>
				<ThemedText style={styles.versionText}>{appVersion}</ThemedText>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	scrollViewContainer: {
		width: "100%",
	},
	scrollContentContainer: {
		paddingBottom: 20,
	},
	menuButton: {
		minHeight: DEVICE_HEIGHT * 0.06,
		width: "95%",
		marginTop: 7,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		borderRadius: 5,
		elevation: 1,
		alignSelf: "center",
	},
	menuTitleText: {
		fontWeight: "bold",
		fontSize: 17,
		marginLeft: 10,
		flex: 1,
	},
	profileContainer: {
		minHeight: DEVICE_HEIGHT * 0.09,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
	},
	profileImage: {
		backgroundColor: "grey",
		height: DEVICE_HEIGHT * 0.06,
		width: DEVICE_HEIGHT * 0.06,
		borderRadius: (DEVICE_HEIGHT * 0.06) / 2,
		marginLeft: 15,
		marginRight: 5,
	},
	profileDetails: {
		justifyContent: "center",
		flex: 1,
	},
	usernameText: {
		fontWeight: "bold",
		fontSize: 17,
	},
	appVersionContainer: {
		width: "95%",
		height: 60,
		marginTop: 10,
	},
	versionText: {
		fontSize: 10,
		margin: 7,
	},
	spaceContainer: {
		minHeight: DEVICE_HEIGHT * 0.4,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});
