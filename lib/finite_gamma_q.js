'use strict';

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
