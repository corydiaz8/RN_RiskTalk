import React from "react";
import Pdf from "react-native-pdf";
import CustomHeader from "../../Common/components/CustomHeader";
import Text from "../../Common/components/Text";
import View from "../../Common/components/View";
import styles from "../../Common/styles/container";

const DocumentViewScreen = ({ navigation: { getParam, goBack } }) => {
  const signed_url = getParam("signed_url");
  const documentName = getParam("documentName");
  const source = {
    uri: signed_url,
    cache: true
  };
  return (
    <View height="100%">
      <View height="10%">
        <View style={styles.contentInnerContainer}>
          <CustomHeader handlePress={() => goBack()}>
            <Text style={styles.pageTitle}>{documentName}</Text>
          </CustomHeader>
        </View>
      </View>
      <View height="90%">
        <Pdf
          source={source}
          onLoadComplete={numberOfPages => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log("OnLoad DOCUMENT error", error);
          }}
          style={styles.contentContainer}
        />
      </View>
    </View>
  );
};

export default DocumentViewScreen;
