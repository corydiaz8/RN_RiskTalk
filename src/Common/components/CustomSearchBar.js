import React from "react";
import { View } from "react-native";
import { Input, Text, Image } from "react-native-elements";
import styles from "../styles/common";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../styles/global";

const CustomSearchBar = ({
  placeholder,
  handleTextChange,
  handleOnFocus,
  searchValue,
  children,
  isShow,
  handleRightClick,
  text,
  handleTextPress
}) => {
  const childrenLength = children && children.length;
  return (
    <View style={styles.searchContainer}>
      <Input
        placeholderTextColor={colors.font3}
        keyboardType="default"
        onFocus={handleOnFocus}
        value={searchValue}
        onChangeText={handleTextChange}
        inputContainerStyle={
          searchValue !== undefined && isShow
            ? styles.searchInputContainerTouch
            : styles.searchInputContainer
        }
        placeholder={placeholder}
        leftIcon={{ name: "search", size: 20 }}
        rightIcon={
          handleRightClick
            ? {
                name: "close",
                size: 20,
                onPress: () => handleRightClick()
              }
            : null
        }
      />

      {searchValue !== undefined && isShow && (
        <View style={styles.searchContentContainer}>
          <ScrollView>
            {childrenLength > 0 ? (
              <View>
                {children.map(child => {
                  return child;
                })}
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 40,
                  paddingHorizontal: 20
                }}
              >
                <Text style={styles.emptySearchText}>
                  We are sorry. But we couldn’t find anything along words of:
                  {searchValue} .
                </Text>
                <Image
                  style={styles.marginV10}
                  source={require("../images/searchicon.png")}
                ></Image>
                {text && (
                  <View style={styles.marginV10}>
                    <TouchableOpacity onPress={handleTextPress}>
                      <Text style={styles.actionTitle}>{text}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CustomSearchBar;
