import React from "react";
import { SafeAreaView, Button, View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import AllAnimalsScreen from "../screen/animal/AllAnimalsScreen";
import AnimalDetailsScreen from "../screen/animal/AnimalDetailsScreen";
import UserAnimalsScreen from "../screen/user/UserAnimalsScreen";
import AddAnimalScreen from "../screen/user/AddAnimalScreen";

import StartupScreen from "../screen/StartupScreen";
import AuthScreen from "../screen/AuthScreen";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth-actions";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
};

const AnimalNavigator = createBottomTabNavigator(
  {
    AllAnimals: {
      screen: AllAnimalsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-paw" : "ios-paw"}
            color={tintColor}
            size={30}
          />
        )
      }
    },
    UserAnimals: {
      screen: UserAnimalsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-person" : "ios-person"}
            color={tintColor}
            size={30}
          />
        )
      }
    },
    AddAnimals: {
      screen: AddAnimalScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-add" : "ios-add"}
            color={tintColor}
            size={30}
          />
        )
      },
      navigationDisabled: true
    },
    Logout: {
      screen: () => null,
      navigationOptions: {
        tabBarButtonComponent: ({ tintColor }) => {
          const dispatch = useDispatch();
          return (
            <Ionicons
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              color={tintColor}
              size={24}
              onPress={() => {
                dispatch(authActions.logout());
              }}
              style={{ marginTop: 12, marginRight: 15 }}
            />
          );
        }
      }
    },
    AnimalDetail: {
      screen: AnimalDetailsScreen,
      navigationOptions: {
        tabBarButtonComponent: () => null
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColor,
      activeBackgroundColor:
        Platform.OS === "android" ? Colors.primaryColor : "",
      showLabel: false
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  StartUp: StartupScreen,
  Auth: AuthNavigator,
  Animal: AnimalNavigator
});

export default createAppContainer(MainNavigator);
