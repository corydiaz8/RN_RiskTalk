import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles/common";

const CommonList = ({ listTitle, actionTitle, handleActionClick }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.pageTitle}>{listTitle}</Text>
      {actionTitle && (
        <TouchableOpacity
          style={{
            padding: 10
          }}
          onPress={handleActionClick}
        >
          <View>
            <Text style={styles.actionTitle}> + {actionTitle} </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonList;
