import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import Text from "./Text";
import Slider from "react-native-slider";
import styles from "../styles/common";
import { colors } from "../styles/global";

const window = Dimensions.get("window");

const getMarginForSliderText = i => {
  switch (i) {
    case 1:
      return -10;

    case 3:
      return 15;

    default:
      return 0;
  }
};

class CustomSlider extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }
  render() {
    const { values, handleValueChange, value } = this.props;
    const arrayLength = values.length === 0 ? 1 : values.length - 1;
    return (
      <View>
        <View
          style={[styles.spaceBetweenWithOutFlex, styles.sliderTextWrapper]}
        >
          {values.map((data, i) => {
            return (
              <View
                key={i}
                style={{
                  flex: 1,
                  width: window.width / values.length,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: colors.font1,
                    fontSize: arrayLength > 5 ? 8 : 11,
                    marginVertical: 10,
                    alignSelf: "center",
                    marginLeft: getMarginForSliderText(i)
                  }}
                >
                  {value === i ? data.option_name : ""}
                </Text>
              </View>
            );
          })}
        </View>
        <Slider
          ref={this.slider}
          minimumValue={0}
          maximumValue={arrayLength}
          step={1}
          trackStyle={{
            height: 8,
            borderRadius: 6
          }}
          minimumTrackTintColor="#3775C0"
          maximumTrackTintColor="#ECEEEF"
          thumbStyle={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            backgroundColor: "#3775C0",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
            shadowOpacity: 0.35
          }}
          value={value}
          onValueChange={data => handleValueChange(data)}
        />
        <View
          style={[styles.spaceBetweenWithOutFlex, styles.sliderTextWrapper]}
        >
          {values.map((value, i) => {
            return (
              <View
                key={i}
                style={{
                  flex: 1,
                  width: window.width / values.length,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: colors.font1,
                    fontSize: arrayLength > 5 ? 8 : 11,
                    marginVertical: 10,
                    alignSelf: "center",
                    marginLeft: getMarginForSliderText(i)
                  }}
                >
                  {value.option_name}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default CustomSlider;
