import { ActivityIndicator } from "react-native";
import { ThemedView } from "./ThemedView";

const LoadingIndicator: React.FC = () => {
	return (
		<ThemedView
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<ActivityIndicator size="large" />
		</ThemedView>
	);
};

export default LoadingIndicator;
