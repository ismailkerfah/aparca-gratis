import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import StartNavigator from "./navigators/StartNavigator";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Tajawal-Regular": require("@expo-google-fonts/tajawal/Tajawal_400Regular.ttf"),
    "Tajawal-Medium": require("@expo-google-fonts/tajawal/Tajawal_500Medium.ttf"),
    "Tajawal-Bold": require("@expo-google-fonts/tajawal/Tajawal_700Bold.ttf"),
    ...Ionicons.font,
    ...FontAwesome5.font,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("Error hiding splash screen:", e);
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthContextProvider>
        <NavigationContainer>
          <StartNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </AuthContextProvider>
    </View>
  );
}
