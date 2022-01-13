import React from "react";
import { View } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import styles from "../../Common/styles/container";
import CustomButton from "../../Common/components/CustomButton";
import SuccessErrorMessage from "../../Common/components/SuccessErrorMessage";
import { withNavigation } from "react-navigation";

const notifications = [
  {
    id: 1,
    name: "reset",
    title: "You have Successfully send Reset Password Link",
    note: "Please follow instructions for password reset in your email address"
  },
  {
    id: 2,
    name: "change",
    title: "You have successfully change your password",
    note: ""
  }
];

const PasswordLinkScreen = ({ navigation: { navigate, getParam } }) => {
  const sourceName = getParam("source");
  const notification = notifications.find(
    notification => notification.name === sourceName
  );
  const { title, note } = notification;
  return (
    <Grid>
      <Row size={1} />
      <Row size={2}>
        <View style={[styles.contentContainer, styles.contentInnerContainer]}>
          <SuccessErrorMessage status={true} title={title} note={note} />
        </View>
      </Row>
      <Row size={1}>
        <View style={[styles.contentContainer, styles.footer]}>
          <CustomButton
            handlePress={() => navigate("SignIn")}
            position="right"
            title="Continue"
          />
        </View>
      </Row>
    </Grid>
  );
};

export default withNavigation(PasswordLinkScreen);
