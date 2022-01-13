import React from "react";
import { View } from "react-native";
import Spinner from "react-native-spinkit";
import { colors } from "../styles/global";
import styles from "../styles/common";

const CustomLoader = () => {
  return (
    <View style={styles.flexCenter}>
      <Spinner isVisible={true} size={50} type="Wave" color={colors.primary} />
    </View>
  );
};

export default CustomLoader;
