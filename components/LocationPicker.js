import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [clickedButton, setClickedButton] = useState(false);

  const mapPickedLocation = props.navigation.getParam("pickedLocation");

  const { onLocationPicked } = props;

  useEffect(() => {
    if(props.clickedSubmit){
      setClickedButton(false);
      setPickedLocation(false);
    }
    if (mapPickedLocation) {
      onLocationPicked(mapPickedLocation);
    }
  }, [props.clickedSubmit,mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to give access to your location to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    setClickedButton(true)
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Couldn't retrieve your location.",
        "Try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.actions}>
        {!clickedButton ? (
          <Button
            title="Animal's Location"
            color={"#f8f4e3"}
            onPress={getLocationHandler}
          />
        ):pickedLocation ? null:(
          <ActivityIndicator size="large" />
        )
        }
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginVertical: 10,
  },
  actions: {
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default LocationPicker;
