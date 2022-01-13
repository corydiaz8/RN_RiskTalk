import React, { Component } from "react";
import { View, Image, Text, Platform } from "react-native";
import Pulse from "react-native-pulse";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AudioRecorder, AudioUtils } from "react-native-audio";
import { connect } from "react-redux";
import Sound from "react-native-sound";
import styles from "../styles/common";
import VoiceWaveForm from "./VoiceWaveForm";
import { colors } from "../styles/global";
import { currentTimeStamp, audioSources } from "../settings/commonFunc";
import actions from "../../Main/redux/action";

const { saveAudioTemporary } = actions;

class RecordControl extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: 0,
      stoppedRecording: false,
      duration: 0,
      startRecording: false,
      startPlaying: true,
      finished: false,
      audioPath: undefined,
      hasPermission: undefined,
      enableRecord: false,
      currentMetering: 0,
      remainingTime: 0,
      totalMeteringLists: []
    };
  }

  prepareRecordingPath = () => {
    AudioRecorder.prepareRecordingAtPath(this.getAudioPath(), {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000,
      MeteringEnabled: true
    });
  };

  getAudioPath = () => {
    try {
      if (Platform.OS === "ios") {
        const audioPath =
          AudioUtils.DocumentDirectoryPath + `/${currentTimeStamp()}.aac`;
        this.setState({
          audioPath
        });
        return audioPath;
      }
      const audioPath =
        AudioUtils.DownloadsDirectoryPath + `/${currentTimeStamp()}.aac`;
      this.setState({
        audioPath
      });
      return audioPath;
    } catch (e) {
      console.log("GET AUDIO PATH", e);
    }
  };

  renderCurrentMetering = value => {
    try {
      let meteringValue = Math.floor(Math.abs(value));
      const findRelativeAudioSource = audioSources.find(audio => {
        if (meteringValue > 160) {
          return {
            key: 160,
            value: 0
          };
        }
        return audio.key === meteringValue;
      });
      const currentMetering = findRelativeAudioSource
        ? findRelativeAudioSource.value
        : 0;
      if (!currentMetering || currentMetering < 5) {
        return Math.floor(Math.random() * (5 - 1) + 1);
      } else if (currentMetering > 120) {
        return Math.floor(Math.random() * (120 - 60) + 60);
      } else {
        return currentMetering;
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  componentDidMount() {
    const { isPresent } = this.props;
    if (isPresent) {
      const { audioPath, duration, totalMeteringLists } = isPresent;
      this.setState({
        audioPath,
        currentTime: duration,
        totalMeteringLists
      });
    }

    AudioRecorder.requestAuthorization().then(isAuthorised => {
      this.setState({ hasPermission: isAuthorised });
      if (!isAuthorised) return;
      AudioRecorder.onProgress = e => {
        const currentPosition = parseInt(e.currentTime);
        this.setState(prevState => ({
          totalMeteringLists: [
            ...prevState.totalMeteringLists,
            this.renderCurrentMetering(e.currentMetering)
          ],
          currentMetering: this.renderCurrentMetering(e.currentMetering),
          currentTime: Math.floor(currentPosition),
          remainingTime: Math.floor(currentPosition)
        }));
      };
      const {
        saveAudioTemporary,
        screen_number,
        main: { temporaryAudioData }
      } = this.props;
      AudioRecorder.onFinished = data => {
        this.props.afterCreate(data.audioFileURL);
        const filterTemporaryAudioData = temporaryAudioData.filter(
          audio => audio.screen_number !== screen_number
        );
        const sendData = [
          ...filterTemporaryAudioData,
          {
            screen_number,
            duration: this.state.currentTime,
            totalMeteringLists: this.state.totalMeteringLists,
            audioPath: this.state.audioPath
          }
        ];
        return new Promise((resolve, reject) => {
          saveAudioTemporary(sendData, resolve, reject);
        });
      };
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async stopRecord() {
    if (!this.state.recording) {
      return;
    }
    this.setState({
      stoppedRecording: true,
      recording: false,
      enableRecord: false
    });
    try {
      const result = await AudioRecorder.stopRecording();
    } catch (error) {
      console.error(error);
    }
  }

  onStartPlay = async () => {
    const {
      screen_number,
      main: { temporaryAudioData }
    } = this.props;

    const findAudio = temporaryAudioData.find(
      audio => audio.screen_number === screen_number
    );
    const { audioPath, totalMeteringLists } = findAudio;
    this.setState({
      startPlaying: false
    });
    setTimeout(() => {
      this.sound = new Sound(audioPath, "", error => {
        if (error) {
          console.log("failed to load the sound", error);
        }
        this.setUpCurrentTime();
      });
      setTimeout(() => {
        this.sound.play(success => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
      }, 100);
    }, 100);
  };

  setUpCurrentTime = () => {
    if (this.sound !== null) {
      this.interval = setInterval(() => {
        this.sound.getCurrentTime(second => {
          const duration = Math.floor(this.sound.getDuration());
          const currentTime = Math.floor(second);
          const remainingTime = duration - currentTime;
          this.setState({
            currentTime,
            remainingTime,
            startRecording: false,
            duration
          });
          if (duration === currentTime) {
            const stop = this.onStopPlay();
            clearInterval(this.interval);
          }
        });
      }, 200);
    }
  };

  onStopPlay = async () => {
    try {
      this.setState({
        startPlaying: true,
        isPlay: false
      });
      this.sound.stop();
      this.sound.release();
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  async startRecord() {
    if (this.state.recording) {
      return;
    }

    if (!this.state.hasPermission) {
      return;
    }
    await this.setState({
      recording: true,
      enableRecord: true,
      startRecording: true,
      totalMeteringLists: []
    });
    const audioPath = await this.prepareRecordingPath();
    try {
      const result = await AudioRecorder.startRecording(this.state.audioPath);
      console.log("RESULT", result, audioPath);
      return;
    } catch (error) {
      console.error("error", error);
    }
  }

  handleReset = async () => {
    const {
      saveAudioTemporary,
      screen_number,
      main: { temporaryAudioData }
    } = this.props;
    const filterTemporaryAudioData = temporaryAudioData.filter(
      audio => audio.screen_number !== screen_number
    );
    const sendData = [...filterTemporaryAudioData];
    this.setState({
      totalMeteringLists: []
    });
    await this.setState(
      {
        audioPath: undefined,
        currentTime: 0,
        remainingTime: 0,
        currentMetering: 0
      },
      () => this.props.afterCreate(undefined)
    );
    return await new Promise((resolve, reject) => {
      saveAudioTemporary(sendData, resolve, reject);
    });
  };

  render() {
    const {
      enableRecord,
      currentTime,
      duration,
      currentMetering,
      startPlaying,
      remainingTime,
      totalMeteringLists,
      startRecording
    } = this.state;
    return (
      <View style={styles.recordControlContainerWrapper}>
        <VoiceWaveForm
          startRecording={startRecording}
          currentTime={currentTime}
          currentMetering={currentMetering}
          remainingTime={remainingTime}
          duration={duration}
          totalMeteringLists={totalMeteringLists}
        />
        <View style={styles.recordControlContainer}>
          {startPlaying ? (
            <TouchableOpacity
              onPress={this.onStartPlay}
              style={styles.playContainer}
            >
              <Image source={require("../images/play.png")} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={this.onStopPlay}
              style={styles.playContainer}
            >
              <Image source={require("../images/stop.png")} />
            </TouchableOpacity>
          )}

          {!enableRecord ? (
            <TouchableOpacity
              onPress={this.startRecord.bind(this)}
              style={styles.pluseWrapperContainer}
            >
              <View style={styles.circleContainer} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={this.stopRecord.bind(this)}
              style={styles.pluseWrapperContainer}
            >
              <Pulse
                color={colors.alert}
                numPulses={3}
                diameter={120}
                speed={20}
                initialDiameter={120}
                duration={1000}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={this.handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    main: state.Main
  }),
  { saveAudioTemporary }
)(RecordControl);
