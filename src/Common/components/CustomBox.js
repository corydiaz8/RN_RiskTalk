import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import styles from "../styles/common";

const CustomBox = ({ title, handleClick, imageUrl }) => {
  return (
    <TouchableOpacity onPress={handleClick} style={styles.customBox}>
      <Image resizeMode="contain" style={styles.boxLogo} source={imageUrl} />
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBox;
