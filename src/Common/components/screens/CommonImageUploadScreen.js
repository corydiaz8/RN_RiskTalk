import React from "react";
import { Platform } from "react-native";
import styles from "../../styles/container";
import CustomButton from "../CustomButton";
import LineSegment from "../lineSegment";
import UploadedImage from "../UploadedImage";
import Text from "../Text";
import CustomHeader from "../CustomHeader";
import View from "../View";
import { ScrollView } from "react-native-gesture-handler";
import ImageBox from "../ImageBox";

const CommonImageUploadScreen = ({
  currentStep,
  total,
  pageTitle,
  handlePressTitleLeft,
  handleChoosePhoto,
  handleDeletePhoto,
  handleNextButton,
  photos,
  note,
  buttonTitle
}) => (
  <View height="100%">
    <ScrollView contentContainerStyle={styles.flexGrow}>
      <View height="10%">
        <LineSegment currentStep={currentStep} total={total} />
        <View style={styles.contentInnerContainer}>
          <CustomHeader handlePress={handlePressTitleLeft}>
            <Text style={styles.pageTitle}>{pageTitle}</Text>
            <View style={styles.marginVertical}>
              <Text style={styles.note}>{note}</Text>
            </View>
          </CustomHeader>
        </View>
      </View>
      <View height="80%">
        <View style={styles.contentInnerContainer}>
          <ScrollView>
            <View style={styles.marginVertical}>
              <ImageBox handleClick={handleChoosePhoto} />
            </View>
            <View
              direction="row"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                marginVertical: 10
              }}
            >
              {photos.map((photo, i) => {
                return (
                  <UploadedImage
                    key={i}
                    handlePress={() => handleDeletePhoto(i)}
                    uri={
                      Platform.OS === "ios"
                        ? photo.uri
                        : "file://" + (photo.path || photo.file)
                    }
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      <View height="10%">
        <View style={styles.footer}>
          <CustomButton
            handlePress={handleNextButton}
            position="right"
            title={buttonTitle}
          />
        </View>
      </View>
    </ScrollView>
  </View>
);

export default CommonImageUploadScreen;
