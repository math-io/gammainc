'use strict';

// MODULES //

var powm1 = require( 'math-powm1' );
var sum_series = require( 'math-sum-series' );
var tgamma1pm1 = require( 'math-gammap1m1' );


// FUNCTIONS //

var small_gamma2_series = require( './small_gamma2_series.js' );

// TGAMMA SMALL UPPER PART //

/**
* FUNCTION: tgamma_small_upper_part( a, x, invert )
*	Compute the full upper fraction (Q) when a is very small.
*
* @param {Number} a - function parameter
* @param {Number} x - function parameter
* @param {Boolean} invert - boolean indicating if the upper tail of the incomplete gamma function should be evaluated
* @returns {Number} full upper fraction (Q)
*/
function tgamma_small_upper_part( a, x, invert ) {
	var result;
	var init_value;
	var p;
	var pgam;

	result = tgamma1pm1( a );
	pgam = (result + 1) / a;
	p = powm1( x, a );
	result -= p;
	result /= a;
	var s = small_gamma2_series( a, x );
	p += 1;
	init_value = invert ? pgam : 0;
	result = -p * sum_series( s, {
		'init': (init_value - result) / p } 
	);
	if ( invert ) {
		result = -result;
	}
	return [ result, pgam ];
} // end FUNCTION tgamma_small_upper_part()


// EXPORTS //

module.exports = tgamma_small_upper_part;
