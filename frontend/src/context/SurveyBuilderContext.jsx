import React, { createContext, useReducer, useContext } from "react";

const defaultState = {
  title: "",
  questions: [],
};

const SurveyBuilderContext = createContext();

const ACTIONS = {
  UPDATE: "UPDATE",
};

const surveyBuilderReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

export function SurveyBuilderProvider({ children }) {
  const [state, dispatch] = useReducer(surveyBuilderReducer, defaultState);

  const update = (key, value) => {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: { key, value },
    });
  };

  return (
    <SurveyBuilderContext.Provider
      value={{
        state,
        update,
      }}
    >
      {children}
    </SurveyBuilderContext.Provider>
  );
};

export function useSurveyBuilderContext() {
  const context = useContext(SurveyBuilderContext);
  if (!context) {
    throw Error(
      "useSurveyBuilderContext must be used inside an SurveyBuilderContext."
    );
  }
  return context;
};
