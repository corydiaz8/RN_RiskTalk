import React, { Component } from "react";
import { connect } from "react-redux";
import mainActions from "../../Main/redux/action";
import {
  lastValueOfArray,
  currentTimeStamp
} from "../../Common/settings/commonFunc";
import CommonRecordScreen from "../../Common/components/screens/CommonRecordScreen";

const { saveDataTemporary, createModule } = mainActions;

class AssessmentNineScreen extends Component {
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
    const [, , , , , , , , , , question] = questions;
    const sound_file = lastValueOfArray(filePath.split("/"));
    const filterAssessmentData = temporaryData.assessment.filter(
      assessment => assessment.screen_number !== "10"
    );
    const filterUploadFiles = temporaryData.upload_files.filter(
      file => file.screen_number !== "10"
    );
    const sendData = {
      ...temporaryData,
      created_at: currentTimeStamp(),
      upload_files: [
        ...filterUploadFiles,
        {
          file: filePath,
          type: "sound",
          screen_number: "10"
        }
      ],
      assessment: [
        ...filterAssessmentData,
        {
          screen_type: "sound",
          screen_number: "10",
          sound_file: [sound_file],
          question_id: question.question_id,
          question: question.question
        }
      ]
    };
    return new Promise((resolve, reject) => {
      createModule(sendData, resolve, reject);
      navigate("AssessmentSuccess");
    })
      .then(() => {})
      .catch(error => {
        navigate("AssessmentSuccess");
      });
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
    const [, , , , , , , , , , question] = questions;
    const isPresent = temporaryAudioData.find(
      audio => audio.screen_number === 9
    );
    return (
      <CommonRecordScreen
        currentStep={9}
        total={9}
        handlePressTitleLeft={() => goBack()}
        pageTitle={(question && question.question) || ""}
        note={"Please press 'Record' button in order to start recording"}
        isPresent={isPresent}
        screenNumber={9}
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
)(AssessmentNineScreen);
