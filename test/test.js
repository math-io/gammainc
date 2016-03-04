'use strict';

// MODULES //

var tape = require( 'tape' );
var isfinite = require( 'validate.io-finite' );
var isnan = require( 'validate.io-nan' );
var abs = require( 'math-abs' );
var gammainc = require( './../lib' );


// FIXTURES //

var fixtures = JSON.parse( require( './fixtures/output.json').program_message );
var x = fixtures.x;
var s = fixtures.s;
var i;
var v;
var expected1 = fixtures.lower_regularized;
for ( i = 0; i < expected1.length; i++ ) {
	v = expected1[ i ];
	if ( v === 'Inf' ) {
		expected1[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		expected1[ i ] = NaN;
	}
}
var expected2 = fixtures.upper_regularized;
for ( i = 0; i < expected1.length; i++ ) {
	v = expected2[ i ];
	if ( v === 'Inf' ) {
		expected2[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		expected2[ i ] = NaN;
	}
}
var expected3 = fixtures.lower_unregularized;
for ( i = 0; i < expected3.length; i++ ) {
	v = expected3[ i ];
	if ( v === 'Inf' ) {
		expected3[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		expected3[ i ] = NaN;
	}
}
var expected4 = fixtures.upper_unregularized;
for ( i = 0; i < expected4.length; i++ ) {
	v = expected4[ i ];
	if ( v === 'Inf' ) {
		expected4[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		expected4[ i ] = NaN;
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
		b2 = isfinite( expected1[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected1[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			t.ok( abs( actual - expected1[ i ] ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected1[ i ] + '.' );
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
		b2 = isfinite( expected2[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected2[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			t.ok( abs( actual - expected2[ i ] ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected2[ i ] + '.' );
		}
	}
	t.end();
});

tape( 'the function correctly evaluates the unregularized lower incomplete gamma function', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < x.length; i++ ) {
		actual = gammainc( x[ i ], s[ i ], false, false );

		b1 = isfinite( actual );
		b2 = isfinite( expected3[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected3[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			t.ok( abs( actual - expected3[ i ] ) / expected3[ i ]  < 1e-13, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected3[ i ] + '.' );
		}
	}
	t.end();
});

tape( 'the function correctly evaluates the unregularized upper incomplete gamma function', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < x.length; i++ ) {
		actual = gammainc( x[ i ], s[ i ], false, true );

		b1 = isfinite( actual );
		b2 = isfinite( expected4[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected4[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			t.ok( abs( actual - expected4[ i ] ) / expected4[ i ]  < 1e-13, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected4[ i ] + '.' );
		}
	}
	t.end();
});
