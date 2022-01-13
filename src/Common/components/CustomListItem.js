import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../../Common/components/Text";
import styles from "../styles/common";
import HorizontalLine from "./HorizontalLine";
import Moment from "react-moment";
import { Icon } from "react-native-elements";

Moment.globalFormat = "DD/MM/YYYY";

const CustomListItem = ({ handlePress, listTitle, note, time, status }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.listWrapper}>
      <View style={styles.titleSubTitleListWrapper}>
        <View style={[styles.spaceBetweenWithOutFlex, styles.titleContainer]}>
          <Text style={styles.listTitle}> {listTitle || "N/A"}</Text>
          <View>
            {status ? (
              <Icon size={12} type="font-awesome" name="circle" color="green" />
            ) : (
              <Icon size={12} type="font-awesome" name="circle" color="red" />
            )}
          </View>
        </View>
        <View
          style={[styles.spaceBetweenWithOutFlex, styles.subTitleContainer]}
        >
          {note && <Text style={styles.listSubText}>{note}</Text>}
          {time && (
            <Text style={styles.dateText}>
              <Moment element={Text}>{time}</Moment>
            </Text>
          )}
        </View>
      </View>
      <HorizontalLine />
    </TouchableOpacity>
  );
};

export default CustomListItem;
