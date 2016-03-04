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

// MODULES //

var continued_fraction = require( 'math-continued-fraction' );


// FUNCTIONS //

var upper_incomplete_gamma_fract = require( './upper_incomplete_gamma_fract' );


// UPPER GAMMA FRACTION //

/**
* FUNCTION: lower_incomplete_gamma_series( a, z )
*	Evaluate the lower incomplete gamma integral via a series expansion and divide by gamma(z) to normalise.
*
* @param {Number} a - function parameter
* @param {Number} z - function parameter
* @returns {Number} function value
*/
function upper_gamma_fraction( a, z ) {
	var f = upper_incomplete_gamma_fract( a, z );
	return 1 / ( z - a + 1 + continued_fraction( f ) );
} // end FUNCTION upper_gamma_fraction()


// EXPORTS //

module.exports = upper_gamma_fraction;
