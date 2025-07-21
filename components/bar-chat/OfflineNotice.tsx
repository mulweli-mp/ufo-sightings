import { ThemedText } from "@/components/general";
import { StyleSheet, View } from "react-native";

const OfflineNotice = () => {
	return (
		<View style={styles.container}>
			<ThemedText style={styles.text}>
				You're viewing offline data. It may be outdated.
			</ThemedText>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "orange",
		padding: 10,
		marginBottom: 8,
		width: "100%",
	},
	text: {
		color: "white",
		textAlign: "center",
	},
});

export default OfflineNotice;
