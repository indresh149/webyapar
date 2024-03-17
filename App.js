import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "./constants/styles";
import { useFonts } from "expo-font";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/ui/IconButton";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import CustomDrawer from ".//components//CustomDrawer";
import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DocsUploadScreen from "./screens/DocsUploadScreen";
import ViewDocsUploadScreen from "./screens/ViewDocsUploadScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        contentStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: "#53C1BA",
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color="black"
            />
          ),

          headerRight: ({ tintColor }) => (
            <View style={styles.upperconatiner}>
              <IconButton
                icon="exit"
                color="#53C1BA"
                size={40}
                onPress={authCtx.logout}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Text style={styles.headertext}>Dashboard</Text>
            </View>
          ),
          headerTitleStyle: { flex: 1, textAlign: "center" },
        }}
      />

      <Drawer.Screen
        name="Submit Form"
        component={DocsUploadScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="adduser" size={24} color="black" />
          ),

          headerRight: ({ tintColor }) => (
            <View style={styles.upperconatiner}>
              <IconButton
                icon="exit"
                color="#53C1BA"
                size={40}
                onPress={authCtx.logout}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Text style={styles.headertext}>Submit Form</Text>
            </View>
          ),
          headerTitleStyle: { flex: 1, textAlign: "center" },
        }}
      />

      <Drawer.Screen
        name="Get Form Data"
        component={ViewDocsUploadScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
          headerRight: ({ tintColor }) => (
            <View style={styles.upperconatiner}>
              <IconButton
                icon="exit"
                color="#53C1BA"
                size={40}
                onPress={authCtx.logout}
              />
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titlecontainer}>
              <Text style={styles.headertext}>Form Data</Text>
            </View>
          ),
          headerTitleStyle: { flex: 1, textAlign: "center" },
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#d5e4ef" },
        sceneContainerStyle: { backgroundColor: "#18c94d" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#53C1BA",
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="DrawerScreen"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
     
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);


  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay message="Loading..." />;
  }

  return <Navigation />;
}

export default function App() {

  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  upperconatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titlecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headertext: {
    color: "#1B75BB",
    fontSize: 30,
    marginLeft: 10,
    marginRight: 10,
  },
});
