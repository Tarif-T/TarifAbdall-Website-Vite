/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

import { clearStoredSession, readStoredSession, writeStoredSession } from "../api";

const AuthContext = createContext(null);

// Provides authentication state and actions to the app tree.
export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());

  // Persists and applies a new signed-in session.
  function signIn(nextSession) {
    writeStoredSession(nextSession);
    setSession(nextSession);
  }

  // Clears session state and removes persisted auth data.
  function signOut() {
    clearStoredSession();
    setSession(null);
  }

  // Updates the signed-in user profile without losing the token.
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

// Returns the auth context and enforces provider usage.
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
