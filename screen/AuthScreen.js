import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../components/Input";
import * as authActions from "../store/actions/auth-actions";

import Colors from "../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Animal");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>A</Text>
        <Text style={styles.titleText}>nimal</Text>
        <Text style={styles.titleText}>P</Text>
        <Text style={styles.titleText}>in</Text>
        <Text style={styles.titleText}>P</Text>
        <Text style={styles.titleText}>oint</Text>
      </View>
      <View style={styles.container}>
        <Input
          placeholder="E-Mail"
          id="email"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          errorText="Please enter a valid email address."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <Input
          placeholder="Password"
          id="password"
          keyboardType="default"
          secureTextEntry
          required
          password
          minLength={6}
          autoCapitalize="none"
          errorText="Please enter a valid password."
          onInputChange={inputChangeHandler}
          initialValue=""
          returnKeyType="done"
          onSubmitEditing={() => {
            authHandler();
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.individualButton}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? "Sign Up" : "Login"}
                color={"#e4b1ab"}
                onPress={authHandler}
              />
            )}
          </View>
          <View>
            <Button
              title={`* Switch to ${isSignup ? "Login" : "Sign Up"}`}
              color={"#F2EBFF"}
              onPress={() => {
                props.navigation.setParams({
                  isSignUpHeaderTitle: !isSignup,
                });
                setIsSignup((prevState) => !prevState);
              }}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a63a50",
  },
  container: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    borderRadius: 10,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",

    borderColor: "transparent",
    borderLeftColor: "#f8f4e3",
    borderRightColor: "#f8f4e3",
    borderWidth: 20,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    // paddingHorizontal: 0,
    marginVertical: 20,
  },
  titleText: {
    fontStyle: "italic",
    fontSize: 42,
    color: "#a63a50",
    fontWeight: "bold",
    backgroundColor: "#f8f4e3",
    paddingVertical: 8,
  },
  buttonContainer: {
    display: "flex",
    // flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  individualButton: {
    paddingHorizontal: 10,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderColor: "transparent",
    borderBottomColor: "#f8f4e3",
    borderTopColor: "#f8f4e3",
    borderWidth: 5,
    // backgroundColor: "#f1faee",
  },
});

AuthScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};

export default AuthScreen;
