import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, Text, StyleSheet, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as animalActions from "../../store/actions/animals-actions";
import CardAnimal from "../../components/CardAnimal";
import Colors from "../../constants/Colors";

const UserAnimalsScreen = (props) => {
  const userAnimals = useSelector((state) => state.animal.userAnimals);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are you Sure?", "Do you really want to delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(animalActions.deleteAnimal(id));
          loadAnimals();
        },
      },
    ]);
  };

  const selectItemHandler = (id) => {
    props.navigation.navigate("AnimalDetail", {
      animalId: id,
    });
  };

  return (
    <FlatList
      data={userAnimals}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <CardAnimal
            {...itemData.item}
            onSelect={() => {
              selectItemHandler(itemData.item.id);
            }}
          >
            <Button
              color="red"
              title="delete"
              onPress={() => {
                deleteHandler(itemData.item.id);
              }}
            />
          </CardAnimal>
        );
      }}
    />
  );
};

export default UserAnimalsScreen;
