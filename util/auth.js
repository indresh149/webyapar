import axios from "axios";

async function authenticate(mode, email, password) {
  const url = `https://test.webyaparsolutions.com/auth/user/${mode}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    //returnSecureToken: true,
  });

  //const token = JSON.stringify(response.data.token);

  const tokenWithBearer = response.data.token; // Token with "Bearer" text

// Splitting the token string by space and taking the second part (the token itself)
const token = tokenWithBearer.split(' ')[1];


  const tokenStatus = response.data.success;

  console.log("tokenStatus", tokenStatus);
  console.log("token", token)

  return { token, tokenStatus };

  //return token;
}

async function authcreate(mode, name, email, password) {
  const url = `https://test.webyaparsolutions.com/auth/user/${mode}`;

  const response = await axios.post(url, {
    name: name,

    email: email,

    password: password,
  });
  console.log("signup ka response", response.data.success)

  const token = response.data.success;

  // console.log(token);

  return token;
}

export function createUser(name, email, password) {
  return authcreate("signup", name, email, password);
}

export function login(email, password) {
  return authenticate("login", email, password);
}
