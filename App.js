import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import AppContainer from "./src/Common/settings/routes";
import { Provider } from "react-redux";
import createStore from "./src/Common/redux/store";
import { ReduxNetworkProvider } from "react-native-offline";
import { Sentry, SentryLog } from "react-native-sentry";
import { colors } from "./src/Common/styles/global";

Sentry.config("https://72554c6cd5754ad4915824814b521b91@sentry.io/1546490", {
  deactivateStacktraceMerging: false,
  logLevel: SentryLog.None,
  disableNativeIntegration: false,
  handlePromiseRejection: true
}).install();

const store = createStore({ queueReleaseThrottle: 1000 });

const pingUrl = "https://www.google.com/";
const App = () => {
  return (
    <Provider store={store}>
      <ReduxNetworkProvider pingServerUrl={pingUrl}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <AppContainer />
        </SafeAreaView>
      </ReduxNetworkProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.font2
  }
});
