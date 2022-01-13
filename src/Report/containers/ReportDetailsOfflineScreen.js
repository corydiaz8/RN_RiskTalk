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
import { isObjectEmpty } from "../../Common/settings/commonFunc";
import reportStyles from "../style/index";
import OfflineInfo from "../../Common/components/OfflineInfo";

const { singleActivity, listAmendAdditional } = actions;

class ReportDetailsScreen extends Component {
  state = {
    singleActivity: {}
  };
  componentDidMount() {
    this.loadSingleActivity();
  }

  loadSingleActivity = () => {
    const {
      auth: { scheduleDatas },
      navigation: { getParam }
    } = this.props;
    const filterId = getParam("filterId");
    const currentValue = getParam("currentValue");
    const singleActivity = scheduleDatas.find(
      schedule => schedule.unique_id === filterId
    );
    this.setState({
      singleActivity
    });
  };

  getScreenValue = screenNumber => {
    const { singleActivity } = this.state;
    if (isObjectEmpty(singleActivity)) {
      return undefined;
    }
    const {
      sendData: { data_result }
    } = singleActivity;
    if (!data_result) {
      return undefined;
    }
    return data_result.find(option => option.screen_number === screenNumber);
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
      navigation: { getParam, goBack }
    } = this.props;
    const { singleActivity } = this.state;
    const moduleName = getParam("moduleName");
    const createdAt = getParam("createdAt");
    const filterId = getParam("filterId");
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
    const { upload_files } = singleActivity;
    const filterImages =
      upload_files && upload_files.filter(file => file.type === "image");
    const filterScheduleDatas = scheduleDatas.find(
      schedule => schedule.unique_id === filterId
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
                          getScreenNumberFromModule("activity_name", moduleName)
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
                      offline
                      audioPath={this.getQuestionValue(
                        getScreenNumberFromModule("sound1", moduleName),
                        "sound_file",
                        true
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
                        offline
                        audioPath={this.getQuestionValue(
                          getScreenNumberFromModule("sound2", moduleName),
                          "sound_file",
                          true
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
                          getScreenNumberFromModule("critical_risk", moduleName)
                        )}
                        notes={this.getQuestionValue(
                          getScreenNumberFromModule(
                            "critical_risk",
                            moduleName
                          ),
                          "critical_risks",
                          true
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
                        offline
                        audioPath={this.getQuestionValue(
                          getScreenNumberFromModule("sound2", moduleName),
                          "sound_file",
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
                          getScreenNumberFromModule("sound3", moduleName)
                        )}
                      />
                      <ReportVoicePlayer
                        offline
                        audioPath={this.getQuestionValue(
                          getScreenNumberFromModule("sound3", moduleName),
                          "sound_file",
                          true
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
                          "consequence"
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
                          "likelihood"
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
                          getScreenNumberFromModule("rating_value", moduleName)
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
                        offline
                        audioPath={this.getQuestionValue(
                          getScreenNumberFromModule("sound3", moduleName),
                          "sound_file",
                          true
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
                          "image_file",
                          true
                        )}
                        additionalImages={filterImages}
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
                      offline
                      audioPath={this.getQuestionValue(
                        getScreenNumberFromModule("sound4", moduleName),
                        "sound_file",
                        true
                      )}
                    />
                    <HorizontalLine margin={30} />
                  </View>
                </View>
                <View>
                  <OfflineInfo fileSize={filterScheduleDatasLength || 0} />
                </View>
              </View>
            </ScrollView>
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
