import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

import {
	OfflineNotice,
	SpaceshipAnimation,
	WeeklyChart,
	WeeklyHeader,
	WeekNavigation,
} from "@/components/bar-chat";

import {
	ErrorMessage,
	Header,
	LoadingIndicator,
	ThemedView,
} from "@/components/general";

import { DEVICE_WIDTH } from "@/constants/Dimensions";
import { useSightings } from "@/hooks/useSightings";
import { groupSightingsByWeek } from "@/utilities/groupSightingsByWeek";

export default function HomeScreen() {
	const { data, loading, error, isOfflineData } = useSightings();

	const [weekIndex, setWeekIndex] = useState(0);
	const [weeklyData, setWeeklyData] = useState<any[]>([]);
	const [weekKeys, setWeekKeys] = useState<string[]>([]);

	const slideAnim = useRef(new Animated.Value(0)).current;
	const [direction, setDirection] = useState(0);

	useEffect(() => {
		if (!data || data.length === 0) return;

		const grouped = groupSightingsByWeek(data);
		const keys = Object.keys(grouped);
		setWeekKeys(keys);
		setWeeklyData(keys.map((key) => grouped[key]));
	}, [data]);

	useEffect(() => {
		if (direction === 0) {
			slideAnim.setValue(0);
			return;
		}
		slideAnim.setValue(direction * DEVICE_WIDTH);
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 400,
			useNativeDriver: true,
		}).start();
	}, [weekIndex, direction]);

	const handlePrev = () => {
		if (weekIndex <= 0) return;
		Animated.timing(slideAnim, {
			toValue: DEVICE_WIDTH,
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
			toValue: -DEVICE_WIDTH,
			duration: 400,
			useNativeDriver: true,
		}).start(() => {
			setDirection(1);
			setWeekIndex((i) => i + 1);
		});
	};

	const currentWeekData = weeklyData[weekIndex] || {};
	const currentWeekKey = weekKeys[weekIndex];

	if (loading) return <LoadingIndicator />;
	if (error) return <ErrorMessage message={error} />;

	return (
		<ThemedView style={{ flex: 1, alignItems: "center" }}>
			<Header type="homeHeader" />
			{isOfflineData && <OfflineNotice />}
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
			<SpaceshipAnimation />
		</ThemedView>
	);
}
