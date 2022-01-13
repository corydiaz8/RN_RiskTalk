import { StyleSheet, Dimensions, Platform } from "react-native";
import { fontFamily, colors, fontSizes, borderRadius, radius } from "./global";

export const window = Dimensions.get("window");

const styles = StyleSheet.create({
  customButton: {
    height: 48,
    borderRadius: borderRadius,
    backgroundColor: colors.primary
  },
  errorStyle: {
    borderColor: colors.alert,
    borderWidth: 1,
    borderRadius: borderRadius,
    paddingHorizontal: 20,
    fontFamily: fontFamily
  },
  customCard: {
    height: 60,
    borderRadius: radius.radius12,
    borderColor: colors.stroke,
    backgroundColor: colors.unselected,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7
  },
  cardTitle: {
    fontFamily: fontFamily,
    color: colors.primary,
    fontSize: fontSizes.fontSize3,
    fontWeight: "700"
  },
  customBox: {
    borderRadius: radius.radius10,
    borderColor: colors.stroke,
    borderWidth: 1,
    backgroundColor: colors.unselected,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7,
    padding: 20,
    textAlign: "center"
  },
  customCardCheckBox: {
    height: 60,
    borderRadius: 12,
    borderColor: colors.stroke,
    borderWidth: 1,
    backgroundColor: colors.unselected,
    justifyContent: "center",
    marginVertical: 7,
    paddingHorizontal: 20
  },
  customCardCheckBoxIOS: {
    borderRadius: 12,
    flex: 1,
    borderColor: colors.stroke,
    borderWidth: 1,
    backgroundColor: colors.unselected,
    marginVertical: 7,
    paddingHorizontal: 0,
    height: 60,
    zIndex: 0
  },
  customCardCheckBoxSearch: {
    height: 60,
    borderRadius: 12,
    borderBottomColor: colors.lineBlack,
    borderBottomWidth: 1,
    marginVertical: 7,
    paddingHorizontal: 20
  },
  customCardCheckBoxSearchIOS: {
    height: 60,
    borderRadius: 12,
    borderBottomColor: colors.lineBlack,
    borderBottomWidth: 1,
    marginVertical: 7,
    paddingHorizontal: 0
  },
  boxLogo: {
    marginVertical: 8
  },
  tabContainer: {
    flexDirection: "row",
    height: 52,
    elevation: 2
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  pageTitle: {
    fontFamily: fontFamily,
    fontWeight: "700",
    lineHeight: 30,
    fontSize: fontSizes.fontSize22,
    color: colors.font1,
    textAlign: "center"
  },
  searchContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lineBlack,
    borderRadius: 6,
    zIndex: 1
  },
  searchContentContainer: {
    marginBottom: 50
  },
  emptySearchText: {
    fontSize: fontSizes.fontSize14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 19
  },
  marginV10: {
    marginVertical: 10
  },
  actionTitle: {
    color: colors.primary,
    fontSize: fontSizes.fontSize14,
    marginTop: 5,
    fontWeight: "bold"
  },
  horizontalLine: {
    height: 1
  },
  note: {
    fontFamily: fontFamily,
    lineHeight: 30,
    fontSize: fontSizes.fontSize14,
    color: colors.font1,
    textAlign: "center"
  },
  spaceBetweenWithFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  spaceBetweenWithOutFlex: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  flexStart: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  inputField: {
    borderColor: colors.elementLine,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 20,
    fontFamily: fontFamily
  },
  lineContainer: {
    flexDirection: "row-reverse",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    marginRight: -2
  },
  circleContainer: {
    backgroundColor: colors.highRisk,
    borderRadius: 120 / 2,
    width: 120,
    height: 120
  },
  flexCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  pluseWrapperContainer: {
    width: 200,
    minHeight: 120,
    justifyContent: "center",
    alignItems: "center"
  },
  recordControlContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  playContainer: {
    backgroundColor: colors.unselected,
    borderColor: colors.stroke,
    borderWidth: 1,
    width: 52,
    height: 52,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  resetText: {
    color: colors.font2,
    fontWeight: "bold",
    fontSize: fontSizes.fontSize12
  },
  imageText: {
    fontSize: fontSizes.fontSize14,
    lineHeight: 19,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 5
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.primary,
    borderStyle: "dashed",
    borderWidth: 2,
    height: 230,
    borderRadius: borderRadius
  },
  voiceWaveFormContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#ECEEEF",
    borderBottomColor: "#ECEEEF",
    justifyContent: "center"
  },
  timeStampBar: {},
  timerContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10
  },
  timer: {
    color: "#758088",
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 16
  },
  recordControlContainerWrapper: {
    margin: 10
  },
  voiceWaveForm: {
    flexDirection: "row",
    alignItems: "center"
  },
  singleWaveForm: {
    borderRadius: 20,
    backgroundColor: "#007CDC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 1
  },
  textContainer: {
    fontFamily: fontFamily
  },
  customHeaderContainer: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  imageBackgroundContainer: {
    width: window.width / 2 - 30,
    height: 212,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 10,
    padding: 10
  },
  borderRadius4: {
    borderRadius: 4
  },
  imageCancelButton: {
    backgroundColor: colors.alert,
    width: 44,
    borderRadius: 100,
    height: 44
  },
  riskBoxContainer: {
    height: 124,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.radius12
  },
  riskBoxText: {
    fontSize: fontSizes.fontSize22,
    fontWeight: "bold",
    lineHeight: 30,
    color: colors.black
  },
  successErrorImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },
  successErrorTitleContainer: {
    marginVertical: 20
  },

  succssErrorNote: {
    fontFamily: fontFamily,
    lineHeight: 20,
    fontSize: fontSizes.fontSize14,
    color: colors.font1,
    textAlign: "center",
    paddingHorizontal: 20
  },
  footerImageTextContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  footerContainer: {
    borderTopColor: colors.lineBlack,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 5
  },
  listTitle: {
    fontSize: fontSizes.fontSize16,
    lineHeight: 22,
    fontWeight: "bold",
    color: colors.primary
  },
  listSubText: {
    fontSize: fontSizes.fontSize12,
    lineHeight: 16,
    fontWeight: "bold",
    color: colors.font3
  },
  dateText: {
    fontSize: fontSizes.fontSize12,
    lineHeight: 16,
    fontWeight: "bold"
  },
  titleContainer: {
    marginVertical: 5
  },
  subTitleContainer: {
    marginVertical: 10
  },
  titleSubTitleListWrapper: {
    paddingVertical: 10
  },
  listWrapper: {},
  searchInputContainer: {
    borderBottomColor: colors.white
  },
  searchInputContainerTouch: {
    borderBottomColor: colors.lineBlack
  },
  sliderTextWrapper: {
    width: "100%"
  }
});

export default styles;
