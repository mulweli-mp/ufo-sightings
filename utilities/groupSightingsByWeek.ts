import { Sighting } from "@/types";
import { format, parse, startOfWeek } from "date-fns";

export function groupSightingsByWeek(data: Sighting[]) {
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
