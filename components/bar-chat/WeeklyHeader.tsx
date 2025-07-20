import { ThemedText } from "@/components/general";
import { format, parseISO } from "date-fns";

export const WeeklyHeader = ({ weekKey }: { weekKey?: string }) => {
	if (!weekKey) return null;

	return (
		<>
			<ThemedText style={{ marginVertical: 16, fontWeight: "bold" }}>
				UFO Sightings
			</ThemedText>
			<ThemedText style={{ fontSize: 16, marginBottom: 8 }}>
				Week of {format(parseISO(weekKey), "MMM d yyyy")}
			</ThemedText>
		</>
	);
};
