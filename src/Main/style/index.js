import { StyleSheet, Dimensions } from "react-native";
import { fontFamily, fontSizes, colors } from "../../Common/styles/global";

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    margin: 20
  },
  textTitle: {
    fontFamily: fontFamily,
    fontWeight: "bold",
    lineHeight: 30,
    fontSize: fontSizes.fontSize22,
    color: colors.font1,
    textAlign: "center"
  },
  note: {
    fontFamily: fontFamily,
    lineHeight: 19,
    fontSize: fontSizes.fontSize14,
    color: colors.font2,
    textAlign: "center"
  },
  boxContainerWrapper: {
    flex: 1,
    marginVertical: 20
  },
  boxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  innerBoxContainer: {
    width: window.width / 2 - 30
  },
  textContainer: {
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  subHeader: {
    color: colors.font2,
    fontFamily: fontFamily,
    fontWeight: "500",
    fontSize: fontSizes.fontSize14,
    lineHeight: 20
  },
  marginVertical: {
    marginVertical: 5
  },
  placeToCenter: {
    flex: 1,
    justifyContent: "center"
  }
});

export default styles;
