import { useFocusContext } from "../context/FocusContext";

export function useFocus() { 
  const { state, setIndex, removeIndex } = useFocusContext();

  const focus = (e = null, index) => {
    e && e.stopPropagation();
    setIndex(index);
  };

  const unfocus = (e = null) => {
    e && e.stopPropagation();
    removeIndex();
  };

  return { index: state, focus, unfocus };
}
