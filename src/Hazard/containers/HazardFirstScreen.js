import React, { Component } from "react";
import { connect } from "react-redux";
import mainActions from "../../Main/redux/action";
import { saveDataTemporaryAndNavigate } from "../../Common/settings/mainHelper";
import CommonActivityNameScreen from "../../Common/components/screens/CommonActivityNameScreen";

const { saveDataTemporary } = mainActions;

class HazardFirstScreen extends Component {
  state = {
    hazardName: undefined
  };
  handleNextButton = () => {
    const {
      saveDataTemporary,
      main: { temporaryData, questions },
      navigation: { navigate }
    } = this.props;
    const [question] = questions;
    const { hazardName } = this.state;
    const filterHazardData = temporaryData.hazard.filter(
      hazard => hazard.screen_number !== "1"
    );
    const sendData = {
      ...temporaryData,
      request_for: "add_hazard",
      selectName: hazardName,
      upload_files: [],
      hazard: [
        ...filterHazardData,
        {
          screen_type: "activityname",
          screen_number: "1",
          question_id: question.question_id,
          question: question.question,
          title: hazardName,
          activity_name: hazardName
        }
      ]
    };

    return saveDataTemporaryAndNavigate(
      saveDataTemporary,
      "saveDataTemporary",
      sendData,
      navigate,
      "HazardSecond"
    );
  };

  handleChangeText = value => {
    this.setState({
      hazardName: value
    });
  };

  render() {
    const {
      main: { questions },
      navigation: { navigate }
    } = this.props;
    const { hazardName } = this.state;
    const [question] = questions;
    return (
      <CommonActivityNameScreen
        currentStep={1}
        total={9}
        handlePressTitleLeft={() => navigate("CreateReport")}
        handleChangeText={this.handleChangeText}
        activityName={hazardName}
        handleNextButton={this.handleNextButton}
        placeholder="Hazard Name"
        note="Please Write Hazard Name"
        buttonTitle="Next"
        pageTitle={(question && question.question) || ""}
      />
    );
  }
}

export default connect(
  state => ({
    main: state.Main,
    network: state.network
  }),
  {
    saveDataTemporary
  }
)(HazardFirstScreen);
