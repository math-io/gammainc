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
var max = Math.max;
var min = Math.min;
var ln = require( 'math-ln' );
var pow = require( 'math-power' );


// FUNCTIONS //

var lower_gamma_series = require( './lower_gamma_series.js' );
var upper_gamma_fraction = require( './upper_gamma_fraction.js' );


// CONSTANTS //

var LOG_MAX_VALUE = 709.0;
var LOG_MIN_VALUE = -708.0;


// REGULARISED GAMMA PREFIX //

/**
* FUNCTION: regularised_gamma_prefix( a, z )
*	Computes (z^a)(e^-z)/tgamma(a).
*
* @param {Number} a - input value
* @param {Number} z - input value
* @returns {Number} (z^a)(e^-z)/tgamma(a)
*/
function regularised_gamma_prefix( a, z ) {
	var limit;
	var sum;
	var zoa;
	var amz;
	var alzoa;
	var amza;
	var prefix;

	limit = max( 10, a );
	sum = lower_gamma_series( a, limit ) / a;
	sum += upper_gamma_fraction( a, limit );

	if (a < 10) {
		// special case for small a:
		prefix = pow( z / 10, a );
		prefix *= exp( 10 - z );
		if ( 0 === prefix ) {
			prefix = pow( (z * exp( (10-z) / a ) ) / 10, a);
		}
		prefix /= sum;
		return prefix;
	}

	zoa = z / a;
	amz = a - z;
	alzoa = a * ln( zoa );
	if( ( min( alzoa, amz ) <= LOG_MIN_VALUE ) || ( max( alzoa, amz ) >= LOG_MAX_VALUE ) ) {
		amza = amz / a;
		if( (amza <= LOG_MIN_VALUE) || (amza >= LOG_MAX_VALUE) ) {
			prefix = exp( alzoa + amz );
		} else {
			prefix = pow( zoa * exp( amza ), a );
		}
	} else {
		prefix = pow( zoa, a ) * exp( amz );
	}
	prefix /= sum;
	return prefix;
} // end FUNCTION regularised_gamma_prefix()


// EXPORTS //

module.exports = regularised_gamma_prefix;
