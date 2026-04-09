/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

import { clearStoredSession, readStoredSession, writeStoredSession } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());

  function signIn(nextSession) {
    writeStoredSession(nextSession);
    setSession(nextSession);
  }

  function signOut() {
    clearStoredSession();
    setSession(null);
  }

  function updateUser(nextUser) {
    setSession((current) => {
      if (!current) {
        return current;
      }

      const nextSession = { ...current, user: nextUser };
      writeStoredSession(nextSession);
      return nextSession;
    });
  }

  const value = useMemo(
    () => ({
      session,
      token: session?.token || "",
      user: session?.user || null,
      isAuthenticated: Boolean(session?.token),
      signIn,
      signOut,
      updateUser,
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
