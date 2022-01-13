import React from "react";
import styles from "../../styles/container";
import CustomButton from "../CustomButton";
import LineSegment from "../lineSegment";
import Text from "../Text";
import CustomHeader from "../CustomHeader";
import View from "../View";
import CreateForm from "../CreateForm";
import CustomKeyboardAvoidingView from "../CustomKeyboardAvoidingView";

const CommonActivityNameScreen = ({
  currentStep,
  total,
  pageTitle,
  handlePressTitleLeft,
  handleChangeText,
  activityName,
  handleNextButton,
  placeholder,
  note,
  buttonTitle
}) => (
  <CustomKeyboardAvoidingView>
    <View height="100%">
      <View height="10%">
        {currentStep && total && (
          <LineSegment currentStep={currentStep} total={total} />
        )}
        <View style={styles.contentInnerContainer}>
          <CustomHeader handlePress={handlePressTitleLeft}>
            <Text style={styles.pageTitle}>{pageTitle}</Text>
          </CustomHeader>
        </View>
      </View>
      <View height="80%">
        <View style={[styles.placeToCenter, styles.contentInnerContainer]}>
          <CreateForm
            handleChangeText={handleChangeText}
            placeholder={placeholder}
            note={note}
          />
        </View>
      </View>
      <View height="10%">
        <View style={styles.footer}>
          <CustomButton
            disabled={!activityName}
            handlePress={handleNextButton}
            position="right"
            title={buttonTitle}
          />
        </View>
      </View>
    </View>
  </CustomKeyboardAvoidingView>
);

export default CommonActivityNameScreen;
