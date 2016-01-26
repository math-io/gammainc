'use strict';

// MODULES //

var abs = require( 'math-abs' );
var exp = require( 'math-exp' );
var gamma = require( 'math-gamma' );
var gammaln = require( 'math-gammaln' );
var ln = require( 'math-ln');


// VARIABLES //

var EPSILON = 1e-12;


// INCOMPLETE GAMMA FUNCTION //

/**
* FUNCTION: gammainc( x, s, regularized, upper )
*	Computes the regularized incomplete gamma function. The upper tail is calculated via the modified Lentz's method
*	for computing continued fractions, the lower tail using a power expansion.
*
* @param {Number} x - function parameter
* @param {Number} s - function parameter
* @param {Boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @param {Boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete gamma function
* @returns {Number} function value
*/
function gammainc( x, s, regularized, upper ) {
	if ( !upper ) {
		// Default case: Lower tail
		if ( x === 0 ) {
			return 0;
		}
		if ( x < 0 || s <= 0 ) {
			return NaN;
		}
		if( x > 1.1 && x > s ) {
			if ( regularized !== false ) {
				return 1 - gammainc( x, s, regularized, true );
			} else {
				return gamma( s ) - gammainc( x, s, regularized, true );
			}
		}
		var ft,
			r = s,
			c = 1,
			pws = 1;
		if ( regularized !== false ) {
			ft = s * ln( x ) - x - gammaln( s );
		} else {
			ft = s * ln( x ) - x;
		}
		ft = exp( ft );
		do {
			r += 1;
			c *= x/r;
			pws += c;
		} while ( c / pws > EPSILON );
		return pws*ft/s;
	}
	// Case: Upper tail
	if ( x <= 1.1 || x <= s ) {
		if ( regularized !== false ) {
			return 1 - gammainc( x, s, regularized, false );
		} else {
			return gamma( s ) - gammainc( x, s, regularized, false );
		}
	}
	var f = 1 + x - s,
		C = f,
		D = 0,
		i = 1,
		a, b, chg;
	for ( i = 1; i < 10000; i++ ) {
		a = i * (s - i);
		b = (i<<1) + 1 + x - s;
		D = b + a * D;
		C = b + a / C;
		D = 1 / D;
		chg = C * D;
		f *= chg;
		if ( abs( chg - 1 ) < EPSILON ) {
			break;
		}
	}
	if ( regularized !== false ) {
		return exp(s * ln( x ) - x - gammaln( s ) - ln(f) );
	} else {
		return exp(s * ln( x ) - x - ln(f) );
	}
} // end FUNCTION gammainc()


// EXPORTS //

module.exports = gammainc;
