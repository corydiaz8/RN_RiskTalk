import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import styles from "../style";
import CustomCard from "../../Common/components/CustomCard";
import Text from "../../Common/components/Text";
import actions from "../redux/action";
import Geolocation from "@react-native-community/geolocation";
import reportActions from "../../Report/redux/action";
import authActions from "../../Auth/redux/action";
import View from "../../Common/components/View";

const moduleNames = ["assessment", "observation", "incident", "hazard"];
const {
  listTask,
  saveDataTemporary,
  listQuestion,
  listRisk,
  listConsequence,
  listLikeliHood,
  listRatingValue,
  listActualConsequence,
  uploadScheduleData
} = actions;

const { listActivity } = reportActions;
const { checkAuthorization, profile } = authActions;

Geolocation.setRNConfiguration({});

class CompanyScreen extends Component {
  state = {
    latlng: {}
  };

  normalizeDataBeforeSubmit = (type, activity_type, companyProjectIds) => {
    const { selectedCompanyId, selectedProjectId } = companyProjectIds;
    const sendCompanyProjectIds = {
      company_id: selectedCompanyId,
      project_id: selectedProjectId
    };
    return {
      request_for: type,
      activity_type,
      ...sendCompanyProjectIds
    };
  };

  componentDidMount() {
    const {
      auth: { scheduleDatas },
      network: { isConnected }
    } = this.props;
    this.loadProfile();
    this.loadGeoLocation();
    this.storeDataForOffline("all");
    if (isConnected && scheduleDatas && scheduleDatas.length > 0) {
      this.uploadingDataInBackground();
    }
  }

  loadProfile = () => {
    const {
      profile,
      auth: {
        userDetails: { id }
      }
    } = this.props;
    const sendData = { request_for: "profile", user_id: id };
    return new Promise((resolve, reject) => {
      profile(sendData, resolve, reject);
    })
      .then(() => {})
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  loadGeoLocation = () => {
    let self = this;
    Geolocation.getCurrentPosition(
      position => {
        const {
          coords: { latitude, longitude }
        } = position;
        this.setState({
          latlng: {
            latitude: latitude || null,
            longitude: longitude || null
          }
        });
      },
      error => {
        if (Object.keys(this.state.latlng) === 0) {
          self.loadGeoLocation();
        }
        console.log(error.code, error.message, this.state.latlng);
      },
      { enableHighAccuracy: false, timeout: 90000, maximumAge: 100 }
    );
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const {
      uploadScheduleData,
      auth: { offlineStatus, scheduleDatas },
      network: { isConnected },
      main: { createModuleStatus, loadingCreateTask }
    } = this.props;
    if (isConnected) {
      if (prevProps.main.createModuleStatus !== createModuleStatus) {
        this.storeDataForOffline("activity");
      } else if (prevProps.main.loadingCreateTask !== loadingCreateTask) {
        this.storeDataForOffline("task");
      }
      if (prevProps.main.createModuleStatus !== createModuleStatus) {
        return new Promise((resolve, reject) => {
          this.props.checkAuthorization("authorized", resolve, reject);
        });
      }
      if (scheduleDatas && scheduleDatas.length > 0 && offlineStatus === 1) {
        return new Promise((resolve, reject) => {
          uploadScheduleData(scheduleDatas, resolve, reject);
        })
          .then(success => {
            return true;
          })
          .catch(error => {
            console.log("ERROR UPLOADING", error);
          });
      }
    }
  };
  uploadingDataInBackground = () => {
    const {
      uploadScheduleData,
      auth: { scheduleDatas, offlineStatus }
    } = this.props;
    return new Promise((resolve, reject) => {
      uploadScheduleData(scheduleDatas, resolve, reject);
    })
      .then(success => {
        return true;
      })
      .catch(error => {
        console.log("ERROR UPLOADING", error);
      });
  };

  storeDataForOffline = keyName => {
    try {
      const {
        auth: {
          userDetails: { company }
        }
      } = this.props;

      moduleNames.forEach(name => {
        company.forEach(comp => {
          comp.project.forEach(project => {
            const combineKeyValue = `${comp.company_id}${project.id}${name}`;
            const companyProjectIds = {
              selectedCompanyId: comp.company_id,
              selectedProjectId: project.id
            };
            if (keyName === "all") {
              if (name === "assessment" || name === "observation") {
                this.loadTask(combineKeyValue, name, companyProjectIds);
                this.loadRisk(combineKeyValue, name, companyProjectIds);
              }
              this.loadQuestion(combineKeyValue, name, companyProjectIds);
              this.loadActivity(combineKeyValue, name, companyProjectIds);
              if (
                name === "assessment" ||
                name === "incident" ||
                name === "hazard"
              ) {
                this.loadLikeliHood(combineKeyValue, name, companyProjectIds);
                this.loadConsequence(combineKeyValue, name, companyProjectIds);
                this.loadRatingValue(combineKeyValue, name, companyProjectIds);
              }
              if (name === "incident") {
                this.loadActualConsequence(combineKeyValue, companyProjectIds);
              }
            } else if (keyName === "activity") {
              this.loadActivity(combineKeyValue, name, companyProjectIds);
            } else if (keyName === "task") {
              this.loadTask(combineKeyValue, name, companyProjectIds);
              this.loadRisk(combineKeyValue, name, companyProjectIds);
            }
          });
        });
      });
    } catch (e) {
      console.log("ERROR FETCH ALL DATA", e);
    }
  };

  loadTask = (combineKeyValue, activity_type, companyProjectIds) => {
    const { listTask } = this.props;
    const keyValue = `${combineKeyValue}tasks`;
    return new Promise((resolve, reject) => {
      listTask(
        this.normalizeDataBeforeSubmit(
          "task",
          activity_type,
          companyProjectIds
        ),
        keyValue,
        resolve,
        reject
      );
    })
      .then(() => {
        console.log("SUCCESS");
      })
      .catch(error => {
        console.log("FAILED", error);
      });
  };

  loadQuestion = (combineKeyValue, activity_type, companyProjectIds) => {
    const { listQuestion } = this.props;
    const keyValue = `${combineKeyValue}questions`;
    return new Promise((resolve, reject) => {
      listQuestion(
        this.normalizeDataBeforeSubmit(
          "questions",
          activity_type,
          companyProjectIds
        ),
        keyValue,
        resolve,
        reject
      );
    })
      .then(success => {
        console.log("SUCCESS");
      })
      .catch(error => {
        console.log("FAILED", error);
      });
  };

  loadRisk = (combineKeyValue, activity_type, companyProjectIds) => {
    const { listRisk } = this.props;
    const keyValue = `${combineKeyValue}criticalrisks`;
    return new Promise((resolve, reject) => {
      listRisk(
        this.normalizeDataBeforeSubmit(
          "criticalrisks",
          activity_type,
          companyProjectIds
        ),
        keyValue,
        resolve,
        reject
      );
    })
      .then(() => {
        console.log("SUCCESS");
      })
      .catch(error => {
        console.log("FAILED");
      });
  };

  loadLikeliHood = (combineKeyValue, activity_type, companyProjectIds) => {
    const { listLikeliHood } = this.props;
    const keyValue = `${combineKeyValue}listLikeliHoods`;
    return new Promise((resolve, reject) => {
      listLikeliHood(
        this.normalizeDataBeforeSubmit(
          "likelihood",
          activity_type,
          companyProjectIds
        ),
        keyValue,
        resolve,
        reject
      );
    })
      .then(() => {
        console.log("SUCCESS");
      })
      .catch(error => {
        console.log("FAILED", error);
      });
  };

  loadConsequence = (combineKeyValue, activity_type, companyProjectIds) => {
    const { listConsequence } = this.props;
    const keyValue = `${combineKeyValue}consequences`;
    return new Promise((resolve, reject) => {
      listConsequence(
        this.normalizeDataBeforeSubmit(
          "consequence",
          activity_type,
          companyProjectIds
        ),
        keyValue,
        resolve,
        reject
      );
    })
      .then(() => {
        console.log("SUCCESS");
      })
      .catch(error => {
        console.log("FAILED");
      });
  };

  loadActualConsequence = (combineKeyValue, companyProjectIds) => {
    const { listActualConsequence } = this.props;
    const keyValue = `${combineKeyValue}actualConsequences`;
    const { selectedCompanyId, selectedProjectId } = companyProjectIds;
    const sendData = {
      company_id: selectedCompanyId,
      project_id: selectedProjectId,
      request_for: "actualconsequence"
    };
    return new Promise((resolve, reject) => {
      listActualConsequence(sendData, keyValue, resolve, reject);
    })
      .then(() => {
        console.log("SUCCESS");
      })
      .catch(error => {
        console.log("FAILED");
      });
  };

  loadRatingValue = (combineKeyValue, activity_type, companyProjectIds) => {
    const { listRatingValue } = this.props;
    const keyValue = `${combineKeyValue}listRatingValues`;
    return new Promise((resolve, reject) => {
      listRatingValue(
        this.normalizeDataBeforeSubmit(
          "rating_values",
          activity_type,
          companyProjectIds
        ),
        keyValue,
        resolve,
        reject
      );
    })
      .then(() => {
        console.log("SUCCESS");
      })
      .catch(error => {
        console.log("FAILED", error);
      });
  };

  loadActivity = (combineKeyValue, activity_type, companyProjectIds) => {
    const {
      listActivity,
      auth: {
        userDetails: { id }
      }
    } = this.props;
    const keyValue = `${combineKeyValue}activities`;
    return new Promise((resolve, reject) => {
      const data = this.normalizeDataBeforeSubmit(
        "activities",
        activity_type,
        companyProjectIds
      );
      const sendData = {
        ...data,
        user_id: id
      };
      listActivity(sendData, keyValue, resolve, reject);
    })
      .then(success => {
        // console.log("SUCCESS ACTIVITY");
      })
      .catch(error => {
        console.log("FAILED", error);
      });
  };

  handleNextClick = (companyId, companyName) => {
    const {
      saveDataTemporary,
      navigation: { navigate, getParam }
    } = this.props;

    const { latlng } = this.state;
    console.log("LAT LNG", latlng);
    const sendData = {
      ...latlng,
      selectedCompanyId: companyId
    };
    return new Promise((resolve, reject) => {
      saveDataTemporary("saveDataTemporary", sendData, resolve, reject);
    }).then(() => {
      const redirectTo = getParam("redirectTo");
      const showToast = getParam("showToast");
      if (redirectTo) {
        navigate("Project", {
          redirectTo,
          companyName,
          showToast
        });
      } else {
        navigate("Project");
      }
    });
  };
  render() {
    const {
      navigation: { navigate },
      auth: {
        userDetails: { first_name, company }
      }
    } = this.props;

    return (
      <View height="100%">
        <View height="15%">
          <View style={styles.contentContainer}>
            <Text style={styles.textTitle}>Hello {first_name}</Text>
            <Text style={styles.textTitle}>Please Select a Company</Text>
            <Text style={[styles.note, styles.marginVertical]}>
              You can change this at any time,inside 'Profile'
            </Text>
          </View>
        </View>
        <View height="85%">
          <View style={styles.contentContainer}>
            <ScrollView>
              {company &&
                company.map(company => (
                  <CustomCard
                    handleClick={this.handleNextClick.bind(
                      this,
                      company.company_id,
                      company.company_name
                    )}
                    key={company.company_id}
                    title={company.company_name}
                  />
                ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    main: state.Main,
    network: state.network,
    report: state.Report
  }),
  {
    listTask,
    saveDataTemporary,
    listQuestion,
    listRisk,
    listConsequence,
    listLikeliHood,
    listRatingValue,
    listActualConsequence,
    listActivity,
    checkAuthorization,
    uploadScheduleData,
    profile
  }
)(CompanyScreen);
