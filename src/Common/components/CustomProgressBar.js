import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import * as Progress from "react-native-progress";
import { Button } from "react-native-elements";

export default class CustomProgressBar extends React.Component {
  state = {
    progress: 0
  };

  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value
    });
  };

  render() {
    const barWidth = Dimensions.get("screen").width - 90;
    const { progress } = this.state;
    const progressInPercentage = Math.floor(Math.round(progress)) * 100;
    return (
      <View style={styles.container}>
        <Progress.Bar
          height={200}
          progress={this.state.progress}
          width={barWidth}
        >
          {/* <Text
            style={{
              position: "absolute",
              flex: 0,
              alignSelf: "center",
              color: "#000",
              marginBottom: 5
            }}
          >
            {progressInPercentage}
          </Text> */}
        </Progress.Bar>

        <Button
          buttonStyle={{
            marginTop: 20
          }}
          title="Increase 20%"
          onPress={this.increase.bind(this, "progress", 0.1)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 50,
    padding: 15
  }
});
