import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { fontSizes, colors } from "../styles/global";

const Tags = ({ dataSources }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginTop: -30,
      marginHorizontal: 10
    }}
  >
    {dataSources.map((source, index) => (
      <View
        key={index}
        style={{
          backgroundColor: colors.primary,
          padding: 5,
          marginVertical: 2,
          borderRadius: 25 / 2
        }}
      >
        <Text style={{ color: colors.white, fontSize: fontSizes.fontSize10 }}>
          {source}
        </Text>
      </View>
    ))}
  </View>
);
export default Tags;
