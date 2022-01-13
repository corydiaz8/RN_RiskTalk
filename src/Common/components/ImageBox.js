import React from "react";
import { Image, Text } from "react-native";
import styles from "../styles/common";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImageBox = ({ handleClick }) => {
  return (
    <TouchableOpacity onPress={handleClick} style={styles.imageContainer}>
      <Image source={require("../images/group.png")} />
      <Text style={styles.imageText}>Add an image(s)</Text>
    </TouchableOpacity>
  );
};
export default ImageBox;
