import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "../style";
import CustomBox from "../../Common/components/CustomBox";
import CustomFooter from "../../Common/components/CustomFooter";
import actions from "../redux/action";
import View from "../../Common/components/View";
import Text from "../../Common/components/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import Geolocation from "@react-native-community/geolocation";
Geolocation.setRNConfiguration({});

const {
  saveDataTemporary,
  listTask,
  listQuestion,
  listRisk,
  listActualConsequence,
  listConsequence,
  listLikeliHood,
  listRatingValue
} = actions;

class CreateReportScreen extends Component {
  state = {
    latlng: {}
  };
  handleClick = (route, type) => {
    let self = this;
    const {
      saveDataTemporary,
      main: { temporaryData },
      auth: {
        userDetails: { id }
      },
      navigation: { navigate }
    } = this.props;
    const sendData = {
      ...temporaryData,
      ...this.state.latlng,
      user_id: id,
      assessment: [],
      observation: [],
      incident: [],
      hazard: []
    };
    const { selectedCompanyId, selectedProjectId } = temporaryData;
    const combineKeyValue = `${selectedCompanyId}${selectedProjectId}${type}`;
    return new Promise((resolve, reject) => {
      saveDataTemporary("saveDataTemporary", sendData, resolve, reject);
    })
      .then(() => {
        if (type === "assessment" || type === "observation") {
          self.loadTask(combineKeyValue);
          self.loadRisk(combineKeyValue);
        }
        self.loadQuestion(combineKeyValue);
        if (type === "assessment" || type === "incident" || type === "hazard") {
          self.loadLikeliHood(combineKeyValue);
          self.loadConsequence(combineKeyValue);
          self.loadRatingValue(combineKeyValue);
        }
        if (type === "incident") {
          this.listActualConsequence(combineKeyValue);
        }
        console.log("ROUUTE", route);
        navigate(route);
      })
      .catch(() => {});
  };
  componentDidMount() {
    this.loadGeoLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.temporaryData !== this.props.temporaryData) {
      this.loadGeoLocation();
    }
  }

  loadGeoLocation = () => {
    let self = this;
    Geolocation.getCurrentPosition(
      position => {
        const {
          coords: { latitude, longitude }
        } = position;
        console.log("LAT LNG", position, latitude, longitude);
        this.setState({
          latlng: {
            latitude: latitude || null,
            longitude: longitude || null
          }
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 90000, maximumAge: 100 }
    );
  };

  loadTask = combineKeyValue => {
    const { listTask } = this.props;
    const keyValue = `${combineKeyValue}tasks`;
    return new Promise((resolve, reject) => {
      listTask("offline", keyValue, resolve, reject);
    })
      .then(() => {})
      .catch(() => {});
  };

  loadQuestion = combineKeyValue => {
    const { listQuestion } = this.props;
    const keyValue = `${combineKeyValue}questions`;
    return new Promise((resolve, reject) => {
      listQuestion("offline", keyValue, resolve, reject);
    })
      .then(() => {})
      .catch(() => {});
  };

  loadRisk = combineKeyValue => {
    const { listRisk } = this.props;
    const keyValue = `${combineKeyValue}criticalrisks`;
    return new Promise((resolve, reject) => {
      listRisk("offline", keyValue, resolve, reject);
    })
      .then(() => {})
      .catch(() => {});
  };

  loadLikeliHood = combineKeyValue => {
    const { listLikeliHood } = this.props;
    const keyValue = `${combineKeyValue}listLikeliHoods`;
    return new Promise((resolve, reject) => {
      listLikeliHood("offline", keyValue, resolve, reject);
    })
      .then(() => {})
      .catch(() => {});
  };

  loadConsequence = combineKeyValue => {
    const { listConsequence } = this.props;
    const keyValue = `${combineKeyValue}consequences`;
    return new Promise((resolve, reject) => {
      listConsequence("offline", keyValue, resolve, reject);
    })
      .then(() => {})
      .catch(() => {});
  };

  listActualConsequence = combineKeyValue => {
    const { listActualConsequence } = this.props;
    const keyValue = `${combineKeyValue}actualConsequences`;
    return new Promise((resolve, reject) => {
      listActualConsequence("offline", keyValue, resolve, reject);
    })
      .then(() => {})
      .catch(() => {});
  };

  loadRatingValue = combineKeyValue => {
    const { listRatingValue } = this.props;
    const keyValue = `${combineKeyValue}listRatingValues`;
    return new Promise((resolve, reject) => {
      listRatingValue("offline", keyValue, resolve, reject);
    })
      .then(() => {})
      .catch(() => {});
  };

  handleClickView = (value, index) => {
    this.props.navigation.navigate("Report", {
      moduleName: value,
      indexValue: index
    });
  };

  render() {
    return (
      <View height="100%">
        <View height="13%">
          <View style={styles.contentContainer}>
            <Text style={styles.textTitle}>Create New Report</Text>
            <View style={styles.marginVertical}>
              <Text style={styles.note}>
                You can Create a New Report or view Existing ones
              </Text>
            </View>
          </View>
        </View>
        <View height="77%">
          <View style={[styles.contentContainer, styles.placeToCenter]}>
            <View style={styles.boxContainerWrapper}>
              <View direction="row" style={styles.boxContainer}>
                <View style={styles.innerBoxContainer}>
                  <CustomBox
                    handleClick={this.handleClick.bind(
                      this,
                      "AssessmentFirst",
                      "assessment"
                    )}
                    title="Assessment"
                    imageUrl={require("../../Common/images/Assessment.png")}
                  />
                  <TouchableOpacity
                    onPress={this.handleClickView.bind(this, "assessment", 0)}
                    style={styles.textContainer}
                  >
                    <Text style={styles.subHeader}>View Existing</Text>
                    <Text style={styles.subHeader}> Assessment</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.innerBoxContainer}>
                  <CustomBox
                    handleClick={this.handleClick.bind(
                      this,
                      "ObservationFirst",
                      "observation"
                    )}
                    title="Observation"
                    imageUrl={require("../../Common/images/Observation.png")}
                  />
                  <TouchableOpacity
                    onPress={this.handleClickView.bind(this, "observation", 1)}
                    style={styles.textContainer}
                  >
                    <Text style={styles.subHeader}>View Existing</Text>
                    <Text style={styles.subHeader}>Observation</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View direction="row" style={styles.boxContainer}>
                <View style={styles.innerBoxContainer}>
                  <CustomBox
                    handleClick={this.handleClick.bind(
                      this,
                      "IncidentFirst",
                      "incident"
                    )}
                    title="Incident"
                    imageUrl={require("../../Common/images/Incident.png")}
                  />
                  <TouchableOpacity
                    onPress={this.handleClickView.bind(this, "incident", 2)}
                    style={styles.textContainer}
                  >
                    <Text style={styles.subHeader}>View Existing</Text>
                    <Text style={styles.subHeader}> Incident</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.innerBoxContainer}>
                  <CustomBox
                    handleClick={this.handleClick.bind(
                      this,
                      "HazardFirst",
                      "hazard"
                    )}
                    title="Hazard"
                    imageUrl={require("../../Common/images/Hazard.png")}
                  />
                  <TouchableOpacity
                    onPress={this.handleClickView.bind(this, "hazard", 3)}
                    style={styles.textContainer}
                  >
                    <Text style={styles.subHeader}>View Existing</Text>
                    <Text style={styles.subHeader}> Hazard</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View height="10%">
          <View style={[styles.screenContainer]}>
            <CustomFooter currentIndex={0} />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    main: state.Main
  }),
  {
    listTask,
    saveDataTemporary,
    listQuestion,
    listRisk,
    listConsequence,
    listLikeliHood,
    listRatingValue,
    listActualConsequence
  }
)(CreateReportScreen);
