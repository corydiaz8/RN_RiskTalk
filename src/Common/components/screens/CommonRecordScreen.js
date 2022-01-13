import React from "react";
import styles from "../../styles/container";
import CustomButton from "../CustomButton";
import LineSegment from "../lineSegment";
import RecordControl from "../RecordControl";
import Text from "../Text";
import CustomHeader from "../CustomHeader";
import View from "../View";
import Tags from "../Tags";

const CommonRecordScreen = ({
  currentStep,
  total,
  pageTitle,
  note,
  isPresent,
  screenNumber,
  handleAfterCreate,
  handleNextButton,
  buttonTitle,
  handlePressTitleLeft,
  final,
  disabled,
  loading,
  isList,
  dataSources
}) => (
  <View height="100%">
    <View height="28%">
      {currentStep && total && (
        <LineSegment currentStep={currentStep} total={total} />
      )}

      <View style={styles.contentInnerContainer}>
        <CustomHeader handlePress={handlePressTitleLeft}>
          <Text style={styles.pageTitle}>{pageTitle}</Text>
          <View style={styles.marginVertical}>
            <Text style={styles.note}>{note}</Text>
          </View>
        </CustomHeader>
      </View>
    </View>
    <View height="62%">
      {isList && <Tags dataSources={dataSources}></Tags>}
      <RecordControl
        isPresent={isPresent}
        screen_number={screenNumber}
        afterCreate={handleAfterCreate}
      />
    </View>
    <View height="10%">
      <View style={[styles.footer]}>
        {final ? (
          <CustomButton
            loading={loading}
            disabled={disabled}
            handlePress={handleNextButton}
            position="right"
            title={buttonTitle}
          />
        ) : (
          <CustomButton
            loading={false}
            disabled={!isPresent}
            handlePress={handleNextButton}
            position="right"
            title={buttonTitle}
          />
        )}
      </View>
    </View>
  </View>
);

export default CommonRecordScreen;
