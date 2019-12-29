import Animal from "../../models/Animal";

export const CREATE_ANIMAL = "CREATE_ANIMAL";
export const READ_ANIMAL = "READ_ANIMAL";
export const UPDATE_ANIMAL = "UPDATE_ANIMAL";
export const DELETE_ANIMAL = "DELETE_ANIMAL";

import ENV from "../../env";

export const createAnimal = (description, dogType, imageUrl) => {
  return async (dispatch, getState) => {
    // execute any async code you want
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const res = await fetch(`${ENV.fireBaseUrl}.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description,
        dogType,
        imageUrl,
        ownerId: userId
      })
    });

    const resData = await res.json();

    dispatch({
      type: CREATE_ANIMAL,
      animalData: {
        id: resData.name,
        ownerId: userId,
        description,
        dogType,
        imageUrl
      }
    });
  };
};

export const fetchAnimals = () => {
  return async (dispatch, getState) => {
    // execute any async code you want
    const userId = getState().auth.userId;
    try {
      const res = await fetch(`${ENV.fireBaseUrl}.json`);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await res.json();
      const loadedAnimals = [];

      for (const key in resData) {
        loadedAnimals.push(
          new Animal(
            key,
            resData[key].ownerId,
            resData[key].description,
            resData[key].dogType,
            resData[key].imageUrl
          )
        );
      }

      dispatch({
        type: READ_ANIMAL,
        animals: loadedAnimals,
        userAnimals: loadedAnimals.filter(animal => animal.ownerId === userId)
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteAnimal = animalId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const res = await fetch(
      `${ENV.fireBaseUrl}/${animalId}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({ type: DELETE_ANIMAL, aid: animalId });
  };
};
