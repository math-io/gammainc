'use strict';

// MODULES //

var exp = require( 'math-exp' );
var ln = require( 'math-ln' );
var pow = require( 'math-power' );


// CONSTANTS //

var LOG_MAX_VALUE = 709.0;
var LOG_MIN_VALUE = -708.0;


// FULL INCOMPLETE GAMMA PREFIX //

/**
* FUNCTION: full_igamma_prefix( a, z )
*	Calculates the power term prefix (z^a)(e^-z) used in the non-normalised incomplete gammas.
*
* @param {Number} a - function parameter
* @param {Number} z - function parameter
* @returns {Number} power term prefix
*/
function full_igamma_prefix( a, z ) {
	var prefix;
	var alz;

	alz = a * ln(z);
	if ( z >= 1 ) {
		if ( ( alz < LOG_MAX_VALUE ) && ( -z > LOG_MIN_VALUE ) ) {
			prefix = pow( z, a ) * exp( -z );
		} else if ( a >= 1 ) {
			prefix = pow( z / exp(z/a), a );
		} else {
			prefix = exp( alz - z );
		}
	}
	else {
		if( alz > LOG_MIN_VALUE ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( z/a < LOG_MAX_VALUE ) {
			prefix = pow(z / exp(z/a), a);
		} else {
			prefix = exp( alz - z );
		}
	}
	return prefix;
} // end FUNCTION full_igamma_prefix()


// EXPORTS //

module.exports = full_igamma_prefix;
