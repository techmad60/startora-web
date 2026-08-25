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
import type { CacWizardState, PersonDocs, Shareholder, Witness } from "@/lib/types";

const STORAGE_KEY = "startora.cac-wizard.v1";

type Action =
  | { type: "ADD_SHAREHOLDER"; shareholder: Shareholder }
  | { type: "ADD_WITNESS"; witness: Witness }
  | { type: "SET_PERSON_DOCS"; personId: string; docs: PersonDocs }
  | { type: "RESET" };

const StateContext = createContext<CacWizardState | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

interface CacWizardProviderProps {
  children: ReactNode;
  /** Seed data fetched server-side (see registration/cac/layout.tsx) via lib/api.ts, not imported from mocks directly — this Provider is a Client Component and can't await. */
  defaultShareholders: Shareholder[];
}

export function CacWizardProvider({ children, defaultShareholders }: CacWizardProviderProps) {
  const initialState: CacWizardState = useMemo(
    () => ({ shareholders: defaultShareholders, witnesses: [], docsByPersonId: {} }),
    [defaultShareholders],
  );

  const reducer = useCallback(
    (state: CacWizardState, action: Action): CacWizardState => {
      switch (action.type) {
        case "ADD_SHAREHOLDER":
          return { ...state, shareholders: [...state.shareholders, action.shareholder] };
        case "ADD_WITNESS":
          return { ...state, witnesses: [...state.witnesses, action.witness] };
        case "SET_PERSON_DOCS":
          return { ...state, docsByPersonId: { ...state.docsByPersonId, [action.personId]: action.docs } };
        case "RESET":
          return initialState;
        default:
          return state;
      }
    },
    [initialState],
  );

  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CacWizardState) : initial;
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

export function useCacWizardState(): CacWizardState {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error("useCacWizardState must be used within CacWizardProvider");
  return ctx;
}

export function useCacWizardActions() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error("useCacWizardActions must be used within CacWizardProvider");

  const addShareholder = useCallback((shareholder: Shareholder) => dispatch({ type: "ADD_SHAREHOLDER", shareholder }), [dispatch]);
  const addWitness = useCallback((witness: Witness) => dispatch({ type: "ADD_WITNESS", witness }), [dispatch]);
  const setPersonDocs = useCallback(
    (personId: string, docs: PersonDocs) => dispatch({ type: "SET_PERSON_DOCS", personId, docs }),
    [dispatch],
  );

  return useMemo(() => ({ addShareholder, addWitness, setPersonDocs }), [addShareholder, addWitness, setPersonDocs]);
}
