import { getSightings } from "@/features/sightings/sightingsSlice";
import { AppDispatch } from "@/store/store";
import { Button } from "react-native";
import { useDispatch } from "react-redux";
import CustomStatusBar from "./CustomStatusBar";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface ErrorMessageProps {
	message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleRetry = () => {
		dispatch(getSightings());
	};

	return (
		<>
			<CustomStatusBar />
			<ThemedView
				style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
			>
				<ThemedText
					style={{ color: "red", textAlign: "center", marginBottom: 16 }}
				>
					{message}
				</ThemedText>
				<Button title="Retry" onPress={handleRetry} />
			</ThemedView>
		</>
	);
};

export default ErrorMessage;
