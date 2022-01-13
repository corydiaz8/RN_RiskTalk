import React from "react";
import { Button } from "react-native-elements";
import styles from "../styles/common";

const CustomButton = ({ title, handlePress, loading, ...restProps }) => {
  return (
    <Button
      loading={loading}
      onPress={handlePress}
      buttonStyle={styles.customButton}
      title={title}
      {...restProps}
    />
  );
};

export default CustomButton;
