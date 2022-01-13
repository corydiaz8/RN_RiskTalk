import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fontFamily,
  fontSizes,
  radius
} from "../../Common/styles/global";

const window = Dimensions.get("window");
const { width, height } = window;
const styles = StyleSheet.create({
  inputField: {
    borderColor: colors.elementLine,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 20,
    fontFamily: fontFamily
  },
  bannerContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  curve: {
    width: width / 2 - 60,
    backgroundColor: colors.primary,
    height: height - (height - 140),
    borderBottomRightRadius: 350
  },
  logo: {
    width: 84,
    height: 90,
    alignSelf: "center"
  },
  man: {
    marginVertical: 20,
    marginHorizontal: 80
  },
  formContainer: {
    padding: 20
  },
  formWrapper: {
    marginVertical: 15
  },
  forgotPassword: {
    color: colors.font2,
    alignSelf: "center",
    lineHeight: 30,
    fontWeight: "700",
    marginTop: -10,
    fontSize: fontSizes.fontSize3,
    fontFamily: fontFamily
  },
  passwordText: {
    fontSize: fontSizes.fontSize12,
    color: colors.primary,
    lineHeight: 16,
    fontWeight: "bold"
  },
  profileScreenBackground: {
    marginHorizontal: 15,
    marginTop: -200
  },
  logoutText: {
    fontSize: fontSizes.fontSize12,
    color: colors.alert,
    lineHeight: 16,
    fontWeight: "bold"
  },

  circleImageContainer: {
    backgroundColor: colors.white,
    height: 150,
    width: 150,
    alignSelf: "center",
    borderRadius: 150 / 2,
    zIndex: 99,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  profileBoxContainer: {
    paddingTop: 70,
    marginTop: -60,
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: radius.radius10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#dadada",
    shadowOpacity: 1.0,
    borderColor: colors.black,
    marginBottom: 10
  },
  titleTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  titleText: {
    color: colors.font2,
    fontSize: fontSizes.fontSize10,
    fontWeight: "bold"
  },
  note: {
    fontWeight: "600",
    fontSize: fontSizes.fontSize14,
    lineHeight: 19,
    color: colors.font1
  },
  curveContainer: {
    backgroundColor: colors.unselected,
    height: 240,
    padding: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  profileButtonContainer: {
    marginHorizontal: 10
  },
  selectPhoto: {
    borderWidth: 1,
    borderColor: colors.white,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    marginRight: 20,
    borderRadius: 28 / 2,
    backgroundColor: "#2BC551"
  },
  signUpLink: {
    marginTop: 0,
    textDecorationLine: 'underline'
  }
});

export default styles;
