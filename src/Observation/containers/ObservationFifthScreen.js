import React, { Component } from "react";
import { connect } from "react-redux";
import mainActions from "../../Main/redux/action";
import { lastValueOfArray } from "../../Common/settings/commonFunc";
import { saveDataTemporaryAndNavigate } from "../../Common/settings/mainHelper";
import CommonRecordScreen from "../../Common/components/screens/CommonRecordScreen";

const { saveDataTemporary } = mainActions;

class ObservationFifthScreen extends Component {
  state = {
    filePath: ""
  };

  handleNextButton = () => {
    const {
      saveDataTemporary,
      main: { temporaryData, questions },
      navigation: { navigate }
    } = this.props;
    const [, , , , question] = questions;
    const sound_file = lastValueOfArray(this.state.filePath.split("/"));

    const filterObservationData = temporaryData.observation.filter(
      observation => observation.screen_number !== "5"
    );
    const filterUploadFiles = temporaryData.upload_files.filter(
      file => file.screen_number !== "5"
    );

    const sendData = {
      ...temporaryData,
      upload_files: [
        ...filterUploadFiles,
        {
          file: this.state.filePath,
          type: "sound",
          screen_number: "5"
        }
      ],
      observation: [
        ...filterObservationData,
        {
          screen_type: "sound",
          screen_number: "5",
          sound_file: [sound_file],
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
      "ObservationSix"
    );
  };

  handleAfterCreate = path => {
    this.setState({
      filePath: path
    });
  };
  render() {
    const {
      main: { temporaryData, questions, temporaryAudioData },
      navigation: { navigate, goBack }
    } = this.props;
    const [, , , , question] = questions;
    const isPresent = temporaryAudioData.find(
      audio => audio.screen_number === 5
    );
    const [, , observation] = temporaryData.observation;

    return (
      <CommonRecordScreen
        isList={true}
        dataSources={observation.critical_risks}
        currentStep={5}
        total={7}
        handlePressTitleLeft={() => goBack()}
        pageTitle={(question && question.question) || ""}
        note={"Please press 'Record' button in order to start recording"}
        isPresent={isPresent}
        screenNumber={5}
        handleAfterCreate={this.handleAfterCreate}
        handleNextButton={this.handleNextButton}
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
)(ObservationFifthScreen);