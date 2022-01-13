import React, { Fragment } from "react";
import styles from "../../styles/container";
import CustomButton from "../CustomButton";
import LineSegment from "../lineSegment";
import CustomSlider from "../CustomSlider";
import Text from "../Text";
import CustomHeader from "../CustomHeader";
import View from "../View";
import { ScrollView } from "react-native-gesture-handler";
import HorizontalLine from "../HorizontalLine";

const CommonSliderScreen = ({
  currentStep,
  total,
  single,
  pageTitle1,
  note1,
  pageTitle2,
  note2,
  handlePressTitleLeft,
  sliderValue1,
  sliderValues1,
  sliderValue2,
  sliderValues2,
  handleSliderValueChange1,
  handleSliderValueChange2,
  isPresent,
  handleNextButton,
  buttonTitle
}) => (
  <View height="100%">
    <ScrollView contentContainerStyle={styles.flexGrow}>
      <View height="10%">
        <LineSegment currentStep={currentStep} total={total} />
        <View style={styles.contentInnerContainer}>
          <CustomHeader handlePress={handlePressTitleLeft}>
            {single && <Text style={styles.pageTitle}>{pageTitle1}</Text>}
          </CustomHeader>
        </View>
      </View>
      {single ? (
        <View height="80%">
          <View style={[styles.placeToCenter, styles.contentInnerContainer]}>
            <View style={styles.marginVertical}>
              <Text style={styles.noteOptional}>{note1}</Text>
              <CustomSlider
                value={sliderValue1}
                values={sliderValues1}
                handleValueChange={handleSliderValueChange1}
              />
            </View>
          </View>
        </View>
      ) : (
        <Fragment>
          <View height="38%">
            <View style={styles.contentInnerContainer}>
              <Text style={styles.pageTitleOptional}>{pageTitle1}</Text>
              <Text style={styles.noteOptional}>{note1}</Text>
              <CustomSlider
                value={sliderValue1}
                values={sliderValues1}
                handleValueChange={handleSliderValueChange1}
              />
            </View>
          </View>
          <View style={styles.contentInnerContainer}>
            <HorizontalLine />
          </View>
          <View height="38%">
            <View style={styles.contentInnerContainer}>
              <Text style={styles.pageTitleOptional}>{pageTitle2}</Text>
              <Text style={styles.noteOptional}>{note2}</Text>
              <CustomSlider
                value={sliderValue2}
                values={sliderValues2}
                handleValueChange={handleSliderValueChange2}
              />
            </View>
          </View>
        </Fragment>
      )}
      <View height="10%">
        <View style={styles.footer}>
          <CustomButton
            disabled={!isPresent}
            handlePress={handleNextButton}
            position="right"
            title={buttonTitle}
          />
        </View>
      </View>
    </ScrollView>
  </View>
);

export default CommonSliderScreen;
