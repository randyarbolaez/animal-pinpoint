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

  const mapPickedLocation = props.navigation.getParam("pickedLocation");

  const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

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
        <Button
          title="Animal's Location"
          color={"#f8f4e3"}
          onPress={getLocationHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 10,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderColor: "transparent",
    borderBottomColor: "#f8f4e3",
    borderTopColor: "#f8f4e3",
    borderWidth: 5,
    // backgroundColor:'yellow'
  },
});

export default LocationPicker;
