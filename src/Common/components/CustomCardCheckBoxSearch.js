import React from "react";
import { View, Image, Platform } from "react-native";
import Checkbox from "react-native-modest-checkbox";
import styles from "../styles/common";
import { colors, fontSizes } from "../styles/global";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import Text from "./Text";

const CustomCardCheckBoxSearch = ({
  title,
  handleClick,
  value,
  selectId,
  showIcon,
  icon,
  selectIds
}) => {
  const clickStyle = {
    color: colors.primary
  };
  const isIncludeIds = selectIds && selectIds.includes(value);
  const isIncludeId = value === selectId;
  const imageStyle = {
    marginLeft: Platform.OS === "ios" ? 20 : 0
  };

  return (
    <Checkbox
      checkedComponent={
        <Image
          style={imageStyle}
          source={require("../images/searchcheckbox.png")}
        />
      }
      uncheckedComponent={
        <Image style={imageStyle} source={require("../images/unchecked.png")} />
      }
      containerStyle={[
        Platform.OS === "ios"
          ? styles.customCardCheckBoxSearchIOS
          : styles.customCardCheckBoxSearch
      ]}
      onChange={handleClick}
      customLabel={
        <View style={styles.spaceBetweenWithOutFlex}>
          <Text
            style={{
              fontSize: fontSizes.fontSize14,
              fontWeight: "bold",
              margin: Platform.OS === "ios" ? 20 : 35,
              color: isIncludeId || isIncludeIds ? colors.primary : colors.font2
            }}
          >
            {title}
          </Text>
        </View>
      }
      checked={isIncludeId || isIncludeIds}
    />
  );
};

export default CustomCardCheckBoxSearch;
