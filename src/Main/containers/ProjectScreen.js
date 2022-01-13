import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import styles from "../style";
import CustomCard from "../../Common/components/CustomCard";
import Text from "../../Common/components/Text";
import CustomHeader from "../../Common/components/CustomHeader";
import View from "../../Common/components/View";
import actions from "../redux/action";
import getToastNotification from "../../Common/settings/toast";
import CustomLoader from "../../Common/components/CustomLoader";

const { saveDataTemporary } = actions;
class ProjectScreen extends Component {
  handleNextClick = (projectId, projectName) => {
    const {
      navigation: { navigate, getParam },
      saveDataTemporary,
      main: { temporaryData }
    } = this.props;
    const sendData = {
      ...temporaryData,
      selectedProjectId: projectId
    };
    return new Promise((resolve, reject) => {
      saveDataTemporary("saveDataTemporary", sendData, resolve, reject);
    })
      .then(() => {
        const redirectTo = getParam("redirectTo");
        const showToast = getParam("showToast");
        if (redirectTo) {
          navigate(redirectTo);
          if (showToast === "single") {
            const CHANGE_PROJECT = `Project successfully changed to ${projectName} Project`;
            getToastNotification(CHANGE_PROJECT);
          } else {
            const companyName = getParam("companyName");
            const CHANGE_COMPANY_PROJECT = `Successfully changed to ${companyName} Company and ${projectName} Project`;
            getToastNotification(CHANGE_COMPANY_PROJECT);
          }
        } else {
          navigate("CreateReport");
        }
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };
  render() {
    const {
      main: {
        temporaryData: { selectedCompanyId },
        taskLoading,
        riskLoading,
        questionLoading,
        consequenceLoading,
        actualConsequenceLoading,
        listLikeliHoodLoading,
        listRatingValueLoading
      },
      navigation: { getParam, goBack },
      auth: {
        userDetails: { company }
      }
    } = this.props;
    const selectCompany =
      company &&
      company.find(company => company.company_id === selectedCompanyId);
    const companyName = getParam("redirectTo");
    console.log("DATA", [
      taskLoading,
      riskLoading,
      questionLoading,
      consequenceLoading,
      actualConsequenceLoading,
      listLikeliHoodLoading,
      listRatingValueLoading
    ]);
    return (
      <View height="100%">
        <View height="20%">
          <View style={styles.contentContainer}>
            <CustomHeader handlePress={companyName ? null : () => goBack()} />
            <Text style={styles.textTitle}>And a Project Which</Text>
            <Text style={styles.textTitle}>You Want to Work On </Text>
            <Text style={[styles.note, styles.marginVertical]}>
              You can change this at any time,inside 'Profile'
            </Text>
          </View>
        </View>
        <View height="80%">
          {taskLoading &&
          riskLoading &&
          questionLoading &&
          consequenceLoading &&
          actualConsequenceLoading &&
          listLikeliHoodLoading &&
          listRatingValueLoading ? (
            <CustomLoader />
          ) : (
            <View style={styles.contentContainer}>
              <ScrollView>
                {selectCompany &&
                  selectCompany.project.map(project => (
                    <CustomCard
                      handleClick={this.handleNextClick.bind(
                        this,
                        project.id,
                        project.project_name
                      )}
                      key={project.id}
                      title={project.project_name}
                    />
                  ))}
              </ScrollView>
            </View>
          )}
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
    saveDataTemporary
  }
)(ProjectScreen);
