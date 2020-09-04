import React from "react";
import { SafeAreaView, Button, View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AllAnimalsScreen from "../screen/animal/AllAnimalsScreen";
import AnimalDetailsScreen from "../screen/animal/AnimalDetailsScreen";
import UserAnimalsScreen from "../screen/user/UserAnimalsScreen";
import AddAnimalScreen from "../screen/user/AddAnimalScreen";
import LogoutScreen from "../screen/LogoutScreen";

import StartupScreen from "../screen/StartupScreen";
import AuthScreen from "../screen/AuthScreen";

import Colors from "../constants/Colors";

const AnimalNavigator = createBottomTabNavigator(
  {
    AllAnimals: {
      screen: AllAnimalsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-paw" : "ios-paw"}
            color={tintColor}
            size={31}
          />
        ),
      },
    },
    UserAnimals: {
      screen: UserAnimalsScreen,
      navigationOptions: {
        tabBarButtonComponent: () => null,
      },
      // navigationOptions: {
      //   tabBarIcon: ({ tintColor }) => (
      //     <Ionicons
      //       name={Platform.OS === "android" ? "md-person" : "ios-person"}
      //       color={tintColor}
      //       size={30}
      //     />
      //   ),
      // },
    },
    AddAnimals: {
      screen: AddAnimalScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-add" : "ios-add"}
            color={tintColor}
            size={31}
          />
        ),
      },
      navigationDisabled: true,
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
            color={tintColor}
            size={30}
          />
        ),
      },
    },
    AnimalDetail: {
      screen: AnimalDetailsScreen,
      navigationOptions: {
        tabBarButtonComponent: () => null,
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        height: 40,
        paddingTop: 10,
        backgroundColor: "#a63a50",
      },
      activeTintColor: Platform.OS === "android" ? "white" : "#EE7674",
      activeBackgroundColor:
        Platform.OS === "android" ? Colors.primaryColor : "",
      showLabel: false,
      inactiveTintColor:
        Platform.OS === "android" ? Colors.primaryColor : "#f8f4e3",
    },
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
});

const MainNavigator = createSwitchNavigator({
  StartUp: StartupScreen,
  Auth: AuthNavigator,
  Animal: AnimalNavigator,
});

export default createAppContainer(MainNavigator);
