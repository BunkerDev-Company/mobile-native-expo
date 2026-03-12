import React from "react";
import { Image } from "react-native";

type Props = {
  src?: string;
  style?: any;
  resizeMode?: "cover" | "contain" | "stretch";
};

export default function ApiImage({
  src,
  style,
  resizeMode = "cover",
}: Props) {
  if (!src) return null;

  const uri = `${process.env.EXPO_PUBLIC_API_URL}/api/images?path=${encodeURIComponent(src)}`;

  return (
    <Image
      source={{ uri }}
      style={style}
      resizeMode={resizeMode}
    />
  );
}