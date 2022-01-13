import React from "react";
import { View, Dimensions } from "react-native";
import { colors } from "../../Common/styles/global";
import styles from "../../Common/styles/common";
const window = Dimensions.get("window");

const TabHorizontalLine = ({ total, currentStep }) => {
  const arrays = new Array(total + 1)
    .join("0")
    .split("")
    .map(parseFloat);
  const width = (window.width - 20) / total;
  return (
    <View style={styles.spaceBetweenWithOutFlex}>
      {arrays.map((a, index) => {
        return (
          <View
            key={index}
            style={{
              width: width,
              height: currentStep === index ? 3 : 1,
              backgroundColor:
                currentStep === index ? colors.primary : colors.line
            }}
          />
        );
      })}
    </View>
  );
};

export default TabHorizontalLine;
