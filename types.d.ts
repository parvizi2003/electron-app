type EventPayloadMapping = {
  getToken: string | null;
  setToken: boolean;
  deleteToken: boolean;
};

interface Window {
  electron: {
    getToken: (name: string) => Promise<string | null>;
    setToken: (name: string, token: string) => Promise<boolean>;
    deleteToken: (name: string) => Promise<Boolean>;
  };
}
