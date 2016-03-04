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

var exp = require( 'math-exp' );


// FINITE GAMMA Q //

/**
* FUNCTION: finite_gamma_q( a, x )
*	Calculates normalised Q when a is an integer.
*
* @param {Number} a - function parameter
* @param {Number} x - function parameter
* @returns {Number} upper gamma fraction
*/
function finite_gamma_q( a, x ) {
	var e = exp( -x );
	var sum = e;
	var term;
	var n;
	if ( sum !== 0 ) {
		term = sum;
		for ( n = 1; n < a; ++n ){
			term /= n;
			term *= x;
			sum += term;
		}
	}
	return sum;
} // end FUNCTION finite_gamma_q()


// EXPORTS //

module.exports = finite_gamma_q;
