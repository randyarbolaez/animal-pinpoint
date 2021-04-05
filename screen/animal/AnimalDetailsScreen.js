import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";

const AnimalDetailsScreen = (props) => {
  const animalId = props.navigation.getParam("animalId");
  const animal = useSelector((state) =>
    state.animal.availableAnimals.find((animal) => animal.id === animalId)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.dogType}>{animal.dogType.toUpperCase()}</Text>
      <Image
        style={{
          width: "70%",
          height: "35%",
          borderRadius: 10,
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
        }}
        source={{
          uri: animal.imageURL,
        }}
      />
      <View style={styles.addressContainer}>
        <Text
          style={{
            color: "#ffdfba",
            fontSize: 15,
          }}
        >
          {animal.address}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <ScrollView>
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
            }}
          >
            {animal.description}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffdfba",
  },
  dogType: {
    marginBottom: 30,
    fontSize: 24,
    color: "#ccc",
  },
  descriptionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 30,
    marginHorizontal: 55,
    backgroundColor: "#ec5766",
    height: "15%",
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    paddingHorizontal: 25,
  },
  addressContainer: {
    marginVertical: 15,
    padding: 25,
    backgroundColor: "#ccc",
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default AnimalDetailsScreen;
