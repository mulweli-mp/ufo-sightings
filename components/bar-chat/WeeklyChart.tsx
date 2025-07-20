import { Animated, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type Props = {
	data: { [day: string]: number };
	animation: Animated.Value;
};

export const WeeklyChart: React.FC<Props> = ({ data, animation }) => {
	return (
		<Animated.View
			style={{
				transform: [{ translateX: animation }],
				width: screenWidth - 40,
			}}
		>
			<BarChart
				data={{
					labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					datasets: [{ data: Object.values(data) }],
				}}
				width={screenWidth - 40}
				height={220}
				yAxisLabel=""
				yAxisSuffix=""
				yAxisInterval={1}
				fromZero
				chartConfig={{
					backgroundColor: "#fff",
					backgroundGradientFrom: "#fff",
					backgroundGradientTo: "#fff",
					color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
					barPercentage: 0.5,
				}}
				style={{ borderRadius: 8 }}
			/>
		</Animated.View>
	);
};
