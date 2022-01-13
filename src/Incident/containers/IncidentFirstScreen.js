import React, { Component } from "react";
import { connect } from "react-redux";
import mainActions from "../../Main/redux/action";
import { saveDataTemporaryAndNavigate } from "../../Common/settings/mainHelper";
import CommonActivityNameScreen from "../../Common/components/screens/CommonActivityNameScreen";

const { saveDataTemporary } = mainActions;

class IncidentFirstScreen extends Component {
  state = {
    incidentName: undefined
  };
  handleNextButton = () => {
    const {
      saveDataTemporary,
      main: { temporaryData, questions },
      navigation: { navigate }
    } = this.props;
    const [question] = questions;
    const { incidentName } = this.state;

    const filterIncidentData = temporaryData.incident.filter(
      incident => incident.screen_number !== "1"
    );
    const sendData = {
      ...temporaryData,
      request_for: "add_incident",
      selectName: incidentName,
      upload_files: [],
      incident: [
        ...filterIncidentData,
        {
          screen_type: "activityname",
          screen_number: "1",
          question_id: question.question_id,
          question: question.question,
          title: incidentName,
          activity_name: incidentName
        }
      ]
    };

    return saveDataTemporaryAndNavigate(
      saveDataTemporary,
      "saveDataTemporary",
      sendData,
      navigate,
      "IncidentSecond"
    );
  };

  handleChangeText = value => {
    this.setState({
      incidentName: value
    });
  };

  render() {
    const {
      main: { questions },
      navigation: { navigate }
    } = this.props;
    const { incidentName } = this.state;
    const [question] = questions;
    return (
      <CommonActivityNameScreen
        currentStep={1}
        total={9}
        handlePressTitleLeft={() => navigate("CreateReport")}
        handleChangeText={this.handleChangeText}
        activityName={incidentName}
        handleNextButton={this.handleNextButton}
        placeholder="Incident Name"
        note="Please Write Incident Name"
        buttonTitle="Next"
        pageTitle={(question && question.question) || ""}
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
)(IncidentFirstScreen);
