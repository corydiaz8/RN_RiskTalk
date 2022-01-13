import React from "react";
import { View } from "react-native";
import Text from "../../Common/components/Text";
import styles from "../style";
import commonStyles from "../../Common/styles/common";

const ReportCard = ({ reportTitle, notes, number }) => {
  let notesLength = 0;
  const isNotePresent = notes && notes.length > 0;
  if (isNotePresent) {
    notesLength = notes.length;
  }
  return (
    <View>
      <Text style={styles.reportTitle}>
        {reportTitle}
        {number && notesLength !== 0 && (
          <Text style={styles.count}> ({notesLength})</Text>
        )}
      </Text>
      {isNotePresent &&
        notes.map((note, i) => {
          return (
            <View key={i} style={commonStyles.flexStart}>
              <Text style={styles.noteTitle}>{note}</Text>
            </View>
          );
        })}
    </View>
  );
};

export default ReportCard;
