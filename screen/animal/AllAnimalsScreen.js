import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import * as animalActions from "../../store/actions/animals-actions";
import CardAnimal from "../../components/CardAnimal";
import UserAnimalsScreen from '../user/UserAnimalsScreen';

const AllAnimalsScreen = (props) => {
  const userAnimals = useSelector((state) => state.animal.userAnimals);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAllPostBtnPressed, setIsAllPostBtnPressed] = useState(true);

  const availableAnimals = useSelector(
    (state) => state.animal.availableAnimals
  );
  const dispatch = useDispatch();

  const loadAnimals = useCallback(async () => {
    try {
      await dispatch(animalActions.fetchAnimals());
    } catch (err) {
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);

  const selectItemHandler = (id) => {
    props.navigation.navigate("AnimalDetail", {
      animalId: id,
    });
  };

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadAnimals);

    return () => {
      willFocusSub.remove();
    };
  }, [loadAnimals]);

  useEffect(() => {
    setIsLoading(true);
    props.navigation.setParams({
      logout: () => {
        dispatch(authActions.logout());
      },
    });
    dispatch(animalActions.fetchAnimals()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const onSwipeLeft = (state) => {
    props.navigation.navigate('AddAnimals');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.buttonView}>
        <TouchableOpacity style={{...styles.button}} onPress={() => setIsAllPostBtnPressed(true)}>
          <Text style={{
            ...styles.button,
              color:isAllPostBtnPressed ? "#4682b4" : "#f8f4e3",
            }}>
          All Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setIsAllPostBtnPressed(false)}>
          <Text style={{
            ...styles.button,
            color:!isAllPostBtnPressed ? "#4682b4" : "#f8f4e3",
            }}>
          Your Posts
          </Text>
        </TouchableOpacity>
      </View>
      {isAllPostBtnPressed ? (
        <FlatList
          onRefresh={loadAnimals}
          refreshing={isRefreshing}
          data={availableAnimals}
          numColumns={1}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            return (
              <CardAnimal
                onSelect={() => {
                  selectItemHandler(itemData.item.id);
                }}
                {...itemData.item}
              />
            );
          }}
        />
      ):userAnimals.length ? (
        <UserAnimalsScreen/>
      ):(
        <Text style={{alignSelf:'center',fontSize:32}}>You have no posts</Text>
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    paddingTop: 50, 
    //backgroundColor: "#a63a50",
    backgroundColor: "#95d8eb",
  },
  buttonView:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    marginHorizontal:"25%",
  },
  button:{
    fontSize:18,
    fontWeight:"bold",
  },
});

export default AllAnimalsScreen;
