'use strict';

// MODULES //

var sum_series = require( 'math-sum-series' );


// FUNCTIONS //

var lower_incomplete_gamma_series = require( './lower_incomplete_gamma_series' );


// LOWER GAMMA SERIES //

/**
* FUNCTION: lower_gamma_series( a, z, init_value )
*	Sums elements of the series expansion of the lower incomplete gamma function.
*
* @param {Number} a - function parameter
* @param {Number} z - function parameter
* @param {Number} init_value - initial value of the resulting sum
* @returns {Number} sum of terms of lower gamma series
*/
function lower_gamma_series( a, z, init_value ) {
	var result;
	var s;

	init_value = init_value || 0;
	// Multiply result by ((z^a) * (e^-z) / a) to get the full
	// lower incomplete integral. Then divide by tgamma(a)
	// to get the normalised value.
	s = lower_incomplete_gamma_series( a, z );
	result = sum_series( s, {
		'init': init_value
	});
	return result;
} // end FUNCTION lower_gamma_series()


// EXPORTS //

module.exports = lower_gamma_series;
