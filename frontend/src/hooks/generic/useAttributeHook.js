export default function useAttributeHook(parentIndex, parentHook, thisKey) {
  const { get: getParent, update: updateParent } = parentHook();
  const parent = getParent(parentIndex);

  const get = (key) => {
    return parent[thisKey][key];
  };

  const getAll = () => {
    return parent[thisKey];
  };

  const update = (key, val) => {
    updateParent(parentIndex, thisKey, {...getAll(), [key]: val});
  };

  const formUpdate = (e) => {
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    update(e.target.id, value);
  };

  return { get, getAll, update, formUpdate };
} 