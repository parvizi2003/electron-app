import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../api-instance";

interface LangFile {
  login: {
    title: string;
    description: string;
    email: {
      label: string;
      placeholder: string;
      required: string;
      invalid: string;
    };
    password: {
      label: string;
      placeholder: string;
      required: string;
      invalid: string;
    };
    submit: string;
  };
  navbar: {
    home: string;
    orders: string;
  };
  cart: {
    title: string;
    empty: string;
    total: string;
    checkout: string;
  };
  buttons: {
    add: string;
    checkout: string;
    cancel: string;
    confirm: string;
    delete: string;
    clear: string;
    edit: string;
  };
}

const RESOURCE = "/lang";

export const langApi = {
  baseKey: RESOURCE,
  get: (locale: string) => {
    return queryOptions({
      queryKey: [langApi.baseKey, "ru"],
      queryFn: (meta) =>
        jsonApiInstance<LangFile>(`${RESOURCE}/${locale}`, {
          signal: meta.signal,
        }),
    });
  },
};
