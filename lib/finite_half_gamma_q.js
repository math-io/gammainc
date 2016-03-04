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

var erfc = require( 'math-erfc' );
var exp = require( 'math-exp' );
var PI = require( 'const-pi' );
var sqrt = require( 'math-sqrt' );


// FINITE HALF GAMMA Q //

/**
* FUNCTION: finite_half_gamma_q( a, x )
*	Calculates normalised Q when a is a half-integer.
*
* @param {Number} a - function parameter
* @param {Number} x - function parameter
* @returns {Number} upper gamma fraction
*/
function finite_half_gamma_q( a, x ) {
	var e;
	var half;
	var n;
	var sum;
	var term;

	e = erfc( sqrt(x) );
	if ( (e !== 0) && (a > 1) ) {
		term = exp( -x ) / sqrt( PI * x );
		term *= x;
		half = 1 / 2;
		term /= half;
		sum = term;
		for( n = 2; n < a; ++n ) {
			term /= n - half;
			term *= x;
			sum += term;
		}
		e += sum;
	}
	return e;
} // end FUNCTION finite_half_gamma_q()


// EXPORTS //

module.exports = finite_half_gamma_q;
