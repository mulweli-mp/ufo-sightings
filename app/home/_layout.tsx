import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import CustomDrawer from "@/components/navigation/CustomDrawer";

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				screenOptions={{
					headerShown: false,
				}}
				drawerContent={() => <CustomDrawer />}
			>
				<Drawer.Screen
					name="index"
					options={{
						drawerLabel: "Home",
						title: "Home",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
