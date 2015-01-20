'use strict';

/**
 * Returns a function that wraps input values such that [0 <= x < size].
 * Useful for carousels etc, where one should be able to click right
 * and end up in the beginning. Uses the correct modulo operation, not
 * the javascript style.
 * @param   {int} size  The range size, usually the length of an array.
 * @returns {function}  The wrapping function.
 */
exports.wrap = function (size) {
    return function (value) {
        return (value % size + size) % size;
    };
};

/**
 * Returns a function that limits input values to range [min <= x <= max].
 * Useful for carousels etc without wrapping around (compare `wrap`).
 * Swapping min and max is allowed and will be corrected.
 * @param  {int} min    The range minimum (optional).
 * @param  {int} max    The range maximum, inclusive.
 * @return {function}   The function that limits its input to the specified range.
 */
exports.clamp = function (min, max) {
    // Set min to 0 if only one value specified
    if (typeof max === 'undefined') {
        max = min;
        min = 0;
    }

    // Swap min and max if required
    if (min > max) {

        var tmp = min;
        min = max;
        max = tmp;
    }

    return function (value) {
        return Math.min(Math.max(value, min), max);
    };
};

/**
 * Returns a function that always returns the same value.
 * @param  {Object} value   The value to return.
 * @return {function}       A function that always returns `value`.
 */
exports.constant = function (value) {
    return function () {
        return value;
    };
};
