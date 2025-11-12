import keytar from "keytar";

const SERVICE_NAME = "MyElectronApp";

export async function setToken(name: string, token: string) {
  await keytar.setPassword(SERVICE_NAME, name, token);
}

export async function getToken(name: string) {
  return await keytar.getPassword(SERVICE_NAME, name);
}

export async function deleteToken(name: string) {
  return await keytar.deletePassword(SERVICE_NAME, name);
}
