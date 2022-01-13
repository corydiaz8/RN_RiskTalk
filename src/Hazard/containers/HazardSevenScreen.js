import React, { Component } from "react";
import { connect } from "react-redux";
import mainActions from "../../Main/redux/action";
import {
  lastValueOfArray,
  currentTimeStamp
} from "../../Common/settings/commonFunc";
import CommonRecordScreen from "../../Common/components/screens/CommonRecordScreen";

const { saveDataTemporary, createModule } = mainActions;

class HazardSevenScreen extends Component {
  state = {
    filePath: ""
  };

  handleNextButton = () => {
    const {
      saveDataTemporary,
      createModule,
      main: { temporaryData, questions },
      navigation: {
        navigate,
        state: { routeName }
      }
    } = this.props;
    const { filePath } = this.state;
    const [, , , , , , , question] = questions;
    const sound_file = lastValueOfArray(filePath.split("/"));
    const filterHazardData = temporaryData.hazard.filter(
      hazard => hazard.screen_number !== "8"
    );
    const filterUploadFiles = temporaryData.upload_files.filter(
      file => file.screen_number !== "8"
    );
    const sendData = {
      ...temporaryData,
      created_at: currentTimeStamp(),
      upload_files: [
        ...filterUploadFiles,
        {
          file: filePath,
          type: "sound",
          screen_number: "8"
        }
      ],
      hazard: [
        ...filterHazardData,
        {
          screen_type: "sound",
          screen_number: "8",
          sound_file: [sound_file],
          question_id: question.question_id,
          question: question.question
        }
      ]
    };
    return new Promise((resolve, reject) => {
      createModule(sendData, resolve, reject);
      navigate("HazardSuccess");
    })
      .then(() => {})
      .catch(error => {});
  };

  handleAfterCreate = path => {
    this.setState({
      filePath: path
    });
  };
  render() {
    const {
      main: { questions, temporaryAudioData, createModuleLoading },
      navigation: { navigate, goBack }
    } = this.props;
    const [, , , , , , , question] = questions;
    const isPresent = temporaryAudioData.find(
      audio => audio.screen_number === 8
    );
    return (
      <CommonRecordScreen
        currentStep={7}
        total={7}
        handlePressTitleLeft={() => goBack()}
        pageTitle={(question && question.question) || ""}
        note={"Please press 'Record' button in order to start recording"}
        isPresent={isPresent}
        screenNumber={8}
        handleAfterCreate={this.handleAfterCreate}
        handleNextButton={this.handleNextButton}
        buttonTitle="Next"
        final
        loading={createModuleLoading}
        disabled={createModuleLoading || !isPresent}
      />
    );
  }
}

export default connect(
  state => ({
    main: state.Main
  }),
  {
    saveDataTemporary,
    createModule
  }
)(HazardSevenScreen);
