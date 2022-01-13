import React, { Component } from "react";
import { TouchableOpacity, Keyboard } from "react-native";
import { connect } from "react-redux";
import CustomHeader from "../../Common/components/CustomHeader";
import CustomSearchBar from "../../Common/components/CustomSearchBar";
import { TabView } from "react-native-tab-view";
import AssessmentReport from "./AssessmentReport";
import ObservationReport from "./ObservationReport";
import IncidentReport from "./IncidentReport";
import HazardReport from "./HazardReport";
import { colors } from "../../Common/styles/global";
import TabHorizontalLine from "../components/TabHorizontalLine";
import CustomFooter from "../../Common/components/CustomFooter";
import actions from "../redux/action";
import { getSearchValueFromArray } from "../../Common/settings/commonFunc";
import CustomListItem from "../../Common/components/CustomListItem";
import View from "../../Common/components/View";
import Text from "../../Common/components/Text";
import styles from "../../Common/styles/container";
import CustomLoader from "../../Common/components/CustomLoader";

const { listActivity } = actions;
const PAGINATION = 5;

class ReportScreen extends Component {
  constructor(props) {
    super(props);
    const indexValue =
      props.navigation.state &&
      props.navigation.state.params &&
      props.navigation.state.params.indexValue;
    this.state = {
      index: indexValue || 0,
      routes: [
        {
          key: "first",
          title: "Assessment",
          name: "assessment",
          position: "flex-start",
          keyName: "task",
          value: 0
        },
        {
          key: "second",
          title: "Observation",
          name: "observation",
          position: "center",
          keyName: "task",
          value: 1
        },
        {
          key: "third",
          title: "Incident",
          name: "incident",
          position: "center",
          keyName: "title",
          value: 2
        },
        {
          key: "four",
          title: "Hazard",
          name: "hazard",
          position: "center",
          keyName: "title",
          value: 3
        }
      ],
      pagination: PAGINATION,
      searchValue: undefined,
      isShow: true
    };
  }

  componentDidMount() {
    const {
      navigation: { getParam }
    } = this.props;

    const moduleName = getParam("moduleName");
    const indexValue = getParam("indexValue");

    this.loadActivity(moduleName || "assessment");
    if (moduleName) {
      this.setState({
        index: indexValue
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      network: { isConnected },
      main: { createModuleStatus }
    } = this.props;
    const { routes, index } = this.state;
    if (isConnected) {
      if (prevProps.main.createModuleStatus !== createModuleStatus) {
        const filterRoute = routes.find((route, i) => i === index);
        this.loadActivity(filterRoute.name);
      }
    }
  }

  loadActivity = name => {
    const {
      listActivity,
      auth: {
        userDetails: { id }
      },
      main: {
        temporaryData: { selectedCompanyId, selectedProjectId }
      }
    } = this.props;
    const combineKeyValue = `${selectedCompanyId}${selectedProjectId}${name}`;
    const sendData = {
      request_for: "activities",
      activity_type: name,
      project_id: selectedProjectId,
      company_id: selectedCompanyId,
      user_id: id
    };
    const keyValue = `${combineKeyValue}activities`;
    return new Promise((resolve, reject) => {
      listActivity(sendData, keyValue, resolve, reject);
    })
      .then(success => {
        this.loadActivityFromStorage(name);
      })
      .catch(error => {
        console.log("FAILED", error);
      });
  };

  loadActivityFromStorage = name => {
    const {
      listActivity,
      main: {
        temporaryData: { selectedCompanyId, selectedProjectId }
      }
    } = this.props;
    const keyValue = `${selectedCompanyId}${selectedProjectId}${name}activities`;
    return new Promise((resolve, reject) => {
      listActivity("offline", keyValue, resolve, reject);
    })
      .then(() => {})
      .catch(() => {});
  };

  _handleIndexChange = index => {
    const { routes } = this.state;
    const filterRoute = routes.find((route, i) => i === index);
    this.loadActivity(filterRoute.name);
    this.setState({ index, pagination: PAGINATION });
  };

  _renderTabBar = props => {
    const {
      navigationState: { index, routes }
    } = props;

    return (
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 25
        }}
      >
        <View direction="row" style={styles.tabBar}>
          {routes.map((route, i) => {
            const isMatch = index === i;
            const colorStyle = {
              color: isMatch ? colors.font1 : colors.font3
            };
            const positionStyle = {
              alignSelf: route.position
            };
            return (
              <TouchableOpacity
                key={i}
                style={styles.tabItem}
                onPress={this._handleIndexChange.bind(this, i)}
              >
                <Text style={[styles.tabTitle, colorStyle, positionStyle]}>
                  {route.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TabHorizontalLine total={4} currentStep={index} />
      </View>
    );
  };

  getAdditionSource = module_name => {
    const {
      main: {
        temporaryData: { selectedCompanyId, selectedProjectId }
      },
      auth: { scheduleDatas }
    } = this.props;
    if (scheduleDatas) {
      const additionalSources = scheduleDatas.filter(
        schedule =>
          schedule.module_name === module_name &&
          schedule.company_id === selectedCompanyId &&
          schedule.project_id === selectedProjectId
      );
      return additionalSources.reverse();
    }
    return [];
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  handlePagination = () => {
    this.setState(prevState => ({
      pagination: prevState.pagination + 5
    }));
  };

  _renderTabScene = ({ route }) => {
    const {
      report: { listActivities }
    } = this.props;
    const { pagination } = this.state;
    switch (route.value) {
      case 0:
        return (
          <AssessmentReport
            note="Assessment"
            additionalSources={this.getAdditionSource("add_assessment")}
            dataSources={listActivities.slice(0, pagination)}
            isCloseToBottom={this.isCloseToBottom}
            handlePagination={this.handlePagination}
          />
        );
      case 1:
        return (
          <ObservationReport
            note="Observation"
            additionalSources={this.getAdditionSource("add_observation")}
            dataSources={listActivities.slice(0, pagination)}
            isCloseToBottom={this.isCloseToBottom}
            handlePagination={this.handlePagination}
          />
        );

      case 2:
        return (
          <IncidentReport
            note="Incident"
            additionalSources={this.getAdditionSource("add_incident")}
            dataSources={listActivities.slice(0, pagination)}
            isCloseToBottom={this.isCloseToBottom}
            handlePagination={this.handlePagination}
          />
        );
      case 3:
        return (
          <HazardReport
            note="Hazard"
            additionalSources={this.getAdditionSource("add_hazard")}
            dataSources={listActivities.slice(0, pagination)}
            isCloseToBottom={this.isCloseToBottom}
            handlePagination={this.handlePagination}
          />
        );
      default:
        return null;
    }
  };

  renderSearchChild = (data, value, index) => {
    const {
      navigation: { navigate }
    } = this.props;
    const { routes } = this.state;
    const routeFilter = routes.find((route, i) => i === index);
    const dataSources = getSearchValueFromArray(
      data,
      routeFilter.keyName,
      value
    );
    if (!dataSources) {
      return <View />;
    }
    return dataSources.map(report => {
      return (
        <View
          key={report.assessmen_id}
          style={{
            paddingHorizontal: 10
          }}
        >
          <CustomListItem
            listTitle={report[routeFilter.keyName]}
            status
            note={routeFilter.title}
            status
            time={report.created_at}
            handlePress={() =>
              navigate("ReportDetails", {
                moduleName: routeFilter.title,
                activityId: report.assessmen_id,
                currentValue: index,
                createdAt: report.created_at
              })
            }
          />
        </View>
      );
    });
  };

  handleRightClick = () => {
    Keyboard.dismiss();
    this.setState({
      isShow: false,
      searchValue: undefined
    });
  };

  render() {
    const {
      report: { listActivities, listActivityLoading }
    } = this.props;
    const { searchValue, isShow, index } = this.state;
    return (
      <View height="100%">
        <View
          height="15%"
          style={{
            zIndex: 9
          }}
        >
          <View style={styles.contentInnerContainer}>
            <CustomHeader>
              <Text style={styles.pageTitle}>Overview of All Reports</Text>
            </CustomHeader>
            <View style={styles.marginVertical}>
              <CustomSearchBar
                searchValue={searchValue}
                isShow={isShow}
                handleRightClick={this.handleRightClick}
                handleOnFocus={() =>
                  this.setState({
                    isShow: true,
                    searchValue: ""
                  })
                }
                handleTextChange={searchValue =>
                  this.setState({ searchValue, isShow: true })
                }
                placeholder="Search for a Task"
              >
                {this.renderSearchChild(listActivities, searchValue, index)}
              </CustomSearchBar>
            </View>
          </View>
        </View>
        <View height="75%">
          <TabView
            lazy
            swipeEnabled={false}
            navigationState={this.state}
            renderScene={route =>
              listActivityLoading ? (
                <CustomLoader />
              ) : (
                this._renderTabScene(route)
              )
            }
            renderTabBar={this._renderTabBar}
          />
        </View>
        <View height="10%">
          <CustomFooter currentIndex={2} />
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    main: state.Main,
    report: state.Report,
    network: state.network
  }),
  { listActivity }
)(ReportScreen);
