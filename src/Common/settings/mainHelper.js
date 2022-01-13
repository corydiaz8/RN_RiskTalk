export const saveDataTemporaryAndNavigate = (
  referenceFunction,
  keyName,
  data,
  navigate,
  route
) => {
  return new Promise((resolve, reject) => {
    referenceFunction(keyName, data, resolve, reject);
  })
    .then(() => {
      navigate(route);
    })
    .catch(error => {
      console.log("ERROR", error);
    });
};
