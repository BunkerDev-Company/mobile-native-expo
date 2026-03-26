import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingScreenProps {
  text?: string;
}

export default function LoadingScreen({ text }: LoadingScreenProps) {
    return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator
        size="large"
        color="#D62F50"
      />
      {text && (
        <Text className="mt-4 text-gray-500 text-base text-center">{text}</Text>
      )}
    </View>
    )
}