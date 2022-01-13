import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import { Platform } from "react-native";
import { connect } from "react-redux";
import mainActions from "../../Main/redux/action";
import { saveDataTemporaryAndNavigate } from "../../Common/settings/mainHelper";
import CommonImageUploadScreen from "../../Common/components/screens/CommonImageUploadScreen";
import { lastValueOfArray } from "../../Common/settings/commonFunc";

const { saveDataTemporary } = mainActions;
class IncidentEightScreen extends Component {
  state = {
    photos: []
  };

  getDataFromStore = () => {
    const {
      main: { temporaryData }
    } = this.props;
    return temporaryData.upload_files.filter(
      file => file.screen_number === "9"
    );
  };

  componentDidMount() {
    const screenData = this.getDataFromStore();
    screenData &&
      this.setState({
        photos: screenData
      });
  }

  handleNextButton = () => {
    const {
      saveDataTemporary,
      main: { temporaryData, questions },
      navigation: { navigate }
    } = this.props;
    const { photos } = this.state;
    if (photos.length === 0) {
      navigate("IncidentNine");
    } else {
      const [, , , , , , , , question] = questions;
      const filterIncidentData = temporaryData.incident.filter(
        incident => incident.screen_number !== "9"
      );
      const filterUploadFiles = temporaryData.upload_files.filter(
        file => file.screen_number !== "9"
      );

      const image_file = photos.map(p => p.fileName);
      const sendData = {
        ...temporaryData,
        upload_files: [
          ...filterUploadFiles,
          ...photos.map(p => {
            return {
              file: Platform.OS === "ios" ? p.uri : p.path,
              type: "image",
              screen_number: "9"
            };
          })
        ],
        incident: [
          ...filterIncidentData,
          {
            screen_type: "image",
            screen_number: "9",
            image_file: image_file,
            question_id: question.question_id,
            question: question.question
          }
        ]
      };

      return saveDataTemporaryAndNavigate(
        saveDataTemporary,
        "saveDataTemporary",
        sendData,
        navigate,
        "IncidentNine"
      );
    }
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.showImagePicker(options, response => {
      if (Platform.OS === "ios") {
        let appendData = response;
        const splitName = response.uri.split("/");
        const fileName = lastValueOfArray(splitName);
        appendData = {
          ...response,
          fileName
        };
        if (response.uri) {
          this.setState(prevState => ({
            photos: [...prevState.photos, appendData]
          }));
        }
      } else {
        if (response.uri) {
          this.setState(prevState => ({
            photos: [...prevState.photos, response]
          }));
        }
      }
    });
  };

  handleDeletePhoto = index => {
    const filterImages = this.state.photos.filter((photo, i) => i !== index);
    this.setState({
      photos: filterImages
    });
  };
  render() {
    const {
      main: { questions },
      navigation: { navigate, goBack }
    } = this.props;
    const { photos } = this.state;
    const [, , , , , , , , question] = questions;
    return (
      <CommonImageUploadScreen
        currentStep={8}
        total={9}
        pageTitle={(question && question.question) || ""}
        handlePressTitleLeft={() => goBack()}
        handleChoosePhoto={this.handleChoosePhoto}
        handleDeletePhoto={this.handleDeletePhoto}
        handleNextButton={this.handleNextButton}
        photos={photos}
        note="You may upload one or more images"
        buttonTitle="Next"
      />
    );
  }
}

export default connect(
  state => ({
    main: state.Main
  }),
  {
    saveDataTemporary
  }
)(IncidentEightScreen);
