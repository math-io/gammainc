'use strict';

var gammainc = require( './../lib' );

for ( var x = 0; x < 10; x++ ) {
	for ( var s = 10; s > 0; s-- ) {
		console.log( 'x: %d, \t s: %d, \t f(x,s): %d', x, s, gammainc( x, s ) );
	}
}
