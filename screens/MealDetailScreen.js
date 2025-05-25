import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorites } from "../store/redux/favorites";


function MealDetailScreen({ route, navigation }) {
  const favoriteMealId = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();
  const mealId = route.params.mealId;
  const selectedmeal = MEALS.find((meal) => meal.id === mealId);
  const mealIsFavorite = favoriteMealId.includes(mealId);

  function changeFavoriteStatusHandler() {
    if(mealIsFavorite) {
      dispatch(removeFavorites({ id: mealId }));
    } else {
      dispatch(addFavorites({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton 
          onPress={changeFavoriteStatusHandler} 
          icon={mealIsFavorite ? "star" : "star-outline"} 
          color={"white"}/>
        );
      },
    });
  }, [changeFavoriteStatusHandler, mealIsFavorite, navigation]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: selectedmeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedmeal.title}</Text>
      <MealDetails
        duration={selectedmeal.duration}
        complexity={selectedmeal.complexity}
        affordability={selectedmeal.affordability}
        style={styles.details}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
      <View style={styles.listContainer} >
      <Subtitle>Ingredients</Subtitle>
      <List data={selectedmeal.ingredients} />
      <Subtitle>Steps</Subtitle>
      <List data={selectedmeal.steps} />
      </View>      
      </View>
    </ScrollView>
  );
}
export default MealDetailScreen;

const styles = StyleSheet.create({
    container: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white"
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
