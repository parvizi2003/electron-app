import keytar from "keytar";

const SERVICE_NAME = "MyElectronApp";
const ACCOUNT_NAME = "auth-token";

export async function setToken(token: string) {
  await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, token);
}

export async function getToken() {
  return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
}

export async function deleteToken() {
  return await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
}
