import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationEvents } from "react-navigation";

import ImagePicker from "../../components/ImagePicker";
import * as animalsActions from "../../store/actions/animals-actions";
import Colors from "../../constants/Colors";

const AddAnimalScreen = props => {
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dogTypeValue, setDogTypeValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedImage, setPickedImage] = useState();

  const dispatch = useDispatch();

  const descriptionChangeHandler = text => {
    setDescriptionValue(text);
  };

  const dogTypeValueChangeHandler = text => {
    setDogTypeValue(text);
  };

  const imageTakenHandler = imagePath => {
    setPickedImage(imagePath);
    setSelectedImage(imagePath);
  };

  const saveAnimalHandler = () => {
    dispatch(
      animalsActions.createAnimal(descriptionValue, dogTypeValue, selectedImage)
    );
    setDescriptionValue("");
    setDogTypeValue("");
    setPickedImage(undefined);
    props.navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={40}
      style={styles.screen}
    >
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              borderWidth: 2.7,
              padding: 10,
              borderBottomColor: "transparent",
              borderColor: Colors.accentColor,
              paddingHorizontal: 60,
              borderRadius: 75
            }}
          >
            <Text style={styles.label}>Dog Type</Text>
            <View
              style={{
                borderWidth: 2.7,
                padding: 10,
                borderTopColor: "transparent",
                borderColor: Colors.primaryColor,
                borderRadius: 100,
                shadowColor: Colors.primaryColor,
                shadowOpacity: 0.26,
                shadowOffset: { width: 0, height: 2 }
              }}
            >
              <TextInput
                style={{ ...styles.textInput, maxWidth: 70 }}
                onChangeText={dogTypeValueChangeHandler}
                value={dogTypeValue}
              />
            </View>
          </View>
          <ImagePicker
            onImageTaken={imageTakenHandler}
            setPickedImage={setPickedImage}
            pickedImage={pickedImage}
          />
          <View
            style={{
              borderWidth: 2.7,
              padding: 10,
              borderTopColor: "transparent",
              borderColor: Colors.accentColor,
              paddingHorizontal: 60,
              borderRadius: 55,
              marginBottom: 20
            }}
          >
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={descriptionChangeHandler}
              value={descriptionValue}
              multiline
            />
          </View>
          <Button
            title="Add Dog"
            color={Colors.primaryColor}
            onPress={saveAnimalHandler}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 50
  },
  label: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    marginBottom: 15,
    paddingVertical: 4
  }
});

export default AddAnimalScreen;
