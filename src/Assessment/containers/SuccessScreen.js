import React, { Component } from "react";
import { connect } from "react-redux";
import CommonSuccessScreen from "../../Common/components/screens/CommonSuccessScreen";

class SuccessScreen extends Component {
  render() {
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <CommonSuccessScreen
        title="You have successfully completed Assessment Task"
        note="You can find full Report of this Task under 'Reports' tab"
        handleNextButton={() => navigate("CreateReport")}
        buttonTitle="Next"
      />
    );
  }
}

export default connect(
  null,
  {}
)(SuccessScreen);
