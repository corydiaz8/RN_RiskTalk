import React from "react";
import { ScrollView as CustomScrollView } from "react-native-gesture-handler";

const ScrollView = ({ children }) => {
  return (
    <CustomScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {children && children.length > 0
        ? children.map(child => {
            return child;
          })
        : children}
    </CustomScrollView>
  );
};

export default ScrollView;
