import React from "react";
import {
  useQuestion,
  useValidation,
  useScoring,
} from "../../hooks/useSurveyBuilder";
import { useFocus } from "../../hooks/useFocus";

export default function QuestionOptions() {
  const { index } = useFocus();
  const { get: getQuestion, formUpdate } = useQuestion();
  const question = getQuestion(index);
  return (
    <>
      <select
        id="type"
        value={question.type}
        onChange={(e) => formUpdate(e, index)}
        className="px-4 py-2 text-gray-800 rounded-lg outline-none border transition duration-100 hover:bg-violet-50 hover:border-violet-200 focus:bg-white focus:border-violet-500"
      >
        <option className="font-semibold" value="Numeric">
          Numeric
        </option>
        <option className="font-semibold" value="Single-Choice">
          Single Choice
        </option>
      </select>
      <Options />
    </>
  );
}

const Options = () => {
  const { index } = useFocus();
  const { get: getQuestion } = useQuestion();
  const question = getQuestion(index);
  const type = question.type;

  switch (type) {
    case "Numeric":
      return (
        <ul className="space-y-4">
          <li>
            <ValidationOptions type={type} />
          </li>
          <li>
            <ScoringOptions type={type} />
          </li>
        </ul>
      );
    case "Single-Choice":
      return (
        <ul className="space-y-4">
          <li>
            <ScoringOptions type={type} />
          </li>
        </ul>
      );
    default:
      return <></>;
  }
};

const ValidationOptions = () => {
  const { index } = useFocus();
  const { get: getQuestion, formUpdate: updateQuestion } = useQuestion();
  const { getAll: getValidation, formUpdate: updateValidation } =
    useValidation(index);
  const question = getQuestion(index);
  const applyValidation = question.applyValidation;
  const type = question.type;
  const validation = getValidation();

  switch (type) {
    case "Numeric":
      return (
        <div
          className={`w-full flex flex-col bg-white rounded-md text-gray-800`}
        >
          <div className="flex justify-between p-4 items-center rounded-md">
            <label className="text-gray-800" htmlFor="applyValidation">
              Apply Validation
            </label>
            <input
              id="applyValidation"
              type="checkbox"
              className=""
              checked={question.applyValidation}
              onChange={(e) => updateQuestion(e, index)}
            />
          </div>
          {applyValidation && (
            <ul className="p-4 pt-2">
              <li>
                <label htmlFor="minNum">Minimum Value</label>
                <input
                  id="minNum"
                  type="number"
                  className="input"
                  value={validation.minNum || ""}
                  onChange={(e) => updateValidation(e)}
                />
                <label htmlFor="maxNum">Maximum Value</label>
                <input
                  id="maxNum"
                  type="number"
                  className="input"
                  value={validation.maxNum || ""}
                  onChange={(e) => updateValidation(e)}
                />
              </li>
            </ul>
          )}
        </div>
      );
    default:
      return <></>;
  }
};

const ScoringOptions = () => {
  const { index } = useFocus();
  const { get: getQuestion, formUpdate: updateQuestion } = useQuestion();
  const {
    get: getScoring,
    getAll: getAllScoring,
    formUpdate: updateScoring,
    insert: insertScoring,
  } = useScoring(index);
  const question = getQuestion(index);
  const type = question.type;
  const applyScoring = question.applyScoring;
  const scoringOptions = getAllScoring();

  console.log(scoringOptions);

  switch (type) {
    case "Numeric":
      return (
        <div
          className={`w-full flex flex-col bg-white rounded-md text-gray-800`}
        >
          <div className="flex justify-between p-4 items-center rounded-md">
            <label className="text-gray-800" htmlFor="applyScoring">
              Apply Scoring
            </label>
            <input
              id="applyScoring"
              type="checkbox"
              className=""
              checked={question.applyScoring}
              onChange={(e) => updateQuestion(e, index)}
            />
          </div>
          {applyScoring && (
            <div className="p-4 pt-2">
              <label htmlFor="scoringWeight">Question Weight</label>
              <input
                id="scoringWeight"
                type="number"
                className="input"
                value={question.scoringWeight || ""}
                onChange={(e) => updateQuestion(e, index)}
              />
              <ul className="pt-2 list-none">
                {scoringOptions.map((o, i) => (
                  <li key={o.id}>
                    <div className="flex items-center ">
                      <p className="p-0 wrao">If score is</p>
                      <select
                        id="sign"
                        value={getScoring(i).sign || "$eq"}
                        onChange={(e) => updateScoring(e, i)}
                        className="bg-gray-100"
                      >
                        <option value="$eq">=</option>
                        <option value="$gte">{">="}</option>
                        <option value="$gt">{">"}</option>
                        <option value="$lte">{"<="}</option>
                        <option value="$lt">{"<"}</option>
                      </select>
                      <input
                        id="val_1"
                        value={getScoring(i).val_1 || ''}
                        className="input"
                        type="number"
                        placeholder=''
                        onChange={(e) => updateScoring(e, i)}
                      />
                    </div>
                    <div className="flex items-center  ">
                      <p>Then give</p>
                      <input
                        id="score"
                        value={getScoring(i).score || ''}
                        className="input"
                        type="number"
                        placeholder=''
                        onChange={(e) => updateScoring(e, i)}
                      />
                      <p>%</p>
                    </div>
                  </li>
                ))}
                <li>
                  <button className="btn-fill w-full" onClick={insertScoring}>
                    + Add Option
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      );
    case "Single-Choice":
      return <></>;
    default:
      return <></>;
  }
};
