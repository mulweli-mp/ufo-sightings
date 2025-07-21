import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

export default function SpaceshipAnimation() {
	return (
		<View style={styles.container}>
			<LottieView
				source={require("@/assets/lottie/spaceship.json")}
				autoPlay
				loop
				style={styles.animation}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: DEVICE_HEIGHT * 0.4,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	animation: {
		width: DEVICE_HEIGHT * 0.2,
		height: DEVICE_HEIGHT * 0.2,
	},
});
