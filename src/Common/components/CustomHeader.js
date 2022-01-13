import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import styles from "../styles/common";
import Text from "../../Common/components/Text";

const CustomHeader = ({ children, handlePress, rightTitle }) => {
  return (
    <View style={styles.customHeaderContainer}>
      {handlePress && (
        <TouchableOpacity onPress={handlePress}>
          <Icon style={{ marginTop: 5 }} type="ionicon" name="ios-arrow-back" />
        </TouchableOpacity>
      )}
      {children && (
        <View
          style={{
            paddingHorizontal: 22,
            minHeight: 45
          }}
        >
          {children.length > 1
            ? children.map(child => {
                return child;
              })
            : children}
        </View>
      )}
      {rightTitle ? (
        <View>
          <Text style={{ marginTop: 5 }}>{rightTitle}</Text>
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default CustomHeader;
