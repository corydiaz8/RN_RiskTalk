import React from "react";
import { View, Dimensions } from "react-native";
import styles from "../styles/common";
import { colors } from "../styles/global";
const window = Dimensions.get("window");

const LineSegment = ({ total, currentStep }) => {
  const arrays = new Array(total + 1)
    .join("0")
    .split("")
    .map(parseFloat);
  const width = window.width / total;
  const different = total - currentStep;
  return (
    <View style={styles.lineContainer}>
      {arrays.map((a, index) => {
        return (
          <View
            key={index}
            style={{
              width: width - 2,
              height: 8,
              backgroundColor:
                different <= index ? colors.lowRisk : colors.elementLine
            }}
          />
        );
      })}
    </View>
  );
};

export default LineSegment;
