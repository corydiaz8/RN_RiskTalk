import React from "react";
import { Platform, KeyboardAvoidingView } from "react-native";

const CustomKeyboardAvoidingView = ({ children }) => (
  <KeyboardAvoidingView
    style={{
      flex: 1
    }}
    behavior="position"
    enabled={Platform.OS === "ios" ? true : false}
  >
    {children}
  </KeyboardAvoidingView>
);

export default CustomKeyboardAvoidingView;
