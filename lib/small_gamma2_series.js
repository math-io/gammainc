'use strict';

/**
* FUNCTION: small_gamma2_series( a, x )
*	Series representation for upper fraction when z is small.
*
* @param {Number} a - function parameter
* @param {Number} x - function parameter
* @returns {Function}  series function
*/
function small_gamma2_series( a, x ) {
	var result = -x;
	var apn = a + 1;
	var n = 1;
	var r;

	return function() {
		r = result / apn;
		result *= x;
		result /= ++n;
		apn += 1;
		return r;
	};
} // end FUNCTION small_gamma2_series()


// EXPORTS //

module.exports = small_gamma2_series;
