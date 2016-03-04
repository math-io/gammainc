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

var abs = require( 'math-abs' );
var floor = require( 'math-floor' );
var gamma = require( 'math-gamma' );
var ln = require( 'math-ln');


// FUNCTIONS //

var finite_gamma_q = require( './finite_gamma_q.js' );
var finite_half_gamma_q = require( './finite_half_gamma_q.js' );
var full_igamma_prefix = require( './full_igamma_prefix.js' );
var igamma_temme_large = require( './igamma_temme_large.js' );
var lower_gamma_series = require( './lower_gamma_series.js' );
var regularised_gamma_prefix = require( './regularised_gamma_prefix.js' );
var tgamma_small_upper_part = require( './tgamma_small_upper_part.js' );
var upper_gamma_fraction = require( './upper_gamma_fraction.js' );


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
function gammainc( x, a, regularized, upper ) {
	if ( x < 0 || a <= 0 ) {
		return NaN;
	}
	var normalised = ( regularized !== undefined ) ? regularized : true;
	var invert = upper ? true : false;
	var eval_method;
	var fa;
	var gam;
	var result = 0;
	var sigma;
	var is_int;
	var is_half_int;
	var is_small_a = (a < 30) && (a <= x + 1);
	var use_temme;
	if ( is_small_a ) {
		fa = floor( a );
		is_int = ( fa === a );
		is_half_int = is_int ? false : ( abs( fa - a ) === 0.5 );
	} else {
		is_int = is_half_int = false;
	}

	if ( is_int && x > 0.6 )
	{
		// calculate Q via finite sum:
		invert = !invert;
		eval_method = 0;
	}
	else if( is_half_int && x > 0.2 )
	{
		// calculate Q via finite sum for half integer a:
		invert = !invert;
		eval_method = 1;
	}
	else if ( x < 0.5 )
	{
		// Changeover criterion chosen to give a changeover at Q ~ 0.33
		if ( -0.4 / ln( x ) < a ) {
			eval_method = 2;
		} else {
			eval_method = 3;
		}
	}
	else if ( x < 1.1 )
	{
		// Changover here occurs when P ~ 0.75 or Q ~ 0.25:
		if( x * 0.75 < a ) {
			eval_method = 2;
		} else {
			eval_method = 3;
		}
	}
	else
	{
		/* Begin by testing whether we're in the "bad" zone
		where the result will be near 0.5 and the usual
		series and continued fractions are slow to converge: */
		use_temme = false;
		if ( normalised && a > 20 ) {
			sigma = abs( (x-a)/a );
			if ( a > 200 ) {
				//
				// This limit is chosen so that we use Temme's expansion
				// only if the result would be larger than about 10^-6.
				// Below that the regular series and continued fractions
				// converge OK, and if we use Temme's method we get increasing
				// errors from the dominant erfc term as it's (inexact) argument
				// increases in magnitude.
				//
				if ( 20 / a > sigma * sigma ) {
					use_temme = true;
				}
			} else {
				if ( sigma < 0.4 ) {
					use_temme = true;
				}
			}
		}
		if ( use_temme ) {
			eval_method = 5;
		}
		else
		{
			 //
			 // Regular case where the result will not be too close to 0.5.
			 //
			 // Changeover here occurs at P ~ Q ~ 0.5
			 // Note that series computation of P is about x2 faster than continued fraction
			 // calculation of Q, so try and use the CF only when really necessary, especially
			 // for small x.
			 //
			if ( x - ( 1 / (3 * x) ) < a ) {
				eval_method = 2;
			} else {
				eval_method = 4;
				invert = !invert;
			}
		}
	}

	switch( eval_method ) {
	case 0:
		result = finite_gamma_q( a, x );
		if (normalised === false ) {
			result *= gamma( a );
		}
	break;
	case 1:
		result = finite_half_gamma_q( a, x );
		if ( normalised === false ) {
			result *= gamma( a );
		}
	break;
	case 2:
		// Compute P:
		result = normalised ? regularised_gamma_prefix( a, x ) : full_igamma_prefix(a, x );
		if ( result !== 0 ) {
			var init_value = 0;
			if ( invert ) {
				init_value = -a * ( normalised ? 1 : gamma(a) ) / result;
			}
			result *= lower_gamma_series(a, x, init_value) / a;
			if ( invert ) {
				invert = false;
				result = -result;
			}
		}
	break;
	case 3:
		// Compute Q:
		invert = !invert;
		var g;
		var res;
		res = tgamma_small_upper_part( a, x, invert );
		result = res[ 0 ];
		g = res[ 1 ];
		invert = false;
		if ( normalised ) {
			result /= g;
		}
	break;
	case 4:
		// Compute Q:
		result = normalised ? regularised_gamma_prefix( a, x ) : full_igamma_prefix( a, x );
		if ( result !== 0 ) {
			result *= upper_gamma_fraction( a, x );
		}
	break;
	case 5:
		result = igamma_temme_large( a, x );
		if ( x >= a ) {
			invert = !invert;
		}
	break;
	}

	if ( normalised && result > 1 ) {
		result = 1;
	}
	if ( invert ) {
		gam = normalised ? 1 : gamma( a );
		result = gam - result;
	}
	return result;
} // end FUNCTION gammainc()


// EXPORTS //

module.exports = gammainc;
