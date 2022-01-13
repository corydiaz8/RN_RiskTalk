import React from "react";
import styles from "../../styles/container";
import CustomButton from "../CustomButton";
import SuccessErrorMessage from "../SuccessErrorMessage";
import View from "../View";

const CommonSuccessScreen = ({
  title,
  note,
  handleNextButton,
  buttonTitle
}) => (
  <View height="100%">
    <View height="90%">
      <View style={[styles.placeToCenter, styles.contentInnerContainer]}>
        <SuccessErrorMessage status={true} title={title} note={note} />
      </View>
    </View>
    <View height="10%">
      <View style={[styles.contentContainer, styles.footer]}>
        <CustomButton
          handlePress={handleNextButton}
          position="right"
          title={buttonTitle}
        />
      </View>
    </View>
  </View>
);

export default CommonSuccessScreen;
