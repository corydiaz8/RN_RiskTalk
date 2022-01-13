import { StyleSheet } from "react-native";
import { fontSizes, colors } from "../../Common/styles/global";

const styles = StyleSheet.create({
  reportTitle: {
    fontSize: fontSizes.fontSize16,
    color: colors.font1,
    lineHeight: 22,
    fontWeight: "bold",
    marginVertical: 5
  },
  noteTitle: {
    fontSize: fontSizes.fontSize14,
    lineHeight: 19,
    fontWeight: "600",
    color: colors.primary
  },
  count: {
    color: colors.primary
  },
  riskBoxContainer: {
    height: 60,
    fontSize: fontSizes.fontSize22,
    lineHeight: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12
  },
  riskBoxText: {
    fontSize: fontSizes.fontSize14,
    fontWeight: "bold",
    lineHeight: 30,
    color: colors.black
  },
  emptyText: {
    marginVertical: 10
  },
  emptyImageContainer: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  wrapperContainer: {}
});

export default styles;
