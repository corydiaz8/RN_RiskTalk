import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { connect } from "react-redux";
import styles from "../styles/common";

const OfflineInfo = ({ fileSize }) => {
  return (
    <View>
      <Text
        style={{
          color: "red",
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          marginVertical: 10
        }}
      >
        Pending upload
      </Text>
      <View>
        <View style={styles.spaceBetweenWithFlex}>
          <Text>Remaining Files: </Text>
          <Text>{fileSize}</Text>
        </View>
      </View>
    </View>
  );
};

export default OfflineInfo;
