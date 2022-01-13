import Toast from "react-native-tiny-toast";

const getToastNotification = message =>
  Toast.show(message, {
    position: Toast.position.center,
    containerStyle: {
      marginHorizontal: 15
    }
  });
export default getToastNotification;

export const getLoadingToastNotification = message =>
  Toast.showLoading(message);
