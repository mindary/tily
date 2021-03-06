import {Func} from '../typings/types';

interface Once {
  <F extends Func>(fn: F): F;
}

/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var addOneOnce = once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */
export const once = (<F extends Func>(fn: F) => {
  let called = false;
  let result;

  return (...args) => {
    if (called) {
      return result;
    }

    result = fn(...args);
    called = true;

    return result;
  };
}) as Once;

export default once;
