import { v4 as uuid } from "uuid";

export default function useArrayHook(parentIndex, parentHook, thisKey, defaultVal) {
  const { get: getParent, update: updateParent } = parentHook();
  const parent = getParent(parentIndex);

  const get = (index) => {
    return parent[thisKey][index];
  };

  const getAll = () => {
    return parent[thisKey];
  };

  const insert = (index = getAll().length) => {
    console.log("Inserting scoring option");
    const calc = [...getAll()];
    calc.splice(index, 0, { ...defaultVal, id: uuid() });
    updateParent(parentIndex, thisKey, calc);
    return calc;
  };

  const update = (index, key, val) => {
    const calc = getAll().map((k, i) =>
      i === index ? { ...k, [key]: val } : k
    );
    updateParent(parentIndex, thisKey, calc);
  };

  const formUpdate = (e, index) => {
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    update(index, e.target.id, value);
  };

  const remove = (index) => {
    updateParent(
      parentIndex,
      thisKey,
      getAll().filter((_k, i) => i !== index)
    );
  };
  return { get, getAll, insert, update, formUpdate, remove };
} 