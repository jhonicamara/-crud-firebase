import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const ProductDetailScreen = (props) => {
  const initialState = {
    id: "",
    product: "",
    price: "",
  };

  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setProduct({ ...product, [prop]: value });
  };

  const getProductById = async (id) => {
    const dbRef = firebase.db.collection("products").doc(id);
    const doc = await dbRef.get();
    const product = doc.data();
    setProduct({ ...product, id: doc.id });
    setLoading(false);
  };

  const deleteProduct = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("products")
      .doc(props.route.params.productId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("ProductsList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Deletando o Produto",
      "Você tem certeza?",
      [
        { text: "Sim", onPress: () => deleteProduct() },
        { text: "Não", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateProduct = async () => {
    const ProductRef = firebase.db.collection("products").doc(product.id);
    await ProductRef.set({
      name: product.name,
      price: product.price,
    });
    setProduct(initialState);
    props.navigation.navigate("ProductsList");
  };

  useEffect(() => {
    console.log(props.route.params.productId);
    getProductById(props.route.params.productId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          style={styles.inputGroup}
          value={product.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Price"
          keyboardType="number-pad"
          style={styles.inputGroup}
          value={product.price}
          onChangeText={(value) => handleTextChange(value, "price")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Deletar"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Atualizar" onPress={() => updateProduct()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 10,
  },
});

export default ProductDetailScreen;
