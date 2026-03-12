import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ProductDto } from '../../app/index';
import ApiImage from "../ui/api-image";

type Props = ProductDto & {
  onAddToCart?: (id: string) => void;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  onAddToCart,
}: Props) {
  const bought = false;
  return (
    <View style={styles.card}>
      <View style={styles.imgWrapper}>
        <ApiImage src={image} style={styles.image} />

        {false ? (
          <View style={styles.bonuses}>
            <Text style={styles.bonusText}>{0} ₽</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.price}>{price} ₽</Text>

      <Text style={styles.title}>{name}</Text>

      <Pressable
        style={[styles.button, bought && styles.buttonDisabled]}
        onPress={() => onAddToCart?.(id)}
        disabled={bought}
      >
        <Text style={styles.buttonText}>
          {bought ? "Куплено" : "В корзину"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 171,
    height: 300,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 12,
    marginRight: 12,
    borderRadius: 12,
    padding: 8
  },

  imgWrapper: {
    width: 155,
    height: 158,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  bonuses: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 100,
    backgroundColor: "#ff0051",
  },

  bonusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },

  price: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
  },

  title: {
    fontSize: 14,
    fontWeight: "300",
    width: "100%",
  },

  button: {
    width: "100%",
    height: 34,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },

  buttonDisabled: {
    backgroundColor: "#777",
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
});