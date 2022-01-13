import React, { Component } from "react";
import { Text, Image, TouchableOpacity, Linking, Platform } from "react-native";
import { connect } from "react-redux";
import SignInForm from "../components/SignInForm";
import styles from "../style";
import CustomButton from "../../Common/components/CustomButton";
import { LoginValidation } from "../../Common/settings/required";
import actions from "../redux/action";
import getToastNotification from "../../Common/settings/toast";
import { ScrollView } from "react-native-gesture-handler";
import View from "../../Common/components/View";
import containerStyles from "../../Common/styles/container";
import { Formik } from "formik";
import CustomKeyboardAvoidingView from "../../Common/components/CustomKeyboardAvoidingView";

const { logIn } = actions;

const LOGIN_SUCCESS = "Login Successfully";
const LOGIN_FAILED = "Invalid credentials, please try again";

class SignInScreen extends Component {
  normalizeDataBeforeSubmit = data => {
    return {
      ...data,
      request_for: "login"
    };
  };

  handleLogin = data => {
    const {
      logIn,
      navigation: { navigate }
    } = this.props;
    return new Promise((resolve, reject) => {
      logIn(this.normalizeDataBeforeSubmit(data), resolve, reject);
    })
      .then(response => {
        if (response === 1) {
          navigate("Main");
          getToastNotification(LOGIN_SUCCESS);
        } else {
          getToastNotification(LOGIN_FAILED);
        }
      })
      .catch(() => {});
  };

  render() {
    const {
      navigation: { navigate },
      auth: { loginLoading }
    } = this.props;
    return (
      <CustomKeyboardAvoidingView>
        <View height="100%">
          <ScrollView
            contentContainerStyle={containerStyles.flexGrowWithPadding}
          >
            <View height="32%">
              <View direction="row" style={styles.bannerContainer}>
                <View style={styles.curve} />
                <Image
                  style={styles.man}
                  source={require("../../Common/images/man.png")}
                />
              </View>
            </View>
            <View height="20%">
              <View style={[styles.loginContainer]}>
                <Image
                  style={styles.logo}
                  source={require("../../Common/images/blogo.png")}
                />
              </View>
            </View>
            <View height="38%">
              <View style={[styles.loginContainer, styles.formContainer]}>
                <Formik
                  onSubmit={values => this.handleLogin(values)}
                  validationSchema={LoginValidation}
                  // initialValues={{
                  //   //email: "davidp@e-improvement.com.au",
                  //   email: "dnhpress@gmail.com",
                  //   password: "1qaz2wsx"
                  // }}
                  render={props => (
                    <View>
                      <SignInForm />
                      <CustomButton
                        disabled={loginLoading}
                        loading={loginLoading}
                        handlePress={props.handleSubmit}
                        title="Login"
                      />
                    </View>
                  )}
                />
              </View>
              <TouchableOpacity onPress={() => navigate("ForgotPassword")}>
                <Text style={styles.forgotPassword}> Forgot Password ?</Text>
              </TouchableOpacity>
              {
                Platform.OS == 'android' &&
                  <TouchableOpacity onPress={() => navigate("SignUpWeview")}>
                    <Text style={[styles.forgotPassword, styles.signUpLink]}>Sign Up To Free 14 Day Trial</Text>
                  </TouchableOpacity>
              }
            </View>
          </ScrollView>
        </View>
      </CustomKeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    network: state.network
  }),
  { logIn }
)(SignInScreen);
