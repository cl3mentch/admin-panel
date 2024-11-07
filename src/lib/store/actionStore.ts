import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

export type ActionDataState = {
  actions: {
    delete: boolean;
  };
};

export type ActionDataAction = {
  setAction: (actions: Partial<ActionDataState["actions"]>) => void;
};

export type ActionDataStore = ActionDataState & ActionDataAction;

export const defaultInitState: ActionDataState = {
  actions: {
    delete: false,
  },
};

// Adapter to make localStorage compatible with PersistStorage
const localStorageAdapter: PersistStorage<ActionDataStore> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useActionStore = create<ActionDataStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setAction: (actionUpdate: Partial<ActionDataState["actions"]>) =>
        set((state) => ({
          actions: { ...state.actions, ...actionUpdate },
        })),
    }),
    {
      name: "storeActionInfo",
      storage: localStorageAdapter, // Use the adapter here
    }
  )
);
