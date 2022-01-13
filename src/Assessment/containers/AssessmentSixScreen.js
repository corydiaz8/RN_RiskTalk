import React, { Component } from "react";
import { connect } from "react-redux";
import mainActions from "../../Main/redux/action";
import CommonSliderScreen from "../../Common/components/screens/CommonSliderScreen";

const { saveDataTemporary } = mainActions;

class AssessmentSixScreen extends Component {
  state = {
    sliderValue1: 0,
    sliderValue2: 0
  };
  handleSliderValueChange1 = value => {
    this.setState({
      sliderValue1: value
    });
  };
  handleSliderValueChange2 = value => {
    this.setState({
      sliderValue2: value
    });
  };

  handleNextButton = () => {
    const {
      saveDataTemporary,
      main: { temporaryData, questions, consequences, listLikeliHoods },
      navigation: { navigate }
    } = this.props;
    const { sliderValue1, sliderValue2 } = this.state;
    const consequence = consequences.find(
      (con, i) => i === parseInt(Math.round(sliderValue1))
    );
    const likelihood = listLikeliHoods.find(
      (con, i) => i === parseInt(Math.round(sliderValue2))
    );

    const [, , , , , , question1, question2] = questions;
    const filterAssessmentData = temporaryData.assessment.filter(
      assessment =>
        assessment.screen_number !== "6" && assessment.screen_number !== "7"
    );

    const sendData = {
      ...temporaryData,
      assessment: [
        ...filterAssessmentData,
        {
          screen_type: "consequence",
          screen_number: "6",
          consequence_id: consequence.consequence_id,
          question_id: question1.question_id,
          question: question1.question,
          consequence: consequence.option_name
        },
        {
          screen_type: "likelihood",
          screen_number: "7",
          likelihood_id: likelihood.likelihood_id,
          question_id: question2.question_id,
          question: question2.question,
          likelihood: likelihood.option_name
        }
      ]
    };
    return new Promise((resolve, reject) => {
      saveDataTemporary("saveDataTemporary", sendData, resolve, reject);
    })
      .then(() => {
        navigate("AssessmentSeven", {
          likelihood_id: likelihood.likelihood_id,
          consequence_id: consequence.consequence_id
        });
      })
      .catch(error => {
        console.log("ERROR");
      });
  };
  render() {
    const {
      main: { questions, consequences, listLikeliHoods },
      navigation: { goBack }
    } = this.props;
    const [, , , , , , question1, question2] = questions;

    const { sliderValue1, sliderValue2 } = this.state;
    const isPresent = consequences.length > 0 && listLikeliHoods.length > 0;

    return (
      <CommonSliderScreen
        currentStep={6}
        total={9}
        pageTitle1={`1) ${(question1 && question1.question) || ""}`}
        note1="Please drag slider from left side - lowest, till right side - highest"
        sliderValue1={sliderValue1}
        sliderValues1={consequences}
        handleSliderValueChange1={this.handleSliderValueChange1}
        pageTitle2={`2) ${(question2 && question2.question) || ""}`}
        note2="Please drag slider from left side - lowest, till right side - highest"
        sliderValue2={sliderValue2}
        sliderValues2={listLikeliHoods}
        handleSliderValueChange2={this.handleSliderValueChange2}
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
)(AssessmentSixScreen);
