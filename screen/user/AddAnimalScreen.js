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
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

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

  const onSwipeRight = (state) => {
    console.log('hello')
    props.navigation.navigate('AllAnimals');
  }

  return (
    <GestureRecognizer
      style={styles.screen}
      onSwipeRight={(state) => onSwipeRight(state)}
    >
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={25}
        // KeyboardAvoidingView={10}
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
                maxHeight={110}
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
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#95d8eb",
  },
  container: {
    backgroundColor:"#4682b4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical:50,
    paddingHorizontal:25,
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50,
  },
  textInput: {
    marginBottom: 10,
    paddingBottom: 5,
    marginHorizontal:20,
    textAlign:"center",
    color: "#f8f4e3",
    paddingHorizontal: 25,
    fontSize: 20,

    borderColor: "transparent",
    borderWidth: 5,
    borderBottomColor: "#0fabd2",
    borderBottomColor: "#95d8eb",
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
