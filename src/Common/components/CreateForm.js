import React from "react";
import { View, Text, TextInput, Platform } from "react-native";
import styles from "../styles/common";
import { colors } from "../styles/global";

const CreateForm = ({
  note,
  placeholder,
  value,
  handleChangeText,
  ...restProps
}) => {
  return (
    <View>
      <Text style={styles.note}>{note}</Text>
      <TextInput
        onChangeText={handleChangeText}
        value={value}
        placeholderTextColor={colors.font3}
        style={[
          styles.inputField,
          {
            height: 42
          }
        ]}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  );
};
export default CreateForm;
