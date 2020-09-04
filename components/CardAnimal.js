import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Alert,
  AsyncStorage,
  Animated,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  State,
} from "react-native-gesture-handler";

import * as animalActions from "../store/actions/animals-actions";
import Colors from "../constants/Colors";
import AnimalInformation from "./AnimalInformation";

const CardAnimal = (props) => {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  const deleteHandler = (id) => {
    Alert.alert("Are you Sure?", "Do you want to delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(animalActions.deleteAnimal(id));
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <LongPressGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE && userId == props.ownerId) {
            deleteHandler(props.id);
          }
        }}
        minDurationMs={350}
      >
        <TapGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              setExpand(!expand);
            }
          }}
        >
          <View>
            <View style={styles.container}>
              <Image
                style={{
                  borderRadius: 55 / 2,
                  width: 55,
                  height: 55,
                  borderColor:
                    userId == props.ownerId ? "#F9B5AC" : "transparent",
                  borderWidth: userId == props.ownerId ? 2 : 0,
                }}
                source={{
                  uri: props.imageURL,
                }}
              />
              <Text style={styles.title}>{props.dogType}</Text>
            </View>
          </View>
        </TapGestureHandler>
      </LongPressGestureHandler>
      {expand && <AnimalInformation animalInfo={props} />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#a63a50",
    borderBottomColor: "#f8f4e3",
    borderBottomWidth: 0.3,
  },
  container: {
    // marginTop: 5,
    alignItems: "center",
    maxHeight: 110,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "transparent",
    // marginTop: "-2%",
  },
  title: {
    fontSize: 16,
    color: "#f8f4e3",
  },
});

export default CardAnimal;
