import React, { Component } from "react";
import { connect } from "react-redux";
import mainActions from "../../Main/redux/action";
import { saveDataTemporaryAndNavigate } from "../../Common/settings/mainHelper";
import CommonSliderScreen from "../../Common/components/screens/CommonSliderScreen";

const { saveDataTemporary } = mainActions;

class IncidentFourScreen extends Component {
  state = {
    sliderValue1: 0
  };

  handleSliderValueChange1 = value => {
    this.setState({
      sliderValue1: value
    });
  };

  handleNextButton = () => {
    const {
      saveDataTemporary,
      main: { temporaryData, questions, actualConsequences },
      navigation: { navigate }
    } = this.props;
    const { sliderValue1 } = this.state;
    const actualConsequence = actualConsequences.find(
      (con, i) => i === parseInt(Math.round(sliderValue1))
    );

    const [, , , question] = questions;
    const filterIncidentData = temporaryData.incident.filter(
      incident => incident.screen_number !== "4"
    );

    const sendData = {
      ...temporaryData,
      incident: [
        ...filterIncidentData,
        {
          screen_type: "actual_consequence",
          screen_number: "4",
          actual_consequence: [actualConsequence.actualconsequence_id],
          actual_consequences: actualConsequence.option_name,
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
      "IncidentFifth"
    );
  };
  render() {
    const {
      main: { questions, actualConsequences },
      navigation: { goBack }
    } = this.props;
    const [, , , question] = questions;

    const { sliderValue1 } = this.state;
    const isPresent = actualConsequences.length > 0;
    return (
      <CommonSliderScreen
        currentStep={4}
        total={9}
        single
        pageTitle1={(question && question.question) || ""}
        note1="Please drag slider from left side - lowest, till right side - highest"
        sliderValue1={sliderValue1}
        sliderValues1={actualConsequences}
        handleSliderValueChange1={this.handleSliderValueChange1}
        handlePressTitleLeft={() => goBack()}
        isPresent={isPresent}
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
  { saveDataTemporary }
)(IncidentFourScreen);
