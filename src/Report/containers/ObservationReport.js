import React from "react";
import { View, Image } from "react-native";
import CustomListItem from "../../Common/components/CustomListItem";
import Text from "../../Common/components/Text";
import styles from "../../Common/styles/container";
import reportStyles from "../style/index";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

const ObservationReport = ({
  dataSources,
  note,
  additionalSources,
  isCloseToBottom,
  handlePagination,
  navigation: { navigate }
}) => (
  <View style={styles.contentInnerContainer}>
    {dataSources.length > 0 || additionalSources.length > 0 ? (
      <ScrollView
        contentContainerStyle={styles.flexGrowWithPadding}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handlePagination();
          }
        }}
        scrollEventThrottle={400}
      >
        {additionalSources.map(data => {
          return (
            <CustomListItem
              key={data.unique_id}
              listTitle={data.selectName}
              note={note}
              time={data.unique_id}
              handlePress={() =>
                navigate("ReportDetailsOffline", {
                  moduleName: note,
                  filterId: data.unique_id,
                  currentValue: 1,
                  createdAt: data.created_at
                })
              }
            />
          );
        })}
        {dataSources.map(data => {
          return (
            <CustomListItem
              key={data.assessmen_id}
              listTitle={data.task}
              note={note}
              time={data.created_at}
              status
              handlePress={() =>
                navigate("ReportDetails", {
                  moduleName: note,
                  activityId: data.assessmen_id,
                  currentValue: 1,
                  createdAt: data.created_at
                })
              }
            />
          );
        })}
      </ScrollView>
    ) : (
      <View style={reportStyles.emptyImageContainer}>
        <Image source={require("../../Common/images/reportempty.png")} />
        <Text style={[styles.note, reportStyles.emptyText]}>
          It seems there is no Observation Report to show
        </Text>
      </View>
    )}
  </View>
);

export default withNavigation(ObservationReport);
