import React, { Component } from "react";
import Text from "../../Common/components/Text";
import { connect } from "react-redux";
import styles from "../../Common/styles/container";
import CustomButton from "../../Common/components/CustomButton";
import CreateForm from "../../Common/components/CreateForm";
import View from "../../Common/components/View";
import CustomHeader from "../../Common/components/CustomHeader";
import actions from "../redux/action";
import CustomKeyboardAvoidingView from "../../Common/components/CustomKeyboardAvoidingView";
import getToastNotification from "../../Common/settings/toast";

const { forgotPassword } = actions;

class ForgotPasswordScreen extends Component {
  state = {
    email: undefined
  };

  handleChangeText = email => {
    this.setState({
      email
    });
  };
  handleForgotPassword = () => {
    const {
      forgotPassword,
      navigation: { navigate }
    } = this.props;
    const { email } = this.state;
    const sendData = {
      request_for: "forgot_password_email",
      email
    };

    return new Promise((resolve, reject) => {
      forgotPassword(sendData, resolve, reject);
    })
      .then(response => {
        if (response.status === 1) {
          navigate("CheckCode", {
            email
          });
          getToastNotification(response.massege);
        } else {
          getToastNotification(response.massege);
        }
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  render() {
    const {
      auth: { loadingForgotPassword },
      navigation: { goBack, navigate }
    } = this.props;
    const { email } = this.state;
    return (
      <CustomKeyboardAvoidingView>
        <View height="100%">
          <View height="20%">
            <View
              style={[styles.contentContainer, styles.contentInnerContainer]}
            >
              <CustomHeader handlePress={() => goBack()} />
              <Text style={styles.pageTitle}>Forgot Password</Text>
            </View>
          </View>
          <View height="65%">
            <View
              style={[
                styles.contentContainer,
                styles.contentInnerContainer,
                styles.placeToCenter
              ]}
            >
              <Text style={styles.note}>
                Please enter a valid email address and we will
              </Text>
              <Text style={styles.note}>
                send a 4 digit code to your registered email
              </Text>
            </View>
            <View
              style={[
                styles.contentContainer,
                styles.contentInnerContainer,
                styles.placeToEnd
              ]}
            >
              <CreateForm
                handleChangeText={this.handleChangeText}
                value={email}
                placeholder="E-Mail Address"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View height="15%">
            <View style={[styles.contentContainer, styles.footer]}>
              <CustomButton
                loading={loadingForgotPassword}
                disabled={!email || loadingForgotPassword}
                handlePress={this.handleForgotPassword}
                position="right"
                title="Send"
              />
            </View>
          </View>
        </View>
      </CustomKeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth
  }),
  { forgotPassword }
)(ForgotPasswordScreen);
