import React from "react";
import { View as CustomView } from "react-native";

const View = ({ style, children, height, direction }) => {
  if (height) {
    return (
      <CustomView
        style={
          style
            ? [style, { flexDirection: direction || "column", height: height }]
            : { flexDirection: direction || "column", height: height }
        }
      >
        {children && children.length > 0
          ? children.map(child => {
              return child;
            })
          : children}
      </CustomView>
    );
  }
  return (
    <CustomView
      style={
        style
          ? [style, { flexDirection: direction || "column" }]
          : { flexDirection: direction || "column" }
      }
    >
      {children && children.length > 0
        ? children.map(child => {
            return child;
          })
        : children}
    </CustomView>
  );
};

export default View;
