'use strict';

/**
* NOTE: the original C++ code and copyright notice is from the [Boost library]{http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/**
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

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
