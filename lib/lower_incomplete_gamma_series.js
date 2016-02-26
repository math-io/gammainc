'use strict';

// LOWER INCOMPLETE GAMMA SERIES //

/**
* FUNCTION: lower_incomplete_gamma_series( a1, z1 )
*	Creates a function to evaluate a series expansion of the incomplete gamma function.
*
* @param {Number} a1 - function parameter
* @param {Number} z1 - function parameter
* @returns {Function} series function
*/
function lower_incomplete_gamma_series( a1, z1 ) {
	var a = a1;
	var z = z1;
	var result = 1;
	return function() {
		var r = result;
		a += 1;
		result *= z/a;
		return r;
	};
} // end FUNCTION lower_incomplete_gamma_series()


// EXPORTS //

module.exports = lower_incomplete_gamma_series;
