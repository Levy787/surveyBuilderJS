import React, { createContext, useReducer, useContext } from "react";

const defaultState = null;

const ACTIONS = {
  SET_INDEX: "SET_INDEX",
  REMOVE_INDEX: "REMOVE_INDEX",
};

const FocusContext = createContext();

const focusReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_INDEX:
      return action.payload;
    case ACTIONS.REMOVE_INDEX:
      return null;
    default:
      return state;
  }
}

export function FocusProvider({ children }) {
  const [state, dispatch] = useReducer(focusReducer, defaultState);

  const setIndex = (index) => {
    dispatch({
      type: ACTIONS.SET_INDEX,
      payload: index,
    });
  };

  const removeIndex = () => {
    dispatch({
      type: ACTIONS.REMOVE_INDEX,
    });
  };

  return (
    <FocusContext.Provider
      value={{
        state,
        setIndex,
        removeIndex,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};

export function useFocusContext() {
  const context = useContext(FocusContext);
  if (!context) {
    throw Error(
      "useFocusContext must be used inside an FocusContext."
    );
  }
  return context;
}