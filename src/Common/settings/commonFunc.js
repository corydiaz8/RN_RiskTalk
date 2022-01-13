import Axios from "axios";
import { Platform } from "react-native";
import { URL } from "./api";
import RNFS from "react-native-fs";

export const removeFileFromDevice = path => {
  console.log("FILE REMOVE", path);
  if (!path) {
    return true;
  }
  let filePath = Platform.OS === "ios" ? path : path.split("///").pop();
  return RNFS.unlink(filePath)
    .then(success => {
      console.log("FILE REMOVE SUCCESSFULLY", success);
    })
    .catch(err => {
      console.log("FILE REMOVE ERROR", err);
      return err;
    });
};

export const onlyUnique = items => {
  return Array.from(new Set(items));
};

export const currentTimeStamp = () => {
  const currentDate = new Date();
  return currentDate.getTime();
};

export const lastValueOfArray = value => {
  const arrayLength = value.length;
  return value[arrayLength - 1];
};

export const userDetails = state => state.Auth;
export const network = state => state.network.isConnected;
export const store = state => state;
export const offlineStatus = state => state.Auth.offlineStatus;
export const scheduleDatas = state => state.Auth.scheduleDatas;

export const isObjectEmpty = data =>
  Object.keys(data).length === 0 && data.constructor === Object;

const urls = [
  {
    key: "file",
    link: `${URL}/file`
  },
  {
    key: "additionfile",
    link: `${URL}/additionfile`
  },
  {
    key: "profile",
    link: `${URL}/profile`
  }
];

export const uploadFileImage = async (upload, company_id, key, activity_id) => {
  try {
    console.log("FILE DATA", upload);
    let data = new FormData();
    const filterURL = urls.find(url => url.key === key);
    if (filterURL.key === "file" || filterURL.key === "additionfile") {
      let path = Platform.OS === "ios" ? upload.file : "file://" + upload.file;
      let splitName = upload.file.split("/");
      data.append("file", {
        uri: path,
        type: upload.type === "image" ? "image/jpeg" : "audio/x-acc",
        name: lastValueOfArray(splitName)
      });
      data.append("company_id", company_id);
    }
    if (filterURL.key === "profile") {
      const {
        userfile,
        first_name,
        last_name,
        address,
        phone,
        user_id
      } = upload;
      let path = Platform.OS === "ios" ? userfile : "file://" + userfile;
      let splitName = userfile.split("/");
      data.append("userfile", {
        uri: path,
        type: upload.type === "image" ? "image/jpeg" : "audio/x-acc",
        name: lastValueOfArray(splitName)
      });
      data.append("first_name", first_name);
      data.append("last_name", last_name);
      data.append("address", address);
      data.append("phone", phone);
      data.append("user_id", user_id);
    }

    data.append("type", upload.type);
    if (filterURL.key === "additionfile") {
      data.append("actyvity_id", activity_id);
    }
    console.log("UPLOADING PROCESS", data, filterURL.link);
    return Axios.post(filterURL.link, data)
      .then(success => {
        console.log("FILE UPLOAD", success);
        if (filterURL.key === "profile") {
          return success;
        }
        return upload.file;
      })
      .catch(error => {
        console.log("ERROR", error.status);
        return error.status;
      });
  } catch (e) {
    console.log("FILE UPLOAD ERROR", e);
  }
};

export const getSearchValueFromArray = (dataSources, key, value) => {
  if (value === "") {
    return dataSources;
  }
  const returnData = dataSources.filter(data => {
    if (!data[key]) {
      return data;
    }
    return data[key].match(value);
  });
  return returnData || [];
};

export const audioSources = [
  { value: 160, key: 0 },
  { value: 159, key: 1 },
  { value: 158, key: 2 },
  { value: 157, key: 3 },
  { value: 156, key: 4 },
  { value: 155, key: 5 },
  { value: 154, key: 6 },
  { value: 153, key: 7 },
  { value: 152, key: 8 },
  { value: 151, key: 9 },
  { value: 150, key: 10 },
  { value: 149, key: 11 },
  { value: 148, key: 12 },
  { value: 147, key: 13 },
  { value: 146, key: 14 },
  { value: 145, key: 15 },
  { value: 144, key: 16 },
  { value: 143, key: 17 },
  { value: 142, key: 18 },
  { value: 141, key: 19 },
  { value: 140, key: 20 },
  { value: 139, key: 21 },
  { value: 138, key: 22 },
  { value: 137, key: 23 },
  { value: 136, key: 24 },
  { value: 135, key: 25 },
  { value: 134, key: 26 },
  { value: 133, key: 27 },
  { value: 132, key: 28 },
  { value: 131, key: 29 },
  { value: 130, key: 30 },
  { value: 129, key: 31 },
  { value: 128, key: 32 },
  { value: 127, key: 33 },
  { value: 126, key: 34 },
  { value: 125, key: 35 },
  { value: 124, key: 36 },
  { value: 123, key: 37 },
  { value: 122, key: 38 },
  { value: 121, key: 39 },
  { value: 120, key: 40 },
  { value: 119, key: 41 },
  { value: 118, key: 42 },
  { value: 117, key: 43 },
  { value: 116, key: 44 },
  { value: 115, key: 45 },
  { value: 114, key: 46 },
  { value: 113, key: 47 },
  { value: 112, key: 48 },
  { value: 111, key: 49 },
  { value: 110, key: 50 },
  { value: 109, key: 51 },
  { value: 108, key: 52 },
  { value: 107, key: 53 },
  { value: 106, key: 54 },
  { value: 105, key: 55 },
  { value: 104, key: 56 },
  { value: 103, key: 57 },
  { value: 102, key: 58 },
  { value: 101, key: 59 },
  { value: 100, key: 60 },
  { value: 99, key: 61 },
  { value: 98, key: 62 },
  { value: 97, key: 63 },
  { value: 96, key: 64 },
  { value: 95, key: 65 },
  { value: 94, key: 66 },
  { value: 93, key: 67 },
  { value: 92, key: 68 },
  { value: 91, key: 69 },
  { value: 90, key: 70 },
  { value: 89, key: 71 },
  { value: 88, key: 72 },
  { value: 87, key: 73 },
  { value: 86, key: 74 },
  { value: 85, key: 75 },
  { value: 84, key: 76 },
  { value: 83, key: 77 },
  { value: 82, key: 78 },
  { value: 81, key: 79 },
  { value: 80, key: 80 },
  { value: 79, key: 81 },
  { value: 78, key: 82 },
  { value: 77, key: 83 },
  { value: 76, key: 84 },
  { value: 75, key: 85 },
  { value: 74, key: 86 },
  { value: 73, key: 87 },
  { value: 72, key: 88 },
  { value: 71, key: 89 },
  { value: 70, key: 90 },
  { value: 69, key: 91 },
  { value: 68, key: 92 },
  { value: 67, key: 93 },
  { value: 66, key: 94 },
  { value: 65, key: 95 },
  { value: 64, key: 96 },
  { value: 63, key: 97 },
  { value: 62, key: 98 },
  { value: 61, key: 99 },
  { value: 60, key: 100 },
  { value: 59, key: 101 },
  { value: 58, key: 102 },
  { value: 57, key: 103 },
  { value: 56, key: 104 },
  { value: 55, key: 105 },
  { value: 54, key: 106 },
  { value: 53, key: 107 },
  { value: 52, key: 108 },
  { value: 51, key: 109 },
  { value: 50, key: 110 },
  { value: 49, key: 111 },
  { value: 48, key: 112 },
  { value: 47, key: 113 },
  { value: 46, key: 114 },
  { value: 45, key: 115 },
  { value: 44, key: 116 },
  { value: 43, key: 117 },
  { value: 42, key: 118 },
  { value: 41, key: 119 },
  { value: 40, key: 120 },
  { value: 39, key: 121 },
  { value: 38, key: 122 },
  { value: 37, key: 123 },
  { value: 36, key: 124 },
  { value: 35, key: 125 },
  { value: 34, key: 126 },
  { value: 33, key: 127 },
  { value: 32, key: 128 },
  { value: 31, key: 129 },
  { value: 30, key: 130 },
  { value: 29, key: 131 },
  { value: 28, key: 132 },
  { value: 27, key: 133 },
  { value: 26, key: 134 },
  { value: 25, key: 135 },
  { value: 24, key: 136 },
  { value: 23, key: 137 },
  { value: 22, key: 138 },
  { value: 21, key: 139 },
  { value: 20, key: 140 },
  { value: 19, key: 141 },
  { value: 18, key: 142 },
  { value: 17, key: 143 },
  { value: 16, key: 144 },
  { value: 15, key: 145 },
  { value: 14, key: 146 },
  { value: 13, key: 147 },
  { value: 12, key: 148 },
  { value: 11, key: 149 },
  { value: 10, key: 150 },
  { value: 9, key: 151 },
  { value: 8, key: 152 },
  { value: 7, key: 153 },
  { value: 6, key: 154 },
  { value: 5, key: 155 },
  { value: 4, key: 156 },
  { value: 3, key: 157 },
  { value: 2, key: 158 },
  { value: 1, key: 159 },
  { value: 0, key: 160 }
];
