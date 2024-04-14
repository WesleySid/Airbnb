// HomeScreen.js
import React, { useEffect, useState, StyleSheet } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const displayStars = (number) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < number) {
        tab.push(<FontAwesome name="star" size={24} color="yellow" />);
      } else {
        tab.push(<FontAwesome name="star" size={24} color="grey" />);
      }
    }
    return tab;
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("RoomScreen", { id: item._id })}
          >
            <ImageBackground
              source={{ uri: item.photos[0].url }}
              style={{ height: 200, justifyContent: "flex-end" }}
            >
              <View
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10 }}
              >
                <Text style={{ color: "white" }}>{item.price} €</Text>
              </View>
            </ImageBackground>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View>
                <Text>{item.title}</Text>
                <View style={{ flexDirection: "row" }}>
                  {displayStars(item.ratingValue)}
                </View>
              </View>
              <Image
                source={{ uri: item.user.account.photo.url }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  picture: {
    height: 200,
    width: "100%",
    justifyContent: "flex-end",
  },
  priceContainer: {
    backgroundColor: "black",
    width: 80,
    height: 35,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontSize: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  titleRatings: {
    gap: 20,
    padding: 5,
  },
  profilePicView: {
    // backgroundColor: "red",
    justifyContent: "center",
  },
});
