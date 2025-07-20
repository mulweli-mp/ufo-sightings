import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";

import {
	WeeklyChart,
	WeeklyHeader,
	WeekNavigation,
} from "@/components/bar-chat";

import { Header, ThemedView } from "@/components/general";

import { data } from "@/constants/Data";
import { groupSightingsByWeek } from "@/utilities/groupSightingsByWeek";

const screenWidth = Dimensions.get("window").width;

export default function Index() {
	const [weekIndex, setWeekIndex] = useState(0);
	const [weeklyData, setWeeklyData] = useState<any[]>([]);
	const [weekKeys, setWeekKeys] = useState<string[]>([]);

	const slideAnim = useRef(new Animated.Value(0)).current;
	const [direction, setDirection] = useState(0);

	useEffect(() => {
		const grouped = groupSightingsByWeek(data);
		const keys = Object.keys(grouped);
		setWeekKeys(keys);
		setWeeklyData(keys.map((key) => grouped[key]));
	}, []);

	useEffect(() => {
		if (direction === 0) {
			slideAnim.setValue(0);
			return;
		}
		slideAnim.setValue(direction * screenWidth);
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 400,
			useNativeDriver: true,
		}).start();
	}, [weekIndex, direction]);

	const handlePrev = () => {
		if (weekIndex <= 0) return;
		Animated.timing(slideAnim, {
			toValue: screenWidth,
			duration: 400,
			useNativeDriver: true,
		}).start(() => {
			setDirection(-1);
			setWeekIndex((i) => i - 1);
		});
	};

	const handleNext = () => {
		if (weekIndex >= weeklyData.length - 1) return;
		Animated.timing(slideAnim, {
			toValue: -screenWidth,
			duration: 400,
			useNativeDriver: true,
		}).start(() => {
			setDirection(1);
			setWeekIndex((i) => i + 1);
		});
	};

	const currentWeekData = weeklyData[weekIndex] || {};
	const currentWeekKey = weekKeys[weekIndex];

	return (
		<ThemedView style={{ flex: 1, alignItems: "center" }}>
			<Header type="homeHeader" />
			<WeeklyHeader weekKey={currentWeekKey} />
			{Object.keys(currentWeekData).length > 0 && (
				<WeeklyChart data={currentWeekData} animation={slideAnim} />
			)}
			<WeekNavigation
				onPrev={handlePrev}
				onNext={handleNext}
				disablePrev={weekIndex <= 0}
				disableNext={weekIndex >= weeklyData.length - 1}
			/>
		</ThemedView>
	);
}
