import React, { Component } from "react";
import { View } from "react-native";
import Text from "../../Common/components/Text";
import { Grid, Row } from "react-native-easy-grid";
import CustomHeader from "../../Common/components/CustomHeader";
import styles from "../../Common/styles/common";
import { connect } from "react-redux";
import containerStyles from "../../Common/styles/container";
import { ScrollView } from "react-native-gesture-handler";
import HorizontalLine from "../../Common/components/HorizontalLine";
import ReportCard from "../components/ReportCard";
import ReportRiskBox from "../components/ReportRiskBox";
import actions from "../redux/action";
import ReportImage from "../components/ReportImage";
import moment from "moment";
import { getScreenNumberFromModule } from "../../Common/settings/reportHelper";
import ReportVoicePlayer from "../components/ReportVoicePlayer";
import CustomButton from "../../Common/components/CustomButton";
import reportStyles from "../style/index";
import OfflineInfo from "../../Common/components/OfflineInfo";
import CustomLoader from "../../Common/components/CustomLoader";

const { singleActivity, listAmendAdditional } = actions;

const modules = [
  "single_assessment",
  "single_observation",
  "single_incident",
  "single_hazard"
];

class ReportDetailsScreen extends Component {
  componentDidMount() {
    this.loadSingleActivity();
    this.loadAmendAdditional();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.report.listAmendAdditionalInfos.length !==
      this.props.report.listAmendAdditionalInfos.length
    ) {
      this.loadAmendAdditional();
    }
  }

  loadSingleActivity = () => {
    const {
      singleActivity,
      navigation: { getParam }
    } = this.props;
    const activity_id = getParam("activityId");
    const currentValue = getParam("currentValue");
    const request_for = modules[currentValue];
    const sendData = {
      request_for,
      activity_id
    };
    return new Promise((resolve, reject) => {
      singleActivity(sendData, resolve, reject);
    })
      .then(() => {})
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  loadAmendAdditional = () => {
    const {
      listAmendAdditional,
      main: {
        temporaryData: { selectedCompanyId }
      },
      navigation: { getParam }
    } = this.props;
    const activity_id = getParam("activityId");
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

  getScreenValue = screenNumber => {
    const {
      report: { singleActivity }
    } = this.props;
    const { options } = singleActivity;
    if (!options) {
      return undefined;
    }
    return options.find(option => option.screen_number === screenNumber);
  };

  getQuestion = screenNumber => {
    const getScreenValue = this.getScreenValue(screenNumber);
    if (!getScreenValue) {
      return undefined;
    }
    return getScreenValue.question;
  };

  getQuestionValue = (screenNumber, key, isArray = false, keyValue) => {
    const getScreenValue = this.getScreenValue(screenNumber);
    if (!getScreenValue) {
      return [];
    }
    if (getScreenValue && getScreenValue[key] && isArray) {
      return getScreenValue[key].map(screen => {
        let value = keyValue ? screen[keyValue] : screen;
        return value;
      });
    }
    return [getScreenValue[key]];
  };

  handleNextButton = () => {
    const {
      navigation: { navigate, getParam }
    } = this.props;
    const activity_id = getParam("activityId");
    const currentValue = getParam("currentValue");
    navigate("AmendAdditional", {
      activity_id,
      currentValue
    });
  };

  render() {
    const {
      auth: { scheduleDatas },
      report: {
        saveAmendAdditionals,
        listAmendAdditionalInfos,
        singleActivityLoading
      },
      navigation: { navigate, getParam, goBack }
    } = this.props;
    const moduleName = getParam("moduleName");
    const createdAt = getParam("createdAt");
    let ratingValueInArray = "";
    let ratingValue = undefined;
    if (
      moduleName === "Assessment" ||
      moduleName === "Incident" ||
      moduleName === "Hazard"
    ) {
      ratingValueInArray = this.getQuestionValue(
        getScreenNumberFromModule("rating_value", moduleName),
        "rating_value"
      );
      ratingValue =
        ratingValueInArray && ratingValueInArray.length > 0
          ? ratingValueInArray[0]
          : undefined;
    }

    const time = moment(createdAt).format("DD/MM/YYYY");

    const imageValue = this.getQuestion(
      getScreenNumberFromModule("image", moduleName)
    );

    const filterScheduleDatas = scheduleDatas.find(
      schedule => schedule.unique_id === createdAt
    );
    const filterScheduleDatasLength =
      (filterScheduleDatas &&
        filterScheduleDatas.upload_files &&
        filterScheduleDatas.upload_files.length) ||
      0;
    return (
      <Grid>
        <Row size={0.3}>
          <View
            style={[
              containerStyles.contentContainer,
              containerStyles.contentInnerContainer
            ]}
          >
            <CustomHeader rightTitle={time} handlePress={() => goBack()}>
              <Text style={styles.pageTitle}>{moduleName} details</Text>
            </CustomHeader>
          </View>
        </Row>
        <Row size={3.4}>
          <View
            style={[
              containerStyles.contentContainer,
              containerStyles.contentInnerContainer
            ]}
          >
            {singleActivityLoading ? (
              <CustomLoader />
            ) : (
              <ScrollView>
                <View style={reportStyles.wrapperContainer}>
                  {(moduleName === "Assessment" ||
                    moduleName === "Observation") && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule("task", moduleName)
                          )}
                          notes={this.getQuestionValue(
                            getScreenNumberFromModule("task", moduleName),
                            "task"
                          )}
                          number
                        />
                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}
                  {(moduleName === "Incident" || moduleName === "Hazard") && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule(
                              "activity_name",
                              moduleName
                            )
                          )}
                          notes={this.getQuestionValue(
                            getScreenNumberFromModule(
                              "activity_name",
                              moduleName
                            ),
                            "title"
                          )}
                        />
                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}
                  <View>
                    <View>
                      <ReportCard
                        reportTitle={this.getQuestion(
                          getScreenNumberFromModule("sound1", moduleName)
                        )}
                      />
                      <ReportVoicePlayer
                        audioPath={this.getQuestionValue(
                          getScreenNumberFromModule("sound1", moduleName),
                          "ans_sound_file",
                          true,
                          "signed_url"
                        )}
                      />
                      <HorizontalLine margin={30} />
                    </View>
                  </View>
                  {(moduleName === "Incident" || moduleName === "Hazard") && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule("sound2", moduleName)
                          )}
                        />
                        <ReportVoicePlayer
                          audioPath={this.getQuestionValue(
                            getScreenNumberFromModule("sound2", moduleName),
                            "ans_sound_file",
                            true,
                            "signed_url"
                          )}
                        />
                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}
                  {moduleName === "Incident" && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule(
                              "actual_consequence",
                              moduleName
                            )
                          )}
                          notes={this.getQuestionValue(
                            getScreenNumberFromModule(
                              "actual_consequence",
                              moduleName
                            ),
                            "actual_consequence",
                            true
                          )}
                        />

                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}
                  {(moduleName === "Assessment" ||
                    moduleName === "Observation") && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule(
                              "critical_risk",
                              moduleName
                            )
                          )}
                          notes={this.getQuestionValue(
                            getScreenNumberFromModule(
                              "critical_risk",
                              moduleName
                            ),
                            "critical_risk",
                            true,
                            "option_name"
                          )}
                          number
                        />

                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}
                  {(moduleName === "Assessment" ||
                    moduleName === "Observation") && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule("sound2", moduleName)
                          )}
                        />
                        <ReportVoicePlayer
                          audioPath={this.getQuestionValue(
                            getScreenNumberFromModule("sound2", moduleName),
                            "ans_sound_file",
                            true,
                            "signed_url"
                          )}
                        />
                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}

                  {(moduleName === "Assessment" ||
                    moduleName === "Observation") && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule("sound3", moduleName)
                          )}
                        />
                        <ReportVoicePlayer
                          audioPath={this.getQuestionValue(
                            getScreenNumberFromModule("sound3", moduleName),
                            "ans_sound_file",
                            true,
                            "signed_url"
                          )}
                        />
                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}

                  {(moduleName === "Assessment" ||
                    moduleName === "Incident" ||
                    moduleName === "Hazard") && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={`1) ${this.getQuestion(
                            getScreenNumberFromModule("consquence", moduleName)
                          )}`}
                          notes={this.getQuestionValue(
                            getScreenNumberFromModule("consquence", moduleName),
                            "ans_option_check"
                          )}
                        />

                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}
                  {(moduleName === "Assessment" ||
                    moduleName === "Incident" ||
                    moduleName === "Hazard") && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={`2) ${this.getQuestion(
                            getScreenNumberFromModule("likelihood", moduleName)
                          )}`}
                          notes={this.getQuestionValue(
                            getScreenNumberFromModule("likelihood", moduleName),
                            "ans_option_check"
                          )}
                        />
                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}
                  {(moduleName === "Assessment" ||
                    moduleName === "Incident" ||
                    moduleName === "Hazard") && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule(
                              "rating_value",
                              moduleName
                            )
                          )}
                        />
                        <ReportRiskBox
                          title={(ratingValue && ratingValue.name) || ""}
                          color={(ratingValue && ratingValue.color) || ""}
                        />
                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}
                  {moduleName === "Incident" && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule("sound3", moduleName)
                          )}
                        />
                        <ReportVoicePlayer
                          audioPath={this.getQuestionValue(
                            getScreenNumberFromModule("sound3", moduleName),
                            "ans_sound_file",
                            true,
                            "signed_url"
                          )}
                        />
                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}
                  {imageValue && (
                    <View>
                      <View>
                        <ReportCard
                          reportTitle={this.getQuestion(
                            getScreenNumberFromModule("image", moduleName)
                          )}
                        />
                        <ReportImage
                          images={this.getQuestionValue(
                            getScreenNumberFromModule("image", moduleName),
                            "ans_photo",
                            true,
                            "signed_url"
                          )}
                        />
                        <HorizontalLine margin={30} />
                      </View>
                    </View>
                  )}

                  <View>
                    <View>
                      <ReportCard
                        reportTitle={this.getQuestion(
                          getScreenNumberFromModule("sound4", moduleName)
                        )}
                      />
                      <ReportVoicePlayer
                        audioPath={this.getQuestionValue(
                          getScreenNumberFromModule("sound4", moduleName),
                          "ans_sound_file",
                          true,
                          "signed_url"
                        )}
                      />
                      <HorizontalLine margin={30} />
                    </View>
                    {listAmendAdditionalInfos.map((amend, index) => {
                      return (
                        <View key={index}>
                          <View>
                            <ReportCard
                              reportTitle={`${index +
                                1}) Amend / Additional Info`}
                            />
                            <ReportVoicePlayer audioPath={[amend.signed_url]} />
                            <HorizontalLine margin={30} />
                          </View>
                        </View>
                      );
                    })}
                    {filterScheduleDatasLength === 0 && (
                      <CustomButton
                        handlePress={this.handleNextButton}
                        position="right"
                        title="+Add Amend / Additional Info"
                      />
                    )}
                  </View>
                  {filterScheduleDatasLength !== 0 && (
                    <View>
                      <OfflineInfo fileSize={filterScheduleDatasLength || 0} />
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </Row>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    main: state.Main,
    report: state.Report
  }),
  {
    singleActivity,
    listAmendAdditional
  }
)(ReportDetailsScreen);
