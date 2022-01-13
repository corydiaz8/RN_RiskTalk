import React, { Component } from "react";
import { View } from "react-native";
import Text from "../../Common/components/Text";
import { Grid, Row } from "react-native-easy-grid";
import styles from "../../Common/styles/container";
import commonStyles, { window } from "../../Common/styles/common";
import { connect } from "react-redux";
import CustomButton from "../../Common/components/CustomButton";
import CreateForm from "../../Common/components/CreateForm";
import CustomHeader from "../../Common/components/CustomHeader";
import { colors } from "../../Common/styles/global";
import actions from "../redux/action";

const { logOut } = actions;
class LogOutScreen extends Component {
  handleLogOut = () => {
    const {
      logOut,
      navigation: { navigate }
    } = this.props;
    return new Promise((resolve, reject) => {
      logOut(resolve, reject);
    }).then(() => {
      navigate("SignIn");
    });
  };

  render() {
    const {
      navigation: { goBack, navigate }
    } = this.props;
    return (
      <Grid>
        <Row size={1.5}>
          <View style={[styles.contentContainer, styles.contentInnerContainer]}>
            <CustomHeader handlePress={() => goBack()} />
          </View>
        </Row>
        <Row size={1.5}>
          <View style={[styles.contentContainer, styles.contentInnerContainer]}>
            <Text style={styles.pageTitle}>
              Are you sure you want to Logout?
            </Text>
          </View>
        </Row>
        <Row size={1}>
          <View
            style={[
              commonStyles.spaceBetweenWithFlex,
              styles.contentContainer,
              styles.footer
            ]}
          >
            <CustomButton
              buttonStyle={{
                width: window.width / 2 - 25,
                height: 48,
                borderRadius: 6,
                backgroundColor: colors.white
              }}
              titleStyle={{
                color: colors.primary
              }}
              solid
              handlePress={() => navigate("Profile")}
              title="Cancel"
            />
            <CustomButton
              buttonStyle={{
                width: window.width / 2 - 25,
                height: 48,
                borderRadius: 6,
                backgroundColor: colors.alert
              }}
              handlePress={this.handleLogOut}
              title="Logout"
            />
          </View>
        </Row>
      </Grid>
    );
  }
}

export default connect(
  null,
  {
    logOut
  }
)(LogOutScreen);
