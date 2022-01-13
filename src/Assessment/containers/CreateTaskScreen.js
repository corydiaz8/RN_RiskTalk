import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../Main/redux/action";
import { saveDataTemporaryAndNavigate } from "../../Common/settings/mainHelper";
import CommonActivityNameScreen from "../../Common/components/screens/CommonActivityNameScreen";

const { createTask, saveDataTemporary } = actions;

class CreateTaskScreen extends Component {
  state = {
    task: undefined
  };

  handleChangeText = value => {
    this.setState({ task: value });
  };

  handleNextButton = () => {
    const {
      createTask,
      navigation: { navigate },
      auth: {
        userDetails: { id }
      },
      main: {
        temporaryData: { selectedCompanyId, selectedProjectId }
      }
    } = this.props;
    const { task } = this.state;
    const sendData = {
      request_for: "task_add",
      activity_type: "assessment",
      company_id: selectedCompanyId,
      project_id: selectedProjectId,
      name: task,
      user_id: id
    };
    return new Promise((resolve, reject) => {
      createTask(sendData, resolve, reject);
    })
      .then(({ option_name, task_id }) => {
        const {
          saveDataTemporary,
          main: { temporaryData, questions },
          navigation: { navigate }
        } = this.props;
        const [question] = questions;
        const filterAssessmentData = temporaryData.assessment.filter(
          assessment => assessment.screen_number !== "1"
        );
        const sendData = {
          ...temporaryData,
          request_for: "add_assessment",
          selectName: option_name,
          upload_files: [],
          assessment: [
            ...filterAssessmentData,
            {
              screen_type: "task",
              screen_number: "1",
              task_id,
              question_id: question.question_id,
              question: question.question,
              task: option_name
            }
          ]
        };

        return saveDataTemporaryAndNavigate(
          saveDataTemporary,
          "saveDataTemporary",
          sendData,
          navigate,
          "AssessmentSecond"
        );
      })
      .catch(() => {});
  };

  render() {
    const {
      navigation: { navigate },
      main: { loadingCreateTask }
    } = this.props;
    const { task } = this.state;
    return (
      <CommonActivityNameScreen
        handlePressTitleLeft={() => navigate("AssessmentFirst")}
        handleChangeText={this.handleChangeText}
        activityName={task}
        handleNextButton={this.handleNextButton}
        placeholder="Assessment Task Name"
        note="Please Write Assessment Task Name"
        buttonTitle="Next"
        pageTitle="Assessment Task Name"
      />
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    main: state.Main
  }),
  { createTask, saveDataTemporary }
)(CreateTaskScreen);
