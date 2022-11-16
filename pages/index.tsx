import assert from "assert";
import { createContext, useCallback, useEffect, useState } from "react";

interface Track {
  imageURL: string;
  name: string;
  artistName: string;
}

interface Artist {
  imageURL: string;
  name: string;
}

interface contextInterface {
  token: string;
  range: string;
  setRange: (range: string) => void;
}

export const Context = createContext<contextInterface | null>(null);

export default function Home() {
  const [token, setToken] = useState<string>("");
  const [range, setrange] = useState<string>("medium_range");

  const setRange = useCallback((newRange: string): void => setrange(newRange), [range]);

  useEffect(() => {
    const hash: string = window.location.hash;
    let token: string | null | undefined = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        ?.substring(1)
        ?.split("&")
        ?.find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token as string);
    }

    setToken(token as string);
  }, []);

  return (
    <Context.Provider
      value={{
        token,
        range,
        setRange,
      }}
    >
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Context.Provider>
  );
}
