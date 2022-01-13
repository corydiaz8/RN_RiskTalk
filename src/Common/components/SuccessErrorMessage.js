import React from "react";
import { View, Image } from "react-native";
import Text from "./Text";
import styles from "../styles/common";

const SuccessErrorMessage = ({ status, title, note }) => {
  return (
    <View>
      <View style={[styles.successErrorImageContainer]}>
        {status ? (
          <Image source={require("../../Common/images/success.png")} />
        ) : (
          <Image source={require("../../Common/images/success.png")} />
        )}
      </View>
      <View style={styles.successErrorTitleContainer}>
        <Text style={styles.pageTitle}>{title}</Text>
      </View>
      <Text style={styles.succssErrorNote}>{note}</Text>
    </View>
  );
};

export default SuccessErrorMessage;
