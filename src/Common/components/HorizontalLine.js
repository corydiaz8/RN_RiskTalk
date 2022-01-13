import React from "react";
import { View } from "react-native";
import styles from "../styles/common";
import { colors } from "../styles/global";

const HorizontalLine = ({ margin, color }) => {
  const additionalStyle = {
    backgroundColor: color || colors.elementLine,
    marginVertical: margin || 0
  };
  return <View style={[additionalStyle, styles.horizontalLine]} />;
};

export default HorizontalLine;
