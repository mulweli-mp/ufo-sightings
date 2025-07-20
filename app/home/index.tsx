import { ThemedText } from "@/components/general";
import { ThemedView } from "@/components/general/ThemedView";
import { data } from "@/constants/Data";
import { format, parse, parseISO, startOfWeek } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

function groupSightingsByWeek(data: { date: string; sightings: number }[]) {
	const parsed = data
		.map(({ date, sightings }) => ({
			date: parse(date, "dd/MM/yyyy", new Date()),
			sightings,
		}))
		.sort((a, b) => a.date.getTime() - b.date.getTime());

	const weeks: { [key: string]: { [day: string]: number } } = {};

	parsed.forEach(({ date, sightings }) => {
		const weekStart = startOfWeek(date, { weekStartsOn: 1 });
		const weekKey = format(weekStart, "yyyy-MM-dd");
		const dayName = format(date, "EEE");

		if (!weeks[weekKey]) {
			weeks[weekKey] = {
				Mon: 0,
				Tue: 0,
				Wed: 0,
				Thu: 0,
				Fri: 0,
				Sat: 0,
				Sun: 0,
			};
		}

		weeks[weekKey][dayName] = sightings;
	});

	return weeks;
}

export default function Index() {
	const [weekIndex, setWeekIndex] = useState(0);
	const [weeklyData, setWeeklyData] = useState<any[]>([]);
	const [weekKeys, setWeekKeys] = useState<string[]>([]);

	// animated value for horizontal slide (start at 0)
	const slideAnim = useRef(new Animated.Value(0)).current;

	// direction: 1 means sliding left (next), -1 means sliding right (prev)
	const [direction, setDirection] = useState(0);

	useEffect(() => {
		const grouped = groupSightingsByWeek(data);
		const keys = Object.keys(grouped);
		setWeekKeys(keys);
		setWeeklyData(keys.map((key) => grouped[key]));
	}, []);

	// When weekIndex or direction changes, animate slide in from left or right
	useEffect(() => {
		if (direction === 0) {
			// no animation on initial load
			slideAnim.setValue(0);
			return;
		}

		// Start position (off screen)
		slideAnim.setValue(direction * screenWidth);

		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 400,
			useNativeDriver: true,
		}).start();
	}, [weekIndex, direction, slideAnim]);

	// Handle prev button
	const handlePrev = () => {
		if (weekIndex <= 0) return;

		// Animate slide out to right, then update weekIndex and direction
		Animated.timing(slideAnim, {
			toValue: screenWidth,
			duration: 400,
			useNativeDriver: true,
		}).start(() => {
			setDirection(-1);
			setWeekIndex((i) => i - 1);
		});
	};

	// Handle next button
	const handleNext = () => {
		if (weekIndex >= weeklyData.length - 1) return;

		// Animate slide out to left, then update weekIndex and direction
		Animated.timing(slideAnim, {
			toValue: -screenWidth,
			duration: 400,
			useNativeDriver: true,
		}).start(() => {
			setDirection(1);
			setWeekIndex((i) => i + 1);
		});
	};

	const current = weeklyData[weekIndex] || {};

	return (
		<ThemedView style={{ flex: 1, paddingTop: 50, alignItems: "center" }}>
			<ThemedText style={{ marginBottom: 16 }}>UFO Sightings</ThemedText>
			{weekKeys[weekIndex] && (
				<ThemedText style={{ fontSize: 16, marginBottom: 8 }}>
					Week of {format(parseISO(weekKeys[weekIndex]), "MMM d yyyy")}
				</ThemedText>
			)}

			{Object.keys(current).length > 0 && (
				<Animated.View
					style={{
						transform: [{ translateX: slideAnim }],
						width: screenWidth - 40,
					}}
				>
					<BarChart
						data={{
							labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
							datasets: [{ data: Object.values(current) }],
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
			)}

			<View style={{ flexDirection: "row", marginTop: 16 }}>
				<Button title="⏮ Prev" disabled={weekIndex <= 0} onPress={handlePrev} />
				<View style={{ width: 16 }} />
				<Button
					title="Next ⏭"
					disabled={weekIndex >= weeklyData.length - 1}
					onPress={handleNext}
				/>
			</View>
		</ThemedView>
	);
}
