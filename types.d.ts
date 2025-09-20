type EventPayloadMapping = {
  getToken: string | null;
  setToken: boolean;
  deleteToken: boolean;
};

interface Window {
  electron: {
    getToken: () => Promise<string | null>;
    setToken: (token: string) => Promise<boolean>;
    deleteToken: () => Promise<Boolean>;
  };
}
