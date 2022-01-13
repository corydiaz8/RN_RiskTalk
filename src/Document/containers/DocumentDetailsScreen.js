import React, { Component } from "react";
import View from "../../Common/components/View";
import Text from "../../Common/components/Text";
import styles from "../../Common/styles/container";
import CustomFooter from "../../Common/components/CustomFooter";
import DocumentList from "../components/DocumentList";
import CustomHeader from "../../Common/components/CustomHeader";
import { colors } from "../../Common/styles/global";
import { connect } from "react-redux";
import { Image } from "react-native-elements";
import documentStyles from "../../Document/style/index";
class DocumentDetailsScreen extends Component {
  render() {
    const {
      document: { listDocuments },
      navigation: { goBack, getParam, navigate }
    } = this.props;
    const documentID = getParam("documentID");
    const documentName = getParam("documentName");

    const filterListDocuments = listDocuments.find(
      document => document.id === documentID
    );
    const { document } = filterListDocuments || [];
    const isDocumentPresent = document && document.length > 0;
    return (
      <View height="100%">
        <View height="8%">
          <View style={styles.contentInnerContainer}>
            <CustomHeader handlePress={() => goBack()}>
              <Text style={styles.pageTitle}>Overview of All Documents</Text>
            </CustomHeader>
          </View>
        </View>
        <View height="82%">
          <View style={styles.contentInnerContainer}>
            <DocumentList
              margin={15}
              iconDocument
              underline
              title={documentName}
            />
            {isDocumentPresent ? (
              document.map(document => {
                return document.file.map(file => {
                  return (
                    <DocumentList
                      handlePress={() =>
                        navigate("DocumentView", {
                          signed_url: file.signed_url,
                          documentName: documentName
                        })
                      }
                      margin={8}
                      color={colors.white}
                      underline
                      key={file.id}
                      title={file.attachment}
                    />
                  );
                });
              })
            ) : (
              <View
                style={[documentStyles.emptyImageContainer, { height: "82%" }]}
              >
                <Image source={require("../../Common/images/pdfempty.png")} />
                <Text style={[styles.note, { marginTop: 5 }]}>
                  No additional files here
                </Text>
              </View>
            )}
          </View>
        </View>
        <View height="10%">
          <CustomFooter currentIndex={1} />
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  document: state.Document
}))(DocumentDetailsScreen);
