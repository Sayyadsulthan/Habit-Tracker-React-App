// export const getFormbody = (params) => {
//   const formBody = [];

//   for (let property in params) {
//     // params={ user:'sayyad'}
//     let encodekey = encodeURIComponent(property); //key => username => user&20name;
//     let encodeval = encodeURIComponent(params[property]); // val => 'sayyad' => sayyad 123 => sayyad%123;

//     formBody.push(encodekey + "=" + encodeval);
//   }

//   return formBody.join("&");
// };

export const getFormbody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); //'user name' => 'user&20name'
    let encodedValue = encodeURIComponent(params[property]); //aakash 123 => aaksh%20123

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&"); // 'username=aakash&password=123'
};

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.log("empty in key or value in utils ");
  }

  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;

  window.localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.log("cannot give the value from local storage");
  }

  return window.localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.log("cannot remove the value from local storage");
  }

  window.localStorage.removeItem(key);
};
