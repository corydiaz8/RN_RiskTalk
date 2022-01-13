import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/common";

const CustomCard = ({ title, handleClick }) => (
  <TouchableOpacity onPress={handleClick} style={styles.customCard}>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

export default CustomCard;
