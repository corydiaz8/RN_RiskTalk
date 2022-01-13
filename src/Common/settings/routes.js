import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import SignInScreen from "../../Auth/containers/SignInScreen";
import CompanyScreen from "../../Main/containers/CompanyScreen";
import ProjectScreen from "../../Main/containers/ProjectScreen";
import AuthLoadingScreen from "../../Main/containers/AuthLoadingScreen";
import CreateReportScreen from "../../Main/containers/CreateReportScreen";
import DocumentScreen from "../../Document/containers/DocumentScreen";
import AssessmentFirstScreen from "../../Assessment/containers/AssessmentFirstScreen";
import CreateAssessmentTaskScreen from "../../Assessment/containers/CreateTaskScreen";
import AssessmentSecondScreen from "../../Assessment/containers/AssessmentSecondScreen";
import AssessmentThirdScreen from "../../Assessment/containers/AssessmentThirdScreen";
import AssessmentFourScreen from "../../Assessment/containers/AssessmentFourScreen";
import AssessmentFifthScreen from "../../Assessment/containers/AssessmentFifthScreen";
import AssessmentSixScreen from "../../Assessment/containers/AssessmentSixScreen";
import AssessmentSevenScreen from "../../Assessment/containers/AssessmentSevenScreen";
import AssessmentEightScreen from "../../Assessment/containers/AssessmentEightScreen";
import AssessmentNineScreen from "../../Assessment/containers/AssessmentNineScreen";
import AssessmentSuccessScreen from "../../Assessment/containers/SuccessScreen";
import ForgotPasswordScreen from "../../Auth/containers/ForgotPasswordScreen";
import ChangePasswordScreen from "../../Auth/containers/ChangePasswordScreen";
import LogOutScreen from "../../Auth/containers/LogOutScreen";
import ProfileScreen from "../../Auth/containers/ProfileScreen";
import PasswordLinkScreen from "../../Auth/containers/PasswordLinkScreen";
import CreateObservationTaskScreen from "../../Observation/containers/CreateTaskScreen";
import ObservationFirstScreen from "../../Observation/containers/ObservationFirstScreen";
import ObservationSecondScreen from "../../Observation/containers/ObservationSecondScreen";
import ObservationThirdScreen from "../../Observation/containers/ObservationThirdScreen";
import ObservationFourScreen from "../../Observation/containers/ObservationFourScreen";
import ObservationFifthScreen from "../../Observation/containers/ObservationFifthScreen";
import ObservationSixScreen from "../../Observation/containers/ObservationSixScreen";
import ObservationSevenScreen from "../../Observation/containers/ObservationSevenScreen";
import ObservationSuccessScreen from "../../Observation/containers/SuccessScreen";
import IncidentFirstScreen from "../../Incident/containers/IncidentFirstScreen";
import IncidentSecondScreen from "../../Incident/containers/IncidentSecondScreen";
import IncidentThirdScreen from "../../Incident/containers/IncidentThirdScreen";
import IncidentFourScreen from "../../Incident/containers/IncidentFourScreen";
import IncidentFifthScreen from "../../Incident/containers/IncidentFifthScreen";
import IncidentSixScreen from "../../Incident/containers/IncidentSixScreen";
import IncidentSevenScreen from "../../Incident/containers/IncidentSevenScreen";
import IncidentEightScreen from "../../Incident/containers/IncidentEightScreen";
import IncidentNineScreen from "../../Incident/containers/IncidentNineScreen";
import IncidentSuccessScreen from "../../Incident/containers/SuccessScreen";
import HazardFirstScreen from "../../Hazard/containers/HazardFirstScreen";
import HazardSecondScreen from "../../Hazard/containers/HazardSecondScreen";
import HazardThirdScreen from "../../Hazard/containers/HazardThirdScreen";
import HazardFourScreen from "../../Hazard/containers/HazardFourScreen";
import HazardFifthScreen from "../../Hazard/containers/HazardFifthScreen";
import HazardSixScreen from "../../Hazard/containers/HazardSixScreen";
import HazardSevenScreen from "../../Hazard/containers/HazardSevenScreen";
import HazardSuccessScreen from "../../Hazard/containers/SuccessScreen";
import ReportScreen from "../../Report/containers/ReportScreen";
import ReportDetailsScreen from "../../Report/containers/ReportDetailsScreen";
import AmendAdditionalScreen from "../../Report/containers/AmendAdditionalScreen";
import ReportDetailsOfflineScreen from "../../Report/containers/ReportDetailsOfflineScreen";
import DocumentDetailsScreen from "../../Document/containers/DocumentDetailsScreen";
import DocumentViewScreen from "../../Document/containers/DocumentViewScreen";
import CheckCodeScreen from "../../Auth/containers/CheckCodeScreen";
import ChangeForgotPasswordScreen from "../../Auth/containers/ChangeForgotPasswordScreen";
import SignUpWebviewScreen from "../../Auth/containers/SignUpWebviewScreen";

const AssessmentStack = createStackNavigator(
  {
    AssessmentFirst: AssessmentFirstScreen,
    AssessmentSecond: AssessmentSecondScreen,
    AssessmentThird: AssessmentThirdScreen,
    AssessmentFour: AssessmentFourScreen,
    AssessmentFifth: AssessmentFifthScreen,
    AssessmentSix: AssessmentSixScreen,
    AssessmentSeven: AssessmentSevenScreen,
    AssessmentEight: AssessmentEightScreen,
    AssessmentNine: AssessmentNineScreen,
    CreateTask: CreateAssessmentTaskScreen,
    AssessmentSuccess: AssessmentSuccessScreen
  },
  {
    headerMode: "none"
  }
);

const ObservationStack = createStackNavigator(
  {
    ObservationFirst: ObservationFirstScreen,
    ObservationSecond: ObservationSecondScreen,
    ObservationThird: ObservationThirdScreen,
    ObservationFour: ObservationFourScreen,
    ObservationFifth: ObservationFifthScreen,
    ObservationSix: ObservationSixScreen,
    ObservationSeven: ObservationSevenScreen,
    ObservationSuccess: ObservationSuccessScreen,
    CreateTask: CreateObservationTaskScreen
  },
  {
    headerMode: "none"
  }
);

const IncidentStack = createStackNavigator(
  {
    IncidentFirst: IncidentFirstScreen,
    IncidentSecond: IncidentSecondScreen,
    IncidentThird: IncidentThirdScreen,
    IncidentFour: IncidentFourScreen,
    IncidentFifth: IncidentFifthScreen,
    IncidentSix: IncidentSixScreen,
    IncidentSeven: IncidentSevenScreen,
    IncidentEight: IncidentEightScreen,
    IncidentNine: IncidentNineScreen,
    IncidentSuccess: IncidentSuccessScreen
  },
  {
    headerMode: "none"
  }
);

const HazardStack = createStackNavigator(
  {
    HazardFirst: HazardFirstScreen,
    HazardSecond: HazardSecondScreen,
    HazardThird: HazardThirdScreen,
    HazardFour: HazardFourScreen,
    HazardFifth: HazardFifthScreen,
    HazardSix: HazardSixScreen,
    HazardSeven: HazardSevenScreen,
    HazardSuccess: HazardSuccessScreen
  },
  {
    headerMode: "none"
  }
);

const ReportStack = createStackNavigator(
  {
    Report: ReportScreen,
    ReportDetails: ReportDetailsScreen,
    ReportDetailsOffline: ReportDetailsOfflineScreen,
    AmendAdditional: AmendAdditionalScreen
  },
  {
    headerMode: "none"
  }
);

const DocumentStack = createStackNavigator(
  {
    Document: DocumentScreen,
    DocumentDetails: DocumentDetailsScreen,
    DocumentView: DocumentViewScreen
  },
  {
    headerMode: "none"
  }
);

const ModuleStack = createStackNavigator(
  {
    CreateReport: CreateReportScreen,
    AssessmentStack,
    ObservationStack,
    IncidentStack,
    HazardStack,
    ReportStack,
    DocumentStack
  },
  {
    headerMode: "none"
  }
);

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    ForgotPassword: ForgotPasswordScreen,
    PasswordLink: PasswordLinkScreen,
    CheckCode: CheckCodeScreen,
    ChangeForgotPassword: ChangeForgotPasswordScreen,
    LogOut: LogOutScreen,
    SignUpWeview: SignUpWebviewScreen
  },
  {
    headerMode: "none"
  }
);

const UserStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    ChangePassword: ChangePasswordScreen
  },
  {
    headerMode: "none"
  }
);

const MainStack = createStackNavigator(
  {
    Company: CompanyScreen,
    Project: ProjectScreen,
    ModuleStack,
    UserStack
  },
  {
    headerMode: "none"
  }
);

const rootSwitchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  Main: MainStack
});

export default createAppContainer(rootSwitchNavigator);
