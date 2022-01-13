import { StyleSheet, Dimensions } from "react-native";
import { fontFamily, fontSizes, colors } from "../../Common/styles/global";

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1
  },
  contentInnerContainer: {
    margin: 15
  },
  pageTitle: {
    fontFamily: fontFamily,
    fontWeight: "700",
    lineHeight: 30,
    fontSize: fontSizes.fontSize22,
    color: colors.font1,
    textAlign: "center"
  },
  pageTitleOptional: {
    fontFamily: fontFamily,
    fontWeight: "700",
    lineHeight: 30,
    fontSize: fontSizes.fontSize22,
    color: colors.font1,
    textAlign: "left"
  },
  marginVertical: {
    marginVertical: 10
  },
  footer: {
    width: window.width,
    paddingTop: 5,
    paddingHorizontal: 20,
    height: 65,
    zIndex: 99,
    borderTopColor: colors.unselected,
    borderTopWidth: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  note: {
    fontFamily: fontFamily,
    fontWeight: "400",
    lineHeight: 20,
    fontSize: fontSizes.fontSize14,
    color: colors.font2,
    textAlign: "center"
  },
  noteOptional: {
    fontFamily: fontFamily,
    fontWeight: "400",
    lineHeight: 20,
    fontSize: fontSizes.fontSize14,
    color: colors.font2,
    textAlign: "left"
  },
  contentCenter: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
