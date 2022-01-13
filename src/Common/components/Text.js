import React from "react";
import { Text as CustomText } from "react-native";
import styles from "../styles/common";

const Text = ({ style, children }) => {
  return (
    <CustomText
      style={style ? [style, styles.textContainer] : styles.textContainer}
    >
      {children}
    </CustomText>
  );
};

export default Text;
