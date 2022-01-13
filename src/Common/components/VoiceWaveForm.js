import React, { Component, Fragment } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import styles from "../styles/common";
import TimeFormat from "hh-mm-ss";
import { colors } from "../styles/global";

const window = Dimensions.get("window");
const width = window.width;

class VoiceWaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightLists: []
    };
  }

  renderWaveForm = (heightLists, i) => {
    try {
      const deviceWidth = parseInt(width);
      const signleWaveformWidth = deviceWidth - (deviceWidth - 2.9);
      const singleWaveFormHeight = {
        width: signleWaveformWidth,
        height: heightLists[i]
      };
      return (
        <View key={i} style={[singleWaveFormHeight, styles.singleWaveForm]}>
          <View
            style={{
              backgroundColor: colors.white,
              height: 2,
              width: signleWaveformWidth
            }}
          />
        </View>
      );
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.currentMetering !== this.props.currentMetering) {
      if (this.props.currentMetering) {
        this.setState({
          heightLists: [
            ...this.state.heightLists,
            parseInt(this.props.currentMetering) || 0
          ]
        });
      }
    }
  }

  render() {
    const {
      currentTime,
      remainingTime,
      startRecording,
      totalMeteringLists
    } = this.props;
    const { heightLists } = this.state;
    const arrays = new Array(currentTime + 1)
      .join("0")
      .split("")
      .map(parseFloat);
    const currentTimeDisplay =
      currentTime === 0 ? "00:00" : TimeFormat.fromS(currentTime, "mm:ss");
    const remainingTimeDisplay =
      remainingTime === 0 ? "00:00" : TimeFormat.fromS(remainingTime, "mm:ss");
    return (
      <Fragment>
        <View style={styles.voiceWaveFormContainer}>
          <View style={styles.voiceWaveForm}>
            <Image
              resizeMode="contain"
              style={{
                left: totalMeteringLists.length
              }}
              source={require("../images/timestamp.png")}
            />
            {arrays.map((a, i) => {
              return this.renderWaveForm(heightLists, i);
            })}
          </View>
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>
            {startRecording ? "00:00" : currentTimeDisplay}
          </Text>
          <Text style={styles.timer}>{remainingTimeDisplay}</Text>
        </View>
      </Fragment>
    );
  }
}

export default VoiceWaveForm;
