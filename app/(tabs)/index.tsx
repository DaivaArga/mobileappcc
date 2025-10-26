import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const photos = [
    require("../../assets/images/photo1.jpg"),
    require("../../assets/images/photo2.jpg"),
    require("../../assets/images/photo3.jpg"),
  ];


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📸 Galeri Foto Simple</Text>
      {photos.map((photo, index) => (
        <Image key={index} source={photo} style={styles.image} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
});
