// RespContextProvider.tsx
import React, { createContext, useState } from "react";

export interface ResponseType {
  from: string;
  to: string;
  amt: number;
  response: number;
  last_updated_at: string;
}

export const RespContext = createContext<RespContextType | null>(null);

type RespContextProviderProps = {
  children: React.ReactNode;
};

export type RespContextType = {
  response: ResponseType;
  setResponse: React.Dispatch<React.SetStateAction<ResponseType>>;
};

export default function RespContextProvider({
  children,
}: RespContextProviderProps) {
  const [response, setResponse] = useState<ResponseType>({
    from: "USD",
    to: "INR",
    amt: 1,
    response: -1,
    last_updated_at: "",
  });

  return (
    <RespContext.Provider value={{ response, setResponse }}>
      {children}
    </RespContext.Provider>
  );
}
