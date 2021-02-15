import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
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
  const [isSignup, setIsSignup] = useState(null);

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
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
        setIsSignup(null)
      }}>
    <View style={{flex:1}}>
    {(isSignup !== true || isSignup == null) && (
      <View style={{...styles.container,...styles.signInContainer,height:isSignup == null ? "28%" : "45%"}}>
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
          onFocus={() => {
            setIsSignup(false);
          }}
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
            setIsSignup(false);
            authHandler();
          }}
          onFocus={() => {
            setIsSignup(false);
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.individualButton}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={"Login"}
                color={"#e4b1ab"}
                onPress={() => {
                  setIsSignup(false);
                  authHandler();
                }}
              />
            )}
          </View>
        </View>
      </View>
      )}
      {(isSignup !== false|| isSignup == null) && (
      <View style={{...styles.container,...styles.signUpContainer,height:isSignup == null ? "28%" : "45%"}}>
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
          onFocus={() => {
            setIsSignup(true);
          }}
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
            setIsSignup(true);
            authHandler();
          }}
          onFocus={() => {
            setIsSignup(true);
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.individualButton}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={"Sign Up"}
                color={"#e4b1ab"}
                onPress={() => {
                  setIsSignup(true);
                  authHandler();
                }}
              />
            )}
          </View>
        </View>
      </View>
      )}
    </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "space-around",
    flexDirection:"row",
    alignItems: "center",
    backgroundColor:"#9e1318",
    //backgroundColor:"#f3dfd7",
    backgroundColor:"#0d98ba",
    backgroundColor:"#95d8eb",
  },
  container: {
    width: "70%",
    height:"40%",
    backgroundColor:"#0fabd2",
    borderRadius: 40,
  },
  signInContainer:{
    alignSelf:"center",
    alignItems:"flex-end",
    marginBottom:50,
    marginRight:"35%",
  },
  signUpContainer:{
    alignItems:"flex-start",
    alignSelf:"flex-end",
  },
  buttonContainer: {
    display: "flex",
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
    backgroundColor: "#f1faee",
  },
});

AuthScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};

export default AuthScreen;
