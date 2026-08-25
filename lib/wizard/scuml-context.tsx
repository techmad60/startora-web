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

const STORAGE_KEY = "startora.scuml-wizard.v1";

export type ScumlCategory =
  | "Real Estate"
  | "Hotel & Hospitality"
  | "Car Dealership"
  | "Supermarket / Retail"
  | "Professional Services"
  | "Jewellery / Luxury Goods"
  | "NGO / Non-profit";

export interface ScumlWizardState {
  category: ScumlCategory;
  tin: string;
  bvn: string;
  bankName: string;
  accountNumber: string;
  validIdUploaded: boolean;
}

const initialState: ScumlWizardState = {
  category: "Real Estate",
  tin: "",
  bvn: "",
  bankName: "",
  accountNumber: "",
  validIdUploaded: false,
};

type Action = { type: "PATCH"; payload: Partial<ScumlWizardState> } | { type: "TOGGLE_ID" };

function reducer(state: ScumlWizardState, action: Action): ScumlWizardState {
  switch (action.type) {
    case "PATCH":
      return { ...state, ...action.payload };
    case "TOGGLE_ID":
      return { ...state, validIdUploaded: !state.validIdUploaded };
    default:
      return state;
  }
}

const StateContext = createContext<ScumlWizardState | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function ScumlWizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      return raw ? { ...initial, ...(JSON.parse(raw) as ScumlWizardState) } : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // sessionStorage unavailable — draft just won't persist
    }
  }, [state]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useScumlWizardState(): ScumlWizardState {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error("useScumlWizardState must be used within ScumlWizardProvider");
  return ctx;
}

export function useScumlWizardActions() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error("useScumlWizardActions must be used within ScumlWizardProvider");
  const patch = useCallback((payload: Partial<ScumlWizardState>) => dispatch({ type: "PATCH", payload }), [dispatch]);
  const toggleId = useCallback(() => dispatch({ type: "TOGGLE_ID" }), [dispatch]);
  return useMemo(() => ({ patch, toggleId }), [patch, toggleId]);
}
