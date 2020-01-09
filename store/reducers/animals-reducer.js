import {
  CREATE_ANIMAL,
  READ_ANIMAL,
  DELETE_ANIMAL
} from "../actions/animals-actions";
import Animal from "../../models/Animal";

const initialState = {
  availableAnimals: [],
  userAnimals: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANIMAL:
      const newAnimal = new Animal(
        action.animalData.id,
        action.animalData.ownerId,
        action.animalData.description,
        action.animalData.dogType,
        action.animalData.imageUrl,
        action.animalData.address,
        action.animalData.lat,
        action.animalData.lng
      );
      return {
        ...state,
        availableAnimals: state.availableAnimals.concat(newAnimal),
        userAnimals: state.userAnimals.concat(newAnimal)
      };
      break;
    case READ_ANIMAL:
      return {
        availableAnimals: action.animals,
        userAnimals: action.userAnimals
      };
      break;
    case DELETE_ANIMAL:
      return {
        ...state,
        userAnimals: state.userAnimals.filter(
          animal => animal.id !== action.aid
        ),
        availableAnimals: state.availableAnimals.filter(
          animal => animal.id !== action.aid
        )
      };
      break;
    default:
      return state;
      break;
  }
};
