import { Button, View } from "react-native";

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
	<View style={{ flexDirection: "row", marginTop: 16 }}>
		<Button title="⏮ Prev" disabled={disablePrev} onPress={onPrev} />
		<View style={{ width: 16 }} />
		<Button title="Next ⏭" disabled={disableNext} onPress={onNext} />
	</View>
);
