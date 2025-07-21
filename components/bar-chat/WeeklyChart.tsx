import { DEVICE_WIDTH } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Animated } from "react-native";
import { BarChart } from "react-native-chart-kit";

type Props = {
	data: { [day: string]: number };
	animation: Animated.Value;
};

export const WeeklyChart: React.FC<Props> = ({ data, animation }) => {
	const colors = useThemeColor();

	return (
		<Animated.View
			style={{
				transform: [{ translateX: animation }],
				width: DEVICE_WIDTH - 40,
			}}
		>
			<BarChart
				data={{
					labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					datasets: [{ data: Object.values(data) }],
				}}
				width={DEVICE_WIDTH - 40}
				height={220}
				yAxisLabel=""
				yAxisSuffix=""
				yAxisInterval={1}
				fromZero
				chartConfig={{
					backgroundColor: "#fff",
					backgroundGradientFrom: "#000000",
					backgroundGradientTo: colors.primary,
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					barPercentage: 0.7,
				}}
				style={{ borderRadius: 8 }}
			/>
		</Animated.View>
	);
};
