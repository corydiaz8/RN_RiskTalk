import React, { Component } from "react";
import { ImageBackground, Platform } from "react-native";
import Text from "../../Common/components/Text";
import View from "../../Common/components/View";
import { connect } from "react-redux";
import commonStyles from "../../Common/styles/common";
import mainStyles from "../../Main/style/index";
import containerStyles from "../../Common/styles/container";
import authStyles from "../style/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import HorizontalLine from "../../Common/components/HorizontalLine";
import CustomFooter from "../../Common/components/CustomFooter";
import CustomButton from "../../Common/components/CustomButton";
import { Icon } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import { colors } from "../../Common/styles/global";
import actions from "../redux/action";
import getToastNotification from "../../Common/settings/toast";

const CHANGE_PROFILE = "Profile photo updated successfully";
const CHANGE_PROFILE_FAILED = "Profile photo upload failed";

const { changeProfileImage, profile } = actions;

class ProfileScreen extends Component {
  state = {
    photo: undefined
  };

  componentDidUpdate(prevProps) {
    const {
      auth: {
        userDetails: { avatar }
      }
    } = this.props;
    if (prevProps.auth.userDetails.avatar !== avatar) {
      this.setState({
        photo: avatar
      });
    }
  }
  handleClickChangeCompany = () => {
    const {
      navigation: { navigate },
      profile,
      auth: {
        userDetails: { id }
      }
    } = this.props;
    navigate("Project", {
      redirectTo: "CreateReport",
      showToast: "single"
    });
    const sendData = { request_for: "profile", user_id: id };
    return new Promise((resolve, reject) => {
      profile(sendData, resolve, reject);
    })
      .then(() => {})
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        const userfile = Platform.OS === "ios" ? response.uri : response.path;
        this.setState(
          {
            photo: response
          },
          () => this.handleChangeProfile(userfile)
        );
      }
    });
  };

  handleChangeProfile = userfile => {
    const {
      changeProfileImage,
      auth: {
        userDetails: { id, first_name, last_name, phone, address }
      }
    } = this.props;
    const sendData = {
      userfile,
      type: "image",
      first_name,
      last_name,
      address,
      phone,
      user_id: id
    };
    return new Promise((resolve, reject) => {
      changeProfileImage(sendData, resolve, reject);
    })
      .then(response => {
        const { message } = response;
        if (message === "") {
          getToastNotification(CHANGE_PROFILE);
          this.setState({
            photo: undefined
          });
        } else {
          getToastNotification(message);
          this.setState({
            photo: undefined
          });
        }
      })
      .catch(error => {
        this.setState({
          photo: undefined
        });
        console.log("ERROR", error);
        getToastNotification(CHANGE_PROFILE_FAILED);
      });
  };

  displayUserImage = avatar => {
    const { photo } = this.state;
    if (photo) {
      return {
        uri: Platform.OS === "ios" ? photo.uri : "file://" + photo.path
      };
    }
    if (avatar) {
      return {
        uri: avatar
      };
    }

    return require("../../Common/images/blank_profile.jpg");
  };

  render() {
    const {
      navigation: { navigate },
      auth: {
        userDetails: {
          first_name,
          last_name,
          phone,
          avatar,
          address,
          position,
          email
        }
      }
    } = this.props;
    const customButtonStyle = {
      paddingVertical: 10,
      paddingHorizontal: 20
    };
    return (
      <View height="100%">
        <View height="75%">
          <View style={containerStyles.contentContainer}>
            <View
              direction="row"
              style={[
                authStyles.curveContainer,
                commonStyles.spaceBetweenWithOutFlex
              ]}
            >
              <TouchableOpacity onPress={() => navigate("ChangePassword")}>
                <Text style={authStyles.passwordText}> PASSWORD</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate("LogOut")}>
                <Text style={authStyles.logoutText}> LOGOUT</Text>
              </TouchableOpacity>
            </View>
            <View style={[authStyles.profileScreenBackground]}>
              <ImageBackground
                imageStyle={{ borderRadius: 150 / 2 }}
                source={this.displayUserImage(avatar)}
                style={authStyles.circleImageContainer}
              >
                <TouchableOpacity
                  onPress={this.handleChoosePhoto}
                  style={authStyles.selectPhoto}
                >
                  <Icon color={colors.white} name="add-circle-outline" />
                </TouchableOpacity>
              </ImageBackground>
              <View style={[authStyles.profileBoxContainer]}>
                <Text style={commonStyles.pageTitle}>
                  {`${first_name} ${last_name}`}
                </Text>
                <Text style={commonStyles.note}>{position || "N/A"}</Text>
                <HorizontalLine color="#D6DCDF" margin={10} />
                <View style={authStyles.titleTextWrapper}>
                  <Text style={authStyles.titleText}>E-MAIL</Text>
                  <Text style={authStyles.note}> {email || "N/A"}</Text>
                </View>
                <View style={authStyles.titleTextWrapper}>
                  <Text style={authStyles.titleText}>PHONE</Text>
                  <Text style={authStyles.note}> {phone || "N/A"}</Text>
                </View>
                <View style={authStyles.titleTextWrapper}>
                  <Text style={authStyles.titleText}>ADDRESS</Text>
                  <Text style={authStyles.note}> {address || "N/A"}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View height="15%">
          <View style={mainStyles.screenContainer}>
            <View
              direction="row"
              style={[
                authStyles.profileButtonContainer,
                commonStyles.spaceBetweenWithOutFlex,
                {
                  marginVertical: 30
                }
              ]}
            >
              <CustomButton
                handlePress={() =>
                  navigate("Company", {
                    redirectTo: "CreateReport",
                    showToast: "both"
                  })
                }
                title="Change Company"
                buttonStyle={[customButtonStyle, { height: 45 }]}
              />
              <CustomButton
                handlePress={this.handleClickChangeCompany}
                title="Change Project"
                buttonStyle={[customButtonStyle, { height: 45 }]}
              />
            </View>
          </View>
        </View>
        <View height="10%">
          <View style={mainStyles.screenContainer}>
            <CustomFooter currentIndex={3} />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth
  }),
  {
    changeProfileImage,
    profile
  }
)(ProfileScreen);
