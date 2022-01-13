import React from "react";
import CommonSuccessScreen from "../../Common/components/screens/CommonSuccessScreen";

const SuccessScreen = ({ navigation: { navigate } }) => (
  <CommonSuccessScreen
    title="You have successfully completed Hazard Task"
    note="You can find full Report of this Task under 'Reports' tab"
    handleNextButton={() => navigate("CreateReport")}
    buttonTitle="Next"
  />
);
export default SuccessScreen;
