import React, { Component } from "react";
import { connect } from "react-redux";
import { Keyboard } from "react-native";
import CommonList from "../../Common/components/CommonList";
import CustomSearchBar from "../../Common/components/CustomSearchBar";
import HorizontalLine from "../../Common/components/HorizontalLine";
import CustomCardCheckBox from "../../Common/components/CustomCardCheckBox";
import CustomButton from "../../Common/components/CustomButton";
import LineSegment from "../../Common/components/lineSegment";
import CustomHeader from "../../Common/components/CustomHeader";
import mainActions from "../../Main/redux/action";
import { saveDataTemporaryAndNavigate } from "../../Common/settings/mainHelper";
import { getSearchValueFromArray } from "../../Common/settings/commonFunc";
import CustomCardCheckBoxSearch from "../../Common/components/CustomCardCheckBoxSearch";
import View from "../../Common/components/View";
import Text from "../../Common/components/Text";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../Common/styles/container";
import CustomLoader from "../../Common/components/CustomLoader";

const { saveDataTemporary, listTask } = mainActions;

class ObservationFirstScreen extends Component {
  state = {
    selectId: undefined,
    selectName: undefined,
    searchValue: undefined,
    isShow: true
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.main.loadingCreateTask !== this.props.main.loadingCreateTask
    ) {
      this.loadTask();
    }
  }

  loadTask = () => {
    const {
      listTask,
      main: { temporaryData }
    } = this.props;
    const { selectedCompanyId } = temporaryData;
    const keyValue = `${selectedCompanyId}assessmenttasks`;
    return new Promise((resolve, reject) => {
      listTask("offline", keyValue, resolve, reject);
    })
      .then(() => {})
      .catch(() => {});
  };

  handleClickCardCheckBox = (selectId, selectName) => {
    if (this.state.selectId === selectId) {
      this.setState({ selectId: undefined, selectName });
    } else {
      this.setState({ selectId, selectName });
    }
    this.setState({
      isShow: false
    });
  };

  handleNextButton = () => {
    const {
      saveDataTemporary,
      main: { temporaryData, questions },
      navigation: { navigate }
    } = this.props;
    const [question] = questions;
    const { selectName } = this.state;

    const filterObservationData = temporaryData.observation.filter(
      observation => observation.screen_number !== "1"
    );
    const sendData = {
      ...temporaryData,
      request_for: "add_observation",
      selectName,
      upload_files: [],
      observation: [
        ...filterObservationData,
        {
          screen_type: "task",
          screen_number: "1",
          task_id: this.state.selectId,
          question_id: question.question_id,
          question: question.question,
          task: selectName
        }
      ]
    };
    return saveDataTemporaryAndNavigate(
      saveDataTemporary,
      "saveDataTemporary",
      sendData,
      navigate,
      "ObservationSecond"
    );
  };

  renderSearchChild = (data, value, selectId) => {
    if (!data) {
      return <View />;
    }
    const dataSources = getSearchValueFromArray(data, "option_name", value);
    return dataSources.map(task => {
      return (
        <CustomCardCheckBoxSearch
          key={task.task_id}
          selectId={selectId}
          value={task.task_id}
          handleClick={this.handleClickCardCheckBox.bind(
            this,
            task.task_id,
            task.option_name
          )}
          title={task.option_name}
        />
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
      main: { tasks, questions, taskLoading },
      navigation: { navigate, goBack }
    } = this.props;
    const { selectId, searchValue, isShow } = this.state;
    const [question] = questions;
    console.log("OB QUESTIONS", questions);
    return (
      <View height="100%">
        <View height="8%">
          <LineSegment currentStep={1} total={9} />
          <View style={styles.contentInnerContainer}>
            <CustomHeader handlePress={() => navigate("CreateReport")}>
              <Text style={styles.pageTitle}>
                {(question && question.question) || ""}
              </Text>
            </CustomHeader>
          </View>
        </View>
        <View
          height="18%"
          style={{
            zIndex: 9
          }}
        >
          <View style={styles.contentInnerContainer}>
            <View style={[styles.marginVertical]}>
              <CustomSearchBar
                text="create task"
                handleTextPress={() => navigate("CreateTask")}
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
                {this.renderSearchChild(tasks, searchValue, selectId)}
              </CustomSearchBar>
            </View>
          </View>
        </View>
        <View
          height="64%"
          style={{
            marginTop: -60
          }}
        >
          <View style={styles.contentInnerContainer}>
            <HorizontalLine margin={10} />
            <CommonList
              handleActionClick={() => navigate("CreateTask")}
              listTitle="Task List"
              actionTitle="Create a New Task"
            />
            {taskLoading ? (
              <CustomLoader />
            ) : (
              <ScrollView contentContainerStyle={styles.flexGrowWithPadding}>
                {tasks &&
                  tasks.map(task => {
                    return (
                      <CustomCardCheckBox
                        key={task.task_id}
                        selectId={selectId}
                        value={task.task_id}
                        handleClick={this.handleClickCardCheckBox.bind(
                          this,
                          task.task_id,
                          task.option_name
                        )}
                        title={task.option_name}
                      />
                    );
                  })}
              </ScrollView>
            )}
          </View>
        </View>
        <View
          height="10%"
          style={{
            marginTop: 60
          }}
        >
          <View style={styles.footer}>
            <CustomButton
              disabled={!selectId}
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
    saveDataTemporary,
    listTask
  }
)(ObservationFirstScreen);
