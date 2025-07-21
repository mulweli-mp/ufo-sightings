import { Button } from "@/components/general";
import { View } from "react-native";

type Props = {
	onPrev: () => void;
	onNext: () => void;
	disablePrev: boolean;
	disableNext: boolean;
};

export const WeekNavigation: React.FC<Props> = ({
	onPrev,
	onNext,
	disablePrev,
	disableNext,
}) => (
	<View
		style={{ flexDirection: "row", marginTop: 16, justifyContent: "center" }}
	>
		<Button title="⏮ Prev 👽" onPress={onPrev} disabled={disablePrev} />
		<View style={{ width: 16 }} />
		<Button title="👽 Next ⏭" onPress={onNext} disabled={disableNext} />
	</View>
);
