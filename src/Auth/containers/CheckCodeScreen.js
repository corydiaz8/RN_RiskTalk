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
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

const { checkCode } = actions;

class CheckCodeScreen extends Component {
  state = {
    code: undefined,
    loading: false
  };

  handleChangeText = code => {
    this.setState({
      code
    });
  };
  handleCheckCode = () => {
    const {
      checkCode,
      navigation: { navigate, getParam }
    } = this.props;
    const { code } = this.state;
    const email = getParam("email");
    const sendData = {
      request_for: "forgot_password_code",
      code,
      email
    };
    this.setState({
      loading: true
    });
    return new Promise((resolve, reject) => {
      checkCode(sendData, resolve, reject);
    })
      .then(response => {
        this.setState({
          loading: false
        });
        if (response.status === 1) {
          navigate("ChangeForgotPassword", {
            email
          });
          getToastNotification(response.massege);
        } else {
          getToastNotification(response.massege);
        }
      })
      .catch(error => {
        console.log("ERROR", error);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const {
      navigation: { goBack, navigate }
    } = this.props;
    const { code, loading } = this.state;
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
                Please enter 4 digit validation code.
              </Text>
            </View>
            <View
              style={[
                styles.contentContainer,
                styles.contentInnerContainer,
                styles.placeToEnd
              ]}
            >
              <SmoothPinCodeInput
                containerStyle={{
                  alignSelf: "center"
                }}
                editable
                ref={this.pinInput}
                value={code}
                onTextChange={this.handleChangeText}
              />
            </View>
          </View>

          <View height="15%">
            <View style={[styles.contentContainer, styles.footer]}>
              <CustomButton
                loading={loading}
                disabled={!code || loading}
                handlePress={this.handleCheckCode}
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

export default connect(null, { checkCode })(CheckCodeScreen);
