import React, { Component } from "react";
import { connect } from "react-redux";
import Text from "../../Common/components/Text";
import styles from "../../Common/styles/container";
import CustomButton from "../../Common/components/CustomButton";
import CustomHeader from "../../Common/components/CustomHeader";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { ChangePasswordValidation } from "../../Common/settings/required";
import { ScrollView } from "react-native-gesture-handler";
import actions from "../redux/action";
import View from "../../Common/components/View";
import { Formik } from "formik";
import CustomKeyboardAvoidingView from "../../Common/components/CustomKeyboardAvoidingView";

const { changePassword } = actions;
class ChangePasswordScreen extends Component {
  handleClickNext = data => {
    const {
      navigation: { navigate },
      changePassword,
      auth: {
        userDetails: { id }
      }
    } = this.props;
    const { new_password, old_password } = data;
    const sendData = {
      request_for: "changepassword",
      user_id: id,
      new_password,
      old_password
    };
    return new Promise((resolve, reject) => {
      changePassword(sendData, resolve, reject);
    })
      .then(response => {
        if (response === 1) {
          navigate("PasswordLink", {
            source: "change"
          });
        }
      })
      .catch(() => {});
  };

  render() {
    const {
      valid,
      navigation: { goBack },
      auth: { loadingChangePassword }
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
                  validationSchema={ChangePasswordValidation}
                  render={props => {
                    return (
                      <View>
                        <ChangePasswordForm />
                        <CustomButton
                          loading={loadingChangePassword}
                          disabled={!props.isValid}
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

export default connect(
  state => ({
    auth: state.Auth
  }),
  {
    changePassword
  }
)(ChangePasswordScreen);
