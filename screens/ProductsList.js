import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const ProductScreen = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    firebase.db.collection("products").onSnapshot((querySnapshot) => {
      const products = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, price } = doc.data();
        products.push({
          id: doc.id,
          name,
          price
        });
      });
      setProducts(products);
    });
  }, []);

  return (
    <>
      <ScrollView>
        {products.map((product) => {
          return (
            <ListItem
              key={product.id}
              bottomDivider
              onPress={() => {
                props.navigation.navigate("ProductDetailScreen", {
                  productId: product.id,
                });
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{product.name}</ListItem.Title>
                <ListItem.Subtitle>R$ {product.price}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          );
        })}
      </ScrollView>
      <View 
        style={{ bottom: 0, marginBottom: 15, paddingHorizontal: 20 }}>
        <Button
          color="#FF0000"
          onPress={() => props.navigation.navigate("CreateProductScreen")}
          title="+  Adicionar produto"
        />
      </View>
    </>
  );
};

export default ProductScreen;
