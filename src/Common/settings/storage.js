import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true
});

export const storageSave = (keyName, data) =>
  storage.save({
    key: keyName,
    data,
    expires: null
  });

async function loadStorage(keyName) {
  const data = await storage.load({
    key: keyName,
    autoSync: true,
    syncInBackground: true
  });
  return data;
}

async function clearStorage() {
  const data = await AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => console.log("success remove all keys"));
  return data;
}
export { loadStorage, clearStorage };

export default storage;
