import React, { Component } from "react";
import { connect } from "react-redux";
import Text from "../../Common/components/Text";
import styles from "../../Common/styles/container";
import CustomButton from "../../Common/components/CustomButton";
import CustomHeader from "../../Common/components/CustomHeader";
import { ChangeForgotPasswordValidation } from "../../Common/settings/required";
import { ScrollView } from "react-native-gesture-handler";
import actions from "../redux/action";
import View from "../../Common/components/View";
import { Formik } from "formik";
import CustomKeyboardAvoidingView from "../../Common/components/CustomKeyboardAvoidingView";
import ForgotChangePasswordForm from "../components/ForgotChangePasswordForm";

const { changeForgotPassword } = actions;

class ChangeForgotPasswordScreen extends Component {
  state = {
    loading: false
  };
  handleClickNext = data => {
    const {
      navigation: { navigate, getParam },
      changeForgotPassword
    } = this.props;
    const email = getParam("email");
    const { password } = data;
    this.setState({
      loading: true
    });
    const sendData = {
      request_for: "forgot_password_change_pass",
      password,
      email
    };
    return new Promise((resolve, reject) => {
      changeForgotPassword(sendData, resolve, reject);
    })
      .then(response => {
        this.setState({
          loading: false
        });
        if (response.status === 1) {
          navigate("PasswordLink", {
            source: "change"
          });
        }
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const {
      valid,
      navigation: { goBack }
    } = this.props;
    return (
      <CustomKeyboardAvoidingView>
        <View height="100%">
          <View height="10%">
            <View style={styles.contentInnerContainer}>
              <CustomHeader handlePress={() => goBack()}>
                <Text style={styles.pageTitle}>Change Password</Text>
              </CustomHeader>
            </View>
          </View>
          <View height="90%">
            <ScrollView
              contentContainerStyle={[
                styles.flexGrowWithPadding,
                styles.flexEnd
              ]}
            >
              <View style={[styles.contentInnerContainer]}>
                <Formik
                  onSubmit={values => this.handleClickNext(values)}
                  validationSchema={ChangeForgotPasswordValidation}
                  render={props => {
                    return (
                      <View>
                        <ForgotChangePasswordForm />
                        <CustomButton
                          loading={this.state.loading}
                          disabled={!props.isValid || this.state.loading}
                          handlePress={props.handleSubmit}
                          position="right"
                          title="Submit"
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </CustomKeyboardAvoidingView>
    );
  }
}

export default connect(null, {
  changeForgotPassword
})(ChangeForgotPasswordScreen);
