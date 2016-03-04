gamminc
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Incomplete gamma function][incomplete-gamma-function].

Evaluates the regularized lower [incomplete gamma function][incomplete-gamma-function]:

<div class="equation" align="center" data-raw-text="P( x, a ) = \frac{\gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_0^x t^{a-1} e^{-t} \; dt" data-equation="eq:lower_incomplete_gamma">
	<img src="https://cdn.rawgit.com/math-io/gammainc/e8827ca0002651a5253b47ec38e952b7c00eaa5b/docs/img/eqn1.svg" alt="Equation for the regularized lower incomplete gamma function.">
	<br>
</div>

The function can also be used to evaluate the regularized upper incomplete gamma function, which is defined as follows:  

<div class="equation" align="center" data-raw-text="Q( x, a ) = \frac{\Gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_x^\infty t^{a-1} e^{-t} \; dt" data-equation="eq:upper_incomplete_gamma">
	<img src="https://cdn.rawgit.com/math-io/gammainc/e8827ca0002651a5253b47ec38e952b7c00eaa5b/docs/img/eqn2.svg" alt="Equation for the regularized upper incomplete gamma function.">
	<br>
</div>

The two functions have the relationship `Q(x,a) = 1 - P(x,a)`.

In addition, the function can be used to evaluate the *unregularized* gamma functions. The range of above functions is `[0,1]`, which is not the case fo the *unregularized* versions. The unregularized lower incomplete gamma function is defined as

<div class="equation" align="center" data-raw-text="\gamma(a,x) = \int_0^x t^{a-1} e^{-t} \; dt" data-equation="eq:unreg_lower_incomplete_gamma">
	<img src="https://cdn.rawgit.com/math-io/gammainc/e8827ca0002651a5253b47ec38e952b7c00eaa5b/docs/img/eqn3.svg" alt="Equation for the unregularized lower incomplete gamma function.">
	<br>
</div>

and the upper unregularized incomplete gamma function is

<div class="equation" align="center" data-raw-text="\Gamma(a,x)= \int_x^\infty t^{a-1} e^{-t} \; dt" data-equation="eq:unreg_upper_incomplete_gamma">
	<img src="https://cdn.rawgit.com/math-io/gammainc/e8827ca0002651a5253b47ec38e952b7c00eaa5b/docs/img/eqn4.svg" alt="Equation for the unregularized upper incomplete gamma function.">
	<br>
</div>

The relationship between the two functions is `Γ(a,x) = γ(a,x) + Γ(a)`.

## Installation

``` bash
$ npm install math-gammainc
```


## Usage

``` javascript
var gammainc = require( 'math-gammainc' );
```


#### gammainc( x, s[, regularized = true ][, upper = false ] )

By default, evaluates the regularized lower [incomplete gamma function][incomplete-gamma-function] for inputs `x` and `s`. The third and fourth parameters of the function can be used to specify whether instead to evaluate the unregularized and/or upper incomplete gamma functions, respectively.

``` javascript
var val;

val = gammainc( 6, 2 );
// returns ~0.9826

val = gammainc( 1, 2, true, true );
// returns ~0.7358

val = gammainc( 7, 5 );
// returns 0.8270

val = gammainc( 7, 5, false );
// returns 19.8482
```

## Implementation

All of the four functions (regularized and non-regularized, upper and lower) share a common implementation since they are all related to each other. The implementation is a port from the [Boost C++ library][boost-library]. See their [documentation](http://www.boost.org/doc/libs/1_35_0/libs/math/doc/sf_and_dist/html/math_toolkit/special/sf_gamma/igamma.html) for a good discussion of the functions and the used evaluation strategies.

## Examples

``` javascript
var gammainc = require( 'math-gammainc' );

for ( var x = 0; x < 10; x++ ) {
	for ( var s = 10; s > 0; s-- ) {
		console.log( 'x: %d, \t s: %d, \t f(x,s): %d', x, s, gammainc( x, s ) );
	}
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-gammainc.svg
[npm-url]: https://npmjs.org/package/math-gammainc

[build-image]: http://img.shields.io/travis/math-io/gammainc/master.svg
[build-url]: https://travis-ci.org/math-io/gammainc

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/gammainc/master.svg
[coverage-url]: https://codecov.io/github/math-io/gammainc?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/gammainc.svg
[dependencies-url]: https://david-dm.org/math-io/gammainc

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/gammainc.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/gammainc

[github-issues-image]: http://img.shields.io/github/issues/math-io/gammainc.svg
[github-issues-url]: https://github.com/math-io/gammainc/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[boost-library]: http://www.boost.org/
[incomplete-gamma-function]: https://en.wikipedia.org/wiki/Incomplete_gamma_function
[continued-fraction]:  https://en.wikipedia.org/wiki/Gauss%27s_continued_fraction
