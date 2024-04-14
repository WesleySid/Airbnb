import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import axios from "axios";

export default function MapScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=48.8566&longitude=2.3522"
        );
        console.log("Fetched data:", data); // Afficher les données récupérées de l'API
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log("Fetch error:", error); // Afficher les erreurs lors de la récupération des données
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* Afficher un indicateur de chargement ici */}
        </View>
      ) : (
        <MapView
          // La MapView doit obligatoirement avoir des dimensions
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {data.map((apartment) => (
            <Marker
              key={apartment._id}
              coordinate={{
                latitude: apartment.location[1],
                longitude: apartment.location[0],
              }}
              title={apartment.title}
              description={apartment.description}
            >
              <Image
                source={{ uri: apartment.photos[0].url }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <Callout>
                <View style={{ maxHeight: 200, overflow: "hidden" }}>
                  <Image
                    source={{ uri: apartment.photos[0].url }}
                    style={{ width: 100, height: 100 }}
                  />
                  <View>
                    <Text>{apartment.title}</Text>
                    <Text>{apartment.description}</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}
