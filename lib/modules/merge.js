import { isPlainObject } from 'lodash/lang';
import { isEmpty } from 'lodash/lang';

export default function merge(state, stateDiff, options={}) {
  const newState = { ...state };

  const {
    emptyDict='strict',
    array='replace',
  } = options;

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
