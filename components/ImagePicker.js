import React, { useState } from "react";
import { View, Button, Image, Text, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import ENV from "../env";

const ImgPicker = (props) => {
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "Settings > Expo > Photos > All Photos",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      base64: true,
    });

    let base64Img = `data:image/jpg;base64,${image.base64}`;

    let data = {
      file: base64Img,
      upload_preset: "animal-pinpoint-v2",
    };

    fetch(ENV.cloudinaryApiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    }).then(async (r) => {
      let data = await r.json();
      props.onImageTaken(data.secure_url);
    });
    props.setPickedImage(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View
        style={{
          borderColor: "transparent",
          borderRadius: 5,
          padding: 10,
          backgroundColor: "#f8f4e3",
        }}
      >
        <View style={styles.imagePreview}>
          {!props.pickedImage ? (
            <Text style={styles.imagePreviewText}>No image picked yet.</Text>
          ) : (
            <Image style={styles.image} source={{ uri: props.pickedImage }} />
          )}
        </View>
      </View>
      <Button
        title="Take picture"
        color={"#f8f4e3"}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: 150,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderColor: "transparent",
    borderWidth: 10,
    borderRadius: 5,
    borderBottomColor: "#95d8eb",
  },
  imagePreviewText: {
    color: "#4682b4",
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
