import * as React from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ActivityScreen from "./screens/ActivityScreen";
import WatchList from "./screens/WatchList";
import FeatherIcon from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import OpenTradeScreen from "./screens/OpenTradeScreen";
import BuddyAIScreen from "./screens/BuddyAIScreen";

// Screen Names
const homeName = "Home";
const activityName = "Activity";
const watchlistName = "Watchlist";
const openTradeName = "Trade";
const aiBuddyName = "AI Buddy";

const Tab = createBottomTabNavigator();

const AppBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={{
          tabBarActiveTintColor: "#ed702d",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: "black",
          },
          headerStyle: {
            // Modify header style
            backgroundColor: "black",
          },
          headerTitleStyle: {
            // Style for header titles
            fontWeight: "bold",
            color: "white",
          },
        }}
      >
        <Tab.Screen
          name={homeName}
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={openTradeName}
          component={OpenTradeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="bar-chart-2" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={aiBuddyName}
          component={BuddyAIScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="robot" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={activityName}
          component={ActivityScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="activity" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={watchlistName}
          component={WatchList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="list" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppBar;
