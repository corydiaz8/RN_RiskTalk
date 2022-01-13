import React, { Component } from "react";
import { connect } from "react-redux";
import Text from "../../Common/components/Text";
import View from "../../Common/components/View";
import CustomButton from "../../Common/components/CustomButton";
import CustomCardCheckBox from "../../Common/components/CustomCardCheckBox";
import LineSegment from "../../Common/components/lineSegment";
import CustomHeader from "../../Common/components/CustomHeader";
import mainActions from "../../Main/redux/action";
import { saveDataTemporaryAndNavigate } from "../../Common/settings/mainHelper";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../Common/styles/container";

const { saveDataTemporary } = mainActions;

class AssessmentThirdScreen extends Component {
  state = {
    selectIds: [],
    selectNames: []
  };

  getDataFromStore = () => {
    const {
      main: { temporaryData }
    } = this.props;
    return temporaryData.assessment.find(
      assessment => assessment.screen_number === "3"
    );
  };

  componentDidMount() {
    const screenData = this.getDataFromStore();
    screenData &&
      this.setState({
        selectIds: screenData.criticalrisk
      });
  }

  handleClickCardCheckBox = (selectId, selectName) => {
    if (this.state.selectIds.includes(selectId)) {
      const filterIds = this.state.selectIds.filter(id => id !== selectId);
      const filterNames = this.state.selectNames.filter(
        name => name !== selectName
      );
      this.setState({ selectIds: filterIds, selectNames: filterNames });
    } else {
      this.setState({
        selectIds: [...this.state.selectIds, selectId],
        selectNames: [...this.state.selectNames, selectName]
      });
    }
  };

  handleNextButton = () => {
    const {
      saveDataTemporary,
      main: { temporaryData, questions },
      navigation: { navigate }
    } = this.props;
    const [, , , question] = questions;
    const { selectNames } = this.state;
    const filterAssessmentData = temporaryData.assessment.filter(
      assessment => assessment.screen_number !== "3"
    );

    const sendData = {
      ...temporaryData,
      assessment: [
        ...filterAssessmentData,
        {
          screen_type: "criticalrisk",
          screen_number: "3",
          question_id: question.question_id,
          question: question.question,
          criticalrisk: this.state.selectIds,
          critical_risks: selectNames
        }
      ]
    };
    return saveDataTemporaryAndNavigate(
      saveDataTemporary,
      "saveDataTemporary",
      sendData,
      navigate,
      "AssessmentFour"
    );
  };

  render() {
    const {
      main: { risks, questions },
      navigation: { navigate, goBack }
    } = this.props;
    const { selectIds } = this.state;
    const [, , , question] = questions;

    return (
      <View height="100%">
        <View height="12%">
          <LineSegment currentStep={3} total={9} />
          <View style={styles.contentInnerContainer}>
            <CustomHeader handlePress={() => goBack()}>
              <Text style={styles.pageTitle}>
                {(question && question.question) || ""}{" "}
              </Text>
            </CustomHeader>
          </View>
        </View>
        <View height="80%">
          <View style={styles.contentInnerContainer}>
            <ScrollView>
              {risks.map(risk => {
                return (
                  <CustomCardCheckBox
                    showIcon
                    icon={risk.icon.replace("fas fa-", "")}
                    key={risk.criticalrisks_id}
                    selectIds={selectIds}
                    value={risk.criticalrisks_id}
                    handleClick={this.handleClickCardCheckBox.bind(
                      this,
                      risk.criticalrisks_id,
                      risk.option_name
                    )}
                    title={risk.option_name}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View height="8%">
          <View style={styles.footer}>
            <CustomButton
              disabled={selectIds.length === 0}
              handlePress={this.handleNextButton}
              position="right"
              title="Next"
            />
          </View>
        </View>
      </View>
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
)(AssessmentThirdScreen);
