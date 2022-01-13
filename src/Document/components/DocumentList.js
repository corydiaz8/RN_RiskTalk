import React from "react";
import { View, Image } from "react-native";
import styles from "../../Common/styles/common";
import Text from "../../Common/components/Text";
import HorizontalLine from "../../Common/components/HorizontalLine";
import documentStyles from "../style";
import { TouchableOpacity } from "react-native-gesture-handler";

const DocumentList = ({
  title,
  underline,
  handlePress,
  margin,
  color,
  iconDocument
}) => (
  <View style={styles.marginV10}>
    <TouchableOpacity onPress={handlePress} style={styles.flexStart}>
      <Image
        source={
          iconDocument
            ? require("../../Common/images/folder.png")
            : require("../../Common/images/pdf.png")
        }
      ></Image>
      <Text style={documentStyles.documentTitle}>{title}</Text>
    </TouchableOpacity>
    {underline && <HorizontalLine margin={margin} color={color} />}
  </View>
);

export default DocumentList;
