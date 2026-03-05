import { StyleSheet } from 'react-native';

export const themeBool = true;
export const color = themeBool ? "#FFFFFF" : "#000000";

const fontDefault = {
  color: color,
  fontSize: 17,
};

export const defaultStyle = StyleSheet.create({
  fontDefault,
  font28: {
    ...fontDefault,
    fontSize: 28
  }
})  