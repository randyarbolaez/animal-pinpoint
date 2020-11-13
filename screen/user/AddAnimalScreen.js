import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationEvents } from "react-navigation";

import ImagePicker from "../../components/ImagePicker";
import LocationPicker from "../../components/LocationPicker";
import * as animalsActions from "../../store/actions/animals-actions";
import Colors from "../../constants/Colors";

const AddAnimalScreen = (props) => {
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dogTypeValue, setDogTypeValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [pickedImage, setPickedImage] = useState();

  const dispatch = useDispatch();

  const descriptionChangeHandler = (text) => {
    setDescriptionValue(text);
  };

  const dogTypeValueChangeHandler = (text) => {
    setDogTypeValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setPickedImage(imagePath);
    setSelectedImage(imagePath);
  };

  const locationPickHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const saveAnimalHandler = () => {
    dispatch(
      animalsActions.createAnimal(
        descriptionValue.trim(),
        dogTypeValue,
        selectedImage,
        selectedLocation
      )
    );
    setDescriptionValue("");
    setDogTypeValue("");
    setPickedImage(undefined);
    setSelectedLocation(undefined);
    props.navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={25}
      // KeyboardAvoidingView={10}
      style={styles.screen}
    >
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View>
              <TextInput
                style={{ ...styles.textInput }}
                onChangeText={dogTypeValueChangeHandler}
                value={dogTypeValue}
                placeholder="Provide Breed"
                maxLength={20}
                placeholderTextColor="#a63a50"
              />
            </View>
          </View>
          <ImagePicker
            onImageTaken={imageTakenHandler}
            setPickedImage={setPickedImage}
            pickedImage={pickedImage}
          />

          <View>
            <TextInput
              style={{
                ...styles.textInput,
                paddingHorizontal: 5,
              }}
              onChangeText={descriptionChangeHandler}
              value={descriptionValue}
              multiline
              maxLength={150}
              placeholder="Provide Description"
              placeholderTextColor="#a63a50"
              returnKeyType="done"
              blurOnSubmit
            />
            <LocationPicker
              navigation={props.navigation}
              onLocationPicked={locationPickHandler}
            />
          </View>
          {selectedLocation && (
            <View style={styles.buttonContainer}>
              <Button
                title="Add Animal"
                color={"#f8f4e3"}
                onPress={saveAnimalHandler}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#a63a50",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
  textInput: {
    backgroundColor: "#f8f4e3",
    marginBottom: 10,
    paddingVertical: 10,
    color: "#CE96A6",
    paddingHorizontal: 25,
    textAlign: "center",
    fontSize: 20,

    borderColor: "transparent",
    borderWidth: 10,
    borderLeftColor: "#a63a50",
    borderRightColor: "#a63a50",
    borderBottomEndRadius: 50,
    borderTopEndRadius: 50,
    borderBottomStartRadius: 50,
    borderTopStartRadius: 50,
    // borderBottomWidth: 1,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderColor: "transparent",
    borderBottomColor: "#f8f4e3",
    borderTopColor: "#f8f4e3",
    borderWidth: 5,
  },
});

export default AddAnimalScreen;
