import isReactElement from './reactElement';
import isReactComponent from './reactComponent';
import isObject from './object';

/**
 * Returns whether a value is a plain object
 * (an object that is created using an object literal, Object.create(null) or similar).
 * Rejects anything with a custom prototype or a non-object ECMAScript type.
 * Also rejects React elements and components
 *
 * **Note:** if the host environment does not support Symbol, any object with a $$typeof
 * property is considered a React element
 *
 * @param {*} test The value to check
 * @returns {boolean} Returns `true` if `test` is a plain object, else `false`.
 * @example
 *
 * isPlainObject({ a: 'test' }); // => true
 *
 * isPlainObject(moment()); // => false
 *
 * isPlainObject(<span></span>); // => false
 */
export const isPlainObject = function isPlainObject(test): test is Record<any, any> {
  if (!isObject(test)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(test);

  if (prototype === null) {
    // objects created with Object.create(null) are still plain objects
    return true;
  }

  if (prototype !== Object.prototype) {
    // has a custom prototype, probably was created with a custom constructor,
    // may contain internal data that's not meant to be accessed from outside
    return false;
  }

  if (isReactElement(test) || isReactComponent(test)) {
    // react elements _are_ plain objects, but we don't treat them like that
    // (e.g. in recursive merges)
    return false;
  }

  return true;
};

export default isPlainObject;
