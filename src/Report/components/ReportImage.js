import React from "react";
import { ImageBackground, View } from "react-native";
import styles from "../../Common/styles/common";

const ReportImage = ({ images, additionalImages }) => (
  <View style={styles.spaceBetweenWithFlex}>
    {images.map((image, index) => {
      return (
        <ImageBackground
          key={index}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.borderRadius4}
          source={{
            uri: additionalImages
              ? "file://" + additionalImages[index]["file"]
              : image
          }}
        />
      );
    })}
  </View>
);

export default ReportImage;
