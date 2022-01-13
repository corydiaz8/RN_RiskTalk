import React from "react";
import { TextInput, View, Text, Platform } from "react-native";
import styles from "../styles/common";
import { colors } from "../styles/global";

export const InputField = ({
  field: { value, name, onChange },
  form: { touched, errors },
  customProps: {
    secure,
    disabled,
    placeholder,
    keyboardType,
    inputStyle,
    mode,
    formWrapper
  }
}) => {
  return (
    <View style={formWrapper}>
      <TextInput
        placeholderTextColor={colors.font3}
        placeholder={placeholder}
        onChangeText={onChange(name)}
        value={value}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        mode={mode}
        value={value || ""}
        disabled={disabled}
        error={errors[name]}
        style={[
          errors[name] ? styles.errorStyle : inputStyle,
          {
            height: 42
          }
        ]}
      />
      {errors[name] && (
        <Text
          style={{ fontSize: 15, alignSelf: "flex-end", color: "#eb4343b8" }}
        >
          {errors[name]}
        </Text>
      )}
    </View>
  );
};
