'use strict';

// MODULES //

var tape = require( 'tape' );
var isfinite = require( 'validate.io-finite' );
var isnan = require( 'validate.io-nan' );
var abs = require( 'math-abs' );
var gamma = require( 'math-gamma' );
var gammainc = require( './../lib' );


// FIXTURES //

var x = require( './fixtures/x.json' );
var s = require( './fixtures/s.json' );
var expected = require( './fixtures/expected.json' );
var i;
var v;
for ( i = 0; i < expected.length; i++ ) {
	v = expected[ i ];
	if ( v === 'Inf' ) {
		expected[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		expected[ i ] = NaN;
	}
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof gammainc === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var val = gammainc( NaN, 2 );
	t.notOk( val === val, 'returns NaN' );
	val = gammainc( 4, NaN );
	t.notOk( val === val, 'returns NaN' );
	t.end();
});

tape( 'the function returns NaN if provided x < 0 or s <= 0', function test( t ) {
	var val;
	// Case: x < 0
	val = gammainc( -0.1, 2 );
	t.notOk( val === val, 'returns NaN' );
	// Case: s = 0
	val = gammainc( 0.1, 0 );
	t.notOk( val === val, 'returns NaN' );
	// Case: s < 0
	val = gammainc( 0.1, -2 );
	t.notOk( val === val, 'returns NaN' );
	t.end();
});

tape( 'the function returns 0 for the lower incomplete gamma function when the first argument is zero', function test( t ) {
	var val;
	var s;
	for ( s = 1; s < 10; s++ ) {
		val = gammainc( 0, s );
		t.ok( val === 0, 'returns 0' );
	}
	t.end();
});

tape( 'the function correctly evaluates the lower incomplete gamma function', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < x.length; i++ ) {
		actual =  gammainc( x[ i ], s[ i ] );

		b1 = isfinite( actual );
		b2 = isfinite( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			t.ok( abs( actual - expected[ i ] ) < 1e-12, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected[ i ] + '.' );
		}
	}
	t.end();
});

tape( 'the function correctly evaluates the upper incomplete gamma function', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < x.length; i++ ) {
		actual =  gammainc( x[ i ], s[ i ], true, true );

		b1 = isfinite( actual );
		b2 = isfinite( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			t.ok( abs( (1-actual) - expected[ i ] ) < 1e-12, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected[ i ] + '.' );
		}
	}
	t.end();
});


tape( 'the function correctly evaluates the unregularized lower incomplete gamma function', function test( t ) {
	var actual;
	var val;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < x.length; i++ ) {
		actual = gammainc( x[ i ], s[ i ], false, false );

		b1 = isfinite( actual );
		b2 = isfinite( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			val = expected[ i ] * gamma( s[i] );
			t.ok( abs( actual - val ) / val  < 1e-6, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + val + '.' );
		}
	}
	t.end();
});

tape( 'the function correctly evaluates the unregularized upper incomplete gamma function', function test( t ) {
	var actual;
	var val;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < x.length; i++ ) {
		actual = gammainc( x[ i ], s[ i ], false, true );

		b1 = isfinite( actual );
		b2 = isfinite( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			val = ( 1 - expected[ i ] ) * gamma( s[i] );
			t.ok( abs( actual - val ) / val  < 1e-3, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + val + '.' );
		}
	}
	t.end();
});
