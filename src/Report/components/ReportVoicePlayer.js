import React, { Component } from "react";
import { View, TouchableOpacity, Image, Platform } from "react-native";
import styles from "../../Common/styles/common";
import TimeFormat from "hh-mm-ss";
import Text from "../../Common/components/Text";
import { AudioUtils } from "react-native-audio";
import Video from "react-native-video";
import { BarIndicator } from "react-native-indicators";
import { colors } from "../../Common/styles/global";
import Spinner from "react-native-spinkit";

class ReportVoicePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      remainingTime: 0,
      startPlaying: true,
      duration: undefined,
      audioPath: undefined,
      isPaused: true,
      audioLists: []
    };
    this.player = React.createRef();
  }

  componentDidUpdate(prevProps) {
    try {
      const { offline, audioPath } = this.props;
      if (audioPath.length > 0 && prevProps.audioPath !== audioPath) {
        const audioURL = offline
          ? Platform.OS === "ios"
            ? AudioUtils.DocumentDirectoryPath + `/${this.props.audioPath[0]}`
            : AudioUtils.DownloadsDirectoryPath + `/${this.props.audioPath[0]}`
          : audioPath[0];
        this.setState(prevState => ({
          audioPath: audioURL,
          audioLists: [...prevState.audioLists, audioURL]
        }));
      }
    } catch (e) {}
  }

  onStartPlay = () => {
    try {
      this.player.seek(0);
      this.setState({
        startPlaying: false,
        isPaused: false,
        isPlay: true,
        remainingTime: this.state.duration
      });
    } catch (e) {}
  };

  onStopPlay = () => {
    try {
      this.setState({
        startPlaying: true,
        isPaused: true,
        isPlay: false,
        remainingTime: this.state.duration
      });
      if (Platform.OS === "android") {
        this.player.seek(0);
      }
    } catch (e) {}
  };

  onLoad = data => {
    console.log("THIS AUDIO LIST", data);
    const duration = Math.floor(data.duration);
    this.setState({ remainingTime: duration, duration });
  };
  onEnd = () => {
    this.setState({
      isPaused: true,
      startPlaying: true,
      remainingTime: this.state.duration
    });
  };

  onProgress = data => {
    const currentTime = Math.floor(data.currentTime);
    const remainingTime = this.state.duration - Math.floor(data.currentTime);
    if (this.state.startPlaying) {
      return;
    }
    this.setState({ currentTime, remainingTime });
  };
  render() {
    const {
      startPlaying,
      currentTime,
      remainingTime,
      audioPath,
      duration,
      isPaused
    } = this.state;
    const currentTimeDisplay =
      currentTime === 0
        ? "00:00"
        : TimeFormat.fromS(startPlaying ? 0 : currentTime, "mm:ss");
    const remainingTimeDisplay =
      remainingTime === 0 ? "00:00" : TimeFormat.fromS(remainingTime, "mm:ss");
    console.log("AAA", this.state.audioPath, duration);
    return (
      <View>
        {audioPath && (
          <Video
            audioOnly
            paused={isPaused}
            source={{ uri: this.state.audioPath }}
            ref={ref => {
              this.player = ref;
            }}
            onProgress={this.onProgress}
            onLoad={this.onLoad}
            onEnd={this.onEnd}
          />
        )}

        {duration === undefined ? (
          <View style={styles.flexCenter}>
            <Spinner
              isVisible={true}
              size={30}
              type="Wave"
              color={colors.primary}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {startPlaying ? (
                <TouchableOpacity
                  onPress={this.onStartPlay}
                  style={styles.playContainer}
                >
                  <Image source={require("../../Common/images/play.png")} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={this.onStopPlay}
                  style={styles.playContainer}
                >
                  <Image source={require("../../Common/images/stop.png")} />
                </TouchableOpacity>
              )}
            </View>
            <View>
              <View
                style={{
                  height: 60,
                  marginTop: 25
                }}
              >
                <BarIndicator
                  animating={!isPaused}
                  size={35}
                  count={18}
                  color={colors.primary}
                ></BarIndicator>
              </View>

              <View style={styles.timerContainer}>
                <Text style={styles.timer}>{currentTimeDisplay}</Text>
                <Text style={styles.timer}>{remainingTimeDisplay}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default ReportVoicePlayer;
