import React from "react";
import { View, Image, Platform } from "react-native";
import Checkbox from "react-native-modest-checkbox";
import styles from "../styles/common";
import { colors, fontSizes } from "../styles/global";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import Text from "./Text";

const CustomCardCheckBox = ({
  title,
  handleClick,
  value,
  selectId,
  showIcon,
  icon,
  selectIds
}) => {
  const clickStyle = {
    backgroundColor: colors.primary
  };
  const isIncludeIds = selectIds && selectIds.includes(value);
  const isIncludeId = value === selectId;

  const imageStyle = {
    marginLeft: Platform.OS === "ios" ? 20 : 0
  };

  return (
    <Checkbox
      checkedComponent={
        <Image style={imageStyle} source={require("../images/checked.png")} />
      }
      uncheckedComponent={
        <Image style={imageStyle} source={require("../images/unchecked.png")} />
      }
      containerStyle={[
        Platform.OS === "ios"
          ? styles.customCardCheckBoxIOS
          : styles.customCardCheckBox,
        isIncludeId || isIncludeIds ? clickStyle : {}
      ]}
      onChange={handleClick}
      customLabel={
        <View style={[styles.spaceBetweenWithFlex]}>
          <Text
            style={{
              fontSize: fontSizes.fontSize14,
              fontWeight: "bold",
              margin: Platform.OS === "ios" ? 20 : 35,
              color: isIncludeId || isIncludeIds ? colors.white : colors.font2
            }}
          >
            {title}
          </Text>
          {showIcon && (
            <FontAwesome5
              style={{
                justifyContent: "center",
                margin: Platform.OS === "ios" ? 15 : 30,
                color: isIncludeId || isIncludeIds ? colors.white : colors.font2
              }}
              size={25}
              light
              name={icon}
            />
          )}
        </View>
      }
      checked={isIncludeId || isIncludeIds}
    />
  );
};

export default CustomCardCheckBox;
