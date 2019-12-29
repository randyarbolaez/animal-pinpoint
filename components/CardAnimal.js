import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

const CardAnimal = props => {
  return (
    <View style={{ ...styles.grid }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={props.onSelect}
        useForeground
      >
        <View style={styles.container}>
          <Image
            style={{ borderRadius: 55 / 2, width: 55, height: 55 }}
            source={{
              uri: props.imageURL
            }}
          />
          <Text style={styles.title}>{props.dogType}</Text>
          {props.children}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    backgroundColor: Colors.accentColor,
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 15,
    height: 100,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000"
  },
  container: {
    marginTop: 5,
    marginBottom: 15,
    alignItems: "center",
    height: 110,
    paddingVertical: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 }
  },
  title: {
    color: Colors.accentColor,
    fontSize: 16
  }
});

export default CardAnimal;
