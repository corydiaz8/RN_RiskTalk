import { StyleSheet } from "react-native";
import { fontSizes, colors } from "../../Common/styles/global";

const styles = StyleSheet.create({
  documentTitle: {
    fontSize: fontSizes.fontSize16,
    color: colors.primary,
    marginLeft: 15,
    lineHeight: 22,
    fontWeight: "bold",
    marginVertical: 0
  },
  emptyImageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    marginVertical: 10
  }
});

export default styles;
