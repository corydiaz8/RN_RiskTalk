import React, { Component } from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";
import Permissions from "react-native-permissions";
import authActions from "../../Auth/redux/action";
import SplashScreen from "react-native-splash-screen";

const { checkAuthorization } = authActions;
const checkObject = object =>
  Object.entries(object).length === 0 && object.constructor === Object;

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: undefined
    };
  }

  async componentDidMount() {
    try {
      SplashScreen.hide();

      if (Platform.OS === "ios") {
        return new Promise((resolve, reject) => {
          this.props.checkAuthorization("authorized", resolve, reject);
        })
          .then(() => {
            this.setState({
              permission: "authorized"
            });
            this.checkAuthorizationAndRedirect();
            this.getPermissionForDevice();
          })
          .catch(e => {
            this.setState({
              permission: "authorized"
            });
            this.checkAuthorizationAndRedirect();
            this.getPermissionForDevice();
          });
      } else {
        await Permissions.check("storage")
          .then(success => {
            return new Promise((resolve, reject) => {
              this.props.checkAuthorization(success, resolve, reject);
            }).then(() => {
              this.setState({
                permission: success
              });
            });
          })
          .catch(error => {
            Permissions.request("storage");
            this.props.checkAuthorization(error);
          });
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  }

  getPermissionForDevice = async () => {
    if (Platform.OS === "ios") {
    } else {
      await Permissions.request("storage").then(response =>
        console.log("storage", response)
      );
    }

    await Permissions.request("location").then(response =>
      console.log("location", response)
    );

    await Permissions.request("microphone").then(response =>
      console.log("microphone", response)
    );

    await Permissions.request("camera").then(response =>
      console.log("camera", response)
    );

    await Permissions.request("photo").then(response =>
      console.log("photo", response)
    );
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.auth.userDetails !== this.props.auth.userDetails) {
      await this.checkAuthorizationAndRedirect(this.state.permission);
      await this.getPermissionForDevice();
    }
  }
  checkAuthorizationAndRedirect = async () => {
    const {
      navigation: { navigate },
      auth: { userDetails }
    } = this.props;

    const isObjectEmpty = await checkObject(userDetails);
    await navigate(isObjectEmpty ? "Auth" : "Main");
  };
  render() {
    return <View />;
  }
}

export default connect(
  state => ({
    auth: state.Auth
  }),
  { checkAuthorization }
)(AuthLoadingScreen);
