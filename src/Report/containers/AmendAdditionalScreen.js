import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../redux/action";
import CommonRecordScreen from "../../Common/components/screens/CommonRecordScreen";

const {
  saveAmendAdditional,
  createAmendAdditional,
  listAmendAdditional
} = actions;
class AmendAdditionalScreen extends Component {
  state = {
    filePath: ""
  };

  loadAmendAdditional = () => {
    const {
      listAmendAdditional,
      main: {
        temporaryData: { selectedCompanyId }
      },
      navigation: { getParam }
    } = this.props;
    const activity_id = getParam("activity_id");
    const sendData = {
      request_for: "additionfiles",
      activity_id,
      company_id: selectedCompanyId
    };
    return new Promise((resolve, reject) => {
      listAmendAdditional(sendData, resolve, reject);
    })
      .then(() => {})
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  handleNextButton = () => {
    const {
      saveAmendAdditional,
      createAmendAdditional,
      main: {
        temporaryData: { selectedCompanyId }
      },
      report: { saveAmendAdditionals },
      navigation: { navigate, getParam }
    } = this.props;
    const activity_id = getParam("activity_id");
    const currentValue = getParam("currentValue");
    const sendData = [
      ...saveAmendAdditionals,
      {
        file: this.state.filePath,
        type: "sound",
        activity_id,
        screen_number: "1",
        selectedCompanyId
      }
    ];
    return new Promise((resolve, reject) => {
      createAmendAdditional(sendData, resolve, reject);
    })
      .then(() => {
        this.loadAmendAdditional();
        navigate("ReportDetails", {
          activity_id,
          currentValue
        });
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  handleAfterCreate = path => {
    this.setState({
      filePath: path
    });
  };

  render() {
    const {
      main: { temporaryAudioData },
      report: { createAmendAdditionalInfoLoading },
      navigation: { goBack, navigate, getParam }
    } = this.props;
    const isPresent = temporaryAudioData.find(
      audio => audio.screen_number === 1
    );
    return (
      <CommonRecordScreen
        final
        handlePressTitleLeft={() => goBack()}
        pageTitle="+Add Amend / Additional Info"
        note={"Please press 'Record' button in order to start recording"}
        isPresent={isPresent}
        screenNumber={1}
        disabled={createAmendAdditionalInfoLoading || !isPresent}
        loading={createAmendAdditionalInfoLoading}
        handleAfterCreate={this.handleAfterCreate}
        handleNextButton={this.handleNextButton}
        buttonTitle="+Add"
      />
    );
  }
}

export default connect(
  state => ({
    main: state.Main,
    report: state.Report
  }),
  {
    saveAmendAdditional,
    createAmendAdditional,
    listAmendAdditional
  }
)(AmendAdditionalScreen);
