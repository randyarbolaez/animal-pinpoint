import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

const AnimalInformation = ({ animalInfo: animal }) => {
  console.log(animal, "<>><animal");
  return (
    <ScrollView>
      <View style={styles.animalAddress}>
        <Text style={styles.animalText}>{animal.address}</Text>
      </View>
      <View style={styles.animalImage}>
        <Image
          style={{
            alignSelf: "center",
            borderRadius: 10,
            width: "100%",
            height: "100%",
            // margin: 10,
            // padding: 10,
            // borderWidth: userId == props.ownerId ? 2 : 0,
          }}
          source={{
            uri: animal.imageURL,
          }}
        />
      </View>
      <View style={styles.animalDescriptionContainer}>
        <Text style={{ ...styles.animalText, ...styles.animalDescription }}>
          {animal.description}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  animalText: {
    textAlign: "center",
    fontSize: 16,
    color: "#23395d",
  },
  animalAddress: {
    alignSelf: "center",
    backgroundColor: "#4682b4",
    backgroundColor: "#f8f4e3",
    padding: 5,

    borderWidth: 10,
    borderColor: "transparent",
    borderBottomColor: "#95d8eb",
    borderBottomColor: "#4682b4",
    borderRadius: 5,
  },
  animalImage: {
    alignSelf: "center",
    borderWidth: 5,
    borderColor:'transparent',
    borderBottomColor: "#f8f4e3",
    width: "50%",
    height: 120,
    padding: 5,
    margin: 10,
    borderRadius: 5,
  },
  animalDescriptionContainer: {
    borderColor: "#f8f4e3",
    borderWidth: 1,
    borderRadius: 5,

    marginBottom: "10%",
    padding: 2.5,
    width: "80%",
    alignSelf: "center",
  },
  animalDescription: {
    backgroundColor: "#f8f4e3",
    padding: 5,
    color: "#a63a50",
    color:"#23395d",
    width: "100%",
    alignSelf: "center",
  },
});

export default AnimalInformation;
