import { isPlainObject } from 'lodash/lang';

export default function merge(state, stateDiff) {
  const newState = { ...state };

  Object.keys(stateDiff).forEach(key => {
    if (isPlainObject(newState[key]) && isPlainObject(stateDiff[key])) {
      newState[key] = merge(newState[key], stateDiff[key]);
    } else {
      newState[key] = stateDiff[key];
    }
  });

  return newState;
}
