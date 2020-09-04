import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth-actions";

const LogoutScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.logout());
  }, [dispatch]);
  return <View />;
};

export default LogoutScreen;
