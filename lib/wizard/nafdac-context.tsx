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

const STORAGE_KEY = "startora.nafdac-wizard.v1";

export type ProductCategory = "Food" | "Cosmetics" | "Drugs" | "Medical Device" | "Chemicals" | "Packaged Water";
export type ProductOrigin = "local" | "imported";

export interface NafdacDocs {
  cacCertificate: boolean;
  trademarkApproval: boolean;
  healthCertificates: boolean;
  productLabel: boolean;
  formulaDocument: boolean;
  certificateOfAnalysis: boolean;
}

export interface NafdacWizardState {
  productCategory: ProductCategory;
  productName: string;
  origin: ProductOrigin;
  docs: NafdacDocs;
  manufacturingProcess: string;
  facilityAddress: string;
  inspectionDates: [string, string, string];
  contactPerson: string;
}

const initialState: NafdacWizardState = {
  productCategory: "Food",
  productName: "",
  origin: "local",
  docs: {
    cacCertificate: true,
    trademarkApproval: false,
    healthCertificates: false,
    productLabel: false,
    formulaDocument: false,
    certificateOfAnalysis: false,
  },
  manufacturingProcess: "",
  facilityAddress: "",
  inspectionDates: ["", "", ""],
  contactPerson: "",
};

type Action = { type: "PATCH"; payload: Partial<NafdacWizardState> } | { type: "TOGGLE_DOC"; key: keyof NafdacDocs };

function reducer(state: NafdacWizardState, action: Action): NafdacWizardState {
  switch (action.type) {
    case "PATCH":
      return { ...state, ...action.payload };
    case "TOGGLE_DOC":
      return { ...state, docs: { ...state.docs, [action.key]: !state.docs[action.key] } };
    default:
      return state;
  }
}

const StateContext = createContext<NafdacWizardState | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function NafdacWizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      return raw ? { ...initial, ...(JSON.parse(raw) as NafdacWizardState) } : initial;
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

export function useNafdacWizardState(): NafdacWizardState {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error("useNafdacWizardState must be used within NafdacWizardProvider");
  return ctx;
}

export function useNafdacWizardActions() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error("useNafdacWizardActions must be used within NafdacWizardProvider");
  const patch = useCallback((payload: Partial<NafdacWizardState>) => dispatch({ type: "PATCH", payload }), [dispatch]);
  const toggleDoc = useCallback((key: keyof NafdacDocs) => dispatch({ type: "TOGGLE_DOC", key }), [dispatch]);
  return useMemo(() => ({ patch, toggleDoc }), [patch, toggleDoc]);
}
