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
