"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { emptyOnboardingState, type OnboardingState } from "@/lib/types";

const STORAGE_KEY = "startora.onboarding.v1";

type Action =
  | { type: "PATCH"; payload: Partial<OnboardingState> }
  | { type: "TOGGLE_ACTIVITY"; activity: string }
  | { type: "RESET" };

function reducer(state: OnboardingState, action: Action): OnboardingState {
  switch (action.type) {
    case "PATCH":
      return { ...state, ...action.payload };
    case "TOGGLE_ACTIVITY": {
      const has = state.activities.includes(action.activity);
      return {
        ...state,
        activities: has
          ? state.activities.filter((a) => a !== action.activity)
          : [...state.activities, action.activity],
      };
    }
    case "RESET":
      return emptyOnboardingState;
    default:
      return state;
  }
}

const OnboardingStateContext = createContext<OnboardingState | null>(null);
const OnboardingDispatchContext = createContext<Dispatch<Action> | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, emptyOnboardingState, (initial) => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      return raw ? { ...initial, ...(JSON.parse(raw) as OnboardingState) } : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // sessionStorage unavailable (private browsing, etc.) — draft just won't persist
    }
  }, [state]);

  return (
    <OnboardingStateContext.Provider value={state}>
      <OnboardingDispatchContext.Provider value={dispatch}>{children}</OnboardingDispatchContext.Provider>
    </OnboardingStateContext.Provider>
  );
}

export function useOnboardingState(): OnboardingState {
  const ctx = useContext(OnboardingStateContext);
  if (!ctx) throw new Error("useOnboardingState must be used within OnboardingProvider");
  return ctx;
}

export function useOnboardingActions() {
  const dispatch = useContext(OnboardingDispatchContext);
  if (!dispatch) throw new Error("useOnboardingActions must be used within OnboardingProvider");

  const patch = useCallback((payload: Partial<OnboardingState>) => dispatch({ type: "PATCH", payload }), [dispatch]);
  const toggleActivity = useCallback((activity: string) => dispatch({ type: "TOGGLE_ACTIVITY", activity }), [dispatch]);
  const reset = useCallback(() => dispatch({ type: "RESET" }), [dispatch]);

  return useMemo(() => ({ patch, toggleActivity, reset }), [patch, toggleActivity, reset]);
}
