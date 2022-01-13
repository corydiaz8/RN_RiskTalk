import React from "react";
import { ImageBackground } from "react-native";
import { Button, Icon } from "react-native-elements";
import styles from "../styles/common";

const UploadedImage = ({ uri, handlePress }) => {
  return (
    <ImageBackground
      style={styles.imageBackgroundContainer}
      imageStyle={styles.borderRadius4}
      source={{
        uri: uri
      }}
    >
      <Button
        onPress={handlePress}
        buttonStyle={styles.imageCancelButton}
        icon={<Icon name="md-trash" size={20} color="white" type="ionicon" />}
      />
    </ImageBackground>
  );
};
export default UploadedImage;
