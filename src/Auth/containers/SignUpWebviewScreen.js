import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { WebView } from 'react-native-webview';

import View from "../../Common/components/View";
import Text from "../../Common/components/Text";
import CustomHeader from "../../Common/components/CustomHeader";
import styles from "../../Common/styles/container";

export default ({
  navigation: {goBack}
}) => (
  <>
    <KeyboardAvoidingView behavior='padding'>
      <View
        style={[styles.contentInnerContainer]}
      >
        <CustomHeader handlePress={() => goBack()} />
        <Text style={styles.pageTitle}>Free 14 Day Trial</Text>
        </View> 
    </KeyboardAvoidingView>
    <WebView
      source={{ uri: 'https://risktalk.com.au/app/registration' }}
      startInLoadingState={true}
    />
  </>
);
