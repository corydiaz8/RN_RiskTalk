import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "../styles/common";
import Text from "../components/Text";
import { withNavigation } from "react-navigation";
import { colors } from "../styles/global";

const footerRoutes = [
  {
    name: "New Report",
    select: require("../../Common/images/select_create_report.png"),
    unselect: require("../../Common/images/unselect_create_report.png"),
    path: "CreateReport"
  },
  {
    name: "Documents",
    select: require("../../Common/images/select_document.png"),
    unselect: require("../../Common/images/unselect_document.png"),
    path: "Document"
  },
  {
    name: "Reports",
    select: require("../../Common/images/select_report.png"),
    unselect: require("../../Common/images/unselect_report.png"),
    path: "Report"
  },
  {
    name: "Profile",
    select: require("../../Common/images/select_profile.png"),
    unselect: require("../../Common/images/unselect_profile.png"),
    path: "Profile"
  }
];

const CustomFooter = ({ currentIndex, navigation: { navigate } }) => {
  return (
    <View style={[styles.footerContainer, styles.spaceBetweenWithOutFlex]}>
      {footerRoutes.map((route, index) => {
        const isSelected = currentIndex === index;
        return (
          <TouchableOpacity key={index} onPress={() => navigate(route.path)}>
            <View style={styles.footerImageTextContainer}>
              <Image
                source={isSelected ? route.select : route.unselect}
                style={{
                  marginTop: 10,
                  marginBottom: 5
                }}
              />
              <Text
                style={{
                  lineHeight: 14,
                  fontWeight: "600",
                  fontSize: 10,
                  color: isSelected ? colors.primary : colors.font3
                }}
              >
                {route.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default withNavigation(CustomFooter);
