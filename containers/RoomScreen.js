import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Carousel from "react-native-snap-carousel";

export default function RoomScreen({ route }) {
  const { id } = route.params;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/" + id
        );
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderCarouselItem = ({ item }) => <CarouselImage url={item.url} />;

  const CarouselImage = ({ url }) => (
    <Image source={{ uri: url }} style={styles.carouselImage} />
  );

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <Carousel
        data={data.photos}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={300}
        layout="default"
      />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: data.location[1], // Latitude en premier
          longitude: data.location[0], // Longitude en deuxième
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
          title={data.title}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 36,
  },
  map: {
    width: "80%",
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 40,
  },
});
