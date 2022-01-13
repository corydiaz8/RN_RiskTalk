import React, { Component } from "react";
import View from "../../Common/components/View";
import Text from "../../Common/components/Text";
import styles from "../../Common/styles/container";
import CustomFooter from "../../Common/components/CustomFooter";
import CustomHeader from "../../Common/components/CustomHeader";
import DocumentList from "../components/DocumentList";
import { colors } from "../../Common/styles/global";
import { connect } from "react-redux";
import actions from "../redux/action";
import documentStyles from "../../Document/style/index";
import { Image } from "react-native-elements";
import CustomLoader from "../../Common/components/CustomLoader";

const { listDocument } = actions;

class DocumentScreen extends Component {
  componentDidMount() {
    try {
      const {
        listDocument,
        main: { temporaryData }
      } = this.props;
      const { selectedCompanyId, selectedProjectId } = temporaryData;

      const sendData = {
        request_for: "document_repository",
        project_id: selectedProjectId,
        company_id: selectedCompanyId
      };
      return new Promise((resolve, reject) => {
        listDocument(sendData, resolve, reject);
      })
        .then(success => {
          console.log("SUCCESS DOCUMENT", success);
        })
        .catch(error => {
          console.log("ERROR DOCUMENT", error);
        });
    } catch (e) {
      console.log("ERROR HERE DOCUMENT");
    }
  }

  render() {
    const {
      document: { listDocuments, loadingListDocument },
      navigation: { navigate }
    } = this.props;

    return (
      <View height="100%">
        <View height="8%">
          <View style={styles.contentInnerContainer}>
            <CustomHeader>
              <Text style={styles.pageTitle}>Overview of All Documents</Text>
            </CustomHeader>
          </View>
        </View>
        <View height="82%">
          {loadingListDocument ? (
            <CustomLoader></CustomLoader>
          ) : (
            <View style={styles.contentInnerContainer}>
              {listDocuments.length > 0 ? (
                listDocuments.map(document => {
                  return (
                    <DocumentList
                      handlePress={() =>
                        navigate("DocumentDetails", {
                          documentID: document.id,
                          documentName: document.name
                        })
                      }
                      underline
                      key={document.id}
                      margin={15}
                      iconDocument
                      color={colors.lineBlack}
                      title={document.name}
                    />
                  );
                })
              ) : (
                <View
                  style={[
                    documentStyles.emptyImageContainer,
                    { height: "100%" }
                  ]}
                >
                  <Image source={require("../../Common/images/pdfempty.png")} />
                  <Text style={[styles.note, { marginTop: 5 }]}>
                    No document here
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        <View height="10%">
          <CustomFooter currentIndex={1} />
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    main: state.Main,
    document: state.Document
  }),
  { listDocument }
)(DocumentScreen);
