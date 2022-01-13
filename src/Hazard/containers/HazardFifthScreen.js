import React, { Component } from "react";
import { connect } from "react-redux";
import mainActions from "../../Main/redux/action";
import { saveDataTemporaryAndNavigate } from "../../Common/settings/mainHelper";
import CommonRiskBoxScreen from "../../Common/components/screens/CommonRiskBoxScreen";

const { saveDataTemporary } = mainActions;
class HazardFifthScreen extends Component {
  handleNextButton = () => {
    const {
      saveDataTemporary,
      main: { temporaryData, questions, listRatingValues },
      navigation: { navigate, getParam }
    } = this.props;
    const likelihoodId = getParam("likelihood_id");
    const consequenceId = getParam("consequence_id");
    const riskValue =
      listRatingValues.length > 0 &&
      listRatingValues.find(
        rating =>
          rating.likelihood_id === likelihoodId &&
          rating.consequence_id === consequenceId
      );
    const [, , , , , question] = questions;
    const filterHazardData = temporaryData.hazard.filter(
      hazard => hazard.screen_number !== "6"
    );
    const sendData = {
      ...temporaryData,
      rating_value_id: riskValue.rating_val_id,
      hazard: [
        ...filterHazardData,
        {
          screen_type: "rating_value",
          screen_number: "6",
          rating_value_id: riskValue.rating_val_id,
          question_id: question.question_id,
          question: question.question,
          rating_value: {
            color: riskValue.color,
            name: riskValue.color
          }
        }
      ]
    };

    return saveDataTemporaryAndNavigate(
      saveDataTemporary,
      "saveDataTemporary",
      sendData,
      navigate,
      "HazardSix"
    );
  };

  render() {
    const {
      main: { listRatingValues, questions },
      navigation: { goBack, getParam }
    } = this.props;
    const likelihoodId = getParam("likelihood_id");
    const consequenceId = getParam("consequence_id");

    const riskValue =
      listRatingValues.length > 0 &&
      listRatingValues.find(
        rating =>
          rating.likelihood_id === likelihoodId &&
          rating.consequence_id === consequenceId
      );
    const [, , , , , question] = questions;
    return (
      <CommonRiskBoxScreen
        currentStep={5}
        total={7}
        handlePressTitleLeft={() => goBack()}
        pageTitle={(question && question.question) || ""}
        riskValue={riskValue}
        buttonTitle="Next"
        handleNextButton={this.handleNextButton}
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
)(HazardFifthScreen);
