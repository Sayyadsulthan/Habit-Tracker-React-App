export const getFormbody = (params) => {
  const formBody = [];

  for (let property in params) {
    // params={ user:'sayyad'}
    let encodekey = encodeURIComponent(property); //key => username => user&20name;
    let encodeval = encodeURIComponent(params[property]); // val => 'sayyad' => sayyad 123 => sayyad%123;

    formBody.push(encodekey + "=" + encodeval);
  }

  return formBody.join("&");
};
