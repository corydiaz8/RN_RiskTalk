import React from "react";
import { View, Text } from "react-native";
import styles from "../style/index";

const ReportRiskBox = ({ title, color }) => {
  const propStyle = {
    backgroundColor: color
  };
  return (
    <View style={[styles.riskBoxContainer, propStyle]}>
      <Text style={styles.riskBoxText}>{title}</Text>
    </View>
  );
};

export default ReportRiskBox;
