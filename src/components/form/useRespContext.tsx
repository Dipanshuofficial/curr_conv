import { useContext } from "react";
import { RespContext } from "./context";

export function useRespContext() {
  const context = useContext(RespContext);
  if (context === null) {
    throw new Error("useRespContext must be used within a RespContextProvider");
  }
  return context;
}
