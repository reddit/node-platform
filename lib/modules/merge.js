import { isPlainObject } from 'lodash/lang';
import { isEmpty } from 'lodash/lang';

export default function merge(state, stateDiff, options={}) {
  const {
    emptyDict='strict',
    array='replace',
  } = options;

  // Empty state diffs get special handling. In 'replace' mode they should be
  // overwriting the current state. In 'skip' mode, we should be 'skipping'
  // the merge of any objects, and return the current state. In 'strict' mode (default)
  // we should still be creating a new object.
  if (!Object.keys(stateDiff).length) {
    if (emptyDict === 'replace') {
      return stateDiff;
    } else if (emptyDict === 'skip') {
      return state;
    }
  }

  const newState = { ...state };

  Object.keys(stateDiff).forEach(key => {
    const oldVal = newState[key];
    const newVal = stateDiff[key];
    const newValIsEmpty = isEmpty(newVal);

    if (isPlainObject(oldVal) && isPlainObject(newVal)) {
      if (newValIsEmpty && emptyDict === 'skip') {
        newState[key] = oldVal;
      } else if (newValIsEmpty && emptyDict === 'replace') {
        newState[key] = newVal;
      } else {
        newState[key] = merge(oldVal, newVal, options);
      }
    } else if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      if (array === 'concat') {
        if (!newVal.length) {
          newState[key] = oldVal;
        } else {
          newState[key] = oldVal.concat(newVal);
        }
      } else {
        newState[key] = newVal;
      }
    } else {
      newState[key] = newVal;
    }
  });

  return newState;
}
