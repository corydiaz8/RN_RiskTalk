import React from "react";
import styles from "../../styles/container";
import CustomButton from "../CustomButton";
import LineSegment from "../lineSegment";
import RiskBox from "../RiskBox";
import Text from "../Text";
import CustomHeader from "../CustomHeader";
import View from "../View";
import { ScrollView } from "react-native-gesture-handler";

const CommonRiskBoxScreen = ({
  currentStep,
  total,
  handlePressTitleLeft,
  pageTitle,
  riskValue,
  buttonTitle,
  handleNextButton
}) => (
  <View height="100%">
    <ScrollView contentContainerStyle={styles.flexGrow}>
      <View height="10%">
        <LineSegment currentStep={currentStep} total={total} />
        <View style={styles.contentInnerContainer}>
          <CustomHeader handlePress={handlePressTitleLeft}>
            <Text style={styles.pageTitle}>{pageTitle}</Text>
          </CustomHeader>
        </View>
      </View>
      <View height="80%">
        <View style={[styles.contentInnerContainer, styles.placeToCenter]}>
          <RiskBox title={riskValue.name || ""} color={riskValue.color} />
        </View>
      </View>
      <View height="10%">
        <View style={styles.footer}>
          <CustomButton
            disabled={!riskValue}
            handlePress={handleNextButton}
            position="right"
            title={buttonTitle}
          />
        </View>
      </View>
    </ScrollView>
  </View>
);

export default CommonRiskBoxScreen;
