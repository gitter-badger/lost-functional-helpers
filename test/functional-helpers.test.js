var functionalHelpers = require('../functional-helpers.js');
var assert            = require('expressive-assertion');
var ts                = require('typesystem');

describe('functionalHelpers', function () {
    describe('.wrap()', function () {
        it('is a function', function () {
            assert(function() {
                return ts.isFunctionObject(functionalHelpers.wrap);
            });
        });

        it('returns a function', function () {
            assert(function () {
                return ts.isFunctionObject(functionalHelpers.wrap(4));
            });
        });

        it('returns the input in range 0..n-1', function () {
            var wrap = functionalHelpers.wrap(4);

            assert(function () {
                return wrap(0) === 0;
            });

            assert(function () {
                return wrap(1) === 1;
            });

            assert(function () {
                return wrap(2) === 2;
            });

            assert(function () {
                return wrap(3) === 3;
            });
        });

        it('is able to rotate right once', function () {
            var wrap = functionalHelpers.wrap(4);

            assert(function () {
                return wrap(4) === 0;
            });

            assert(function () {
                return wrap(5) === 1;
            });

            assert(function () {
                return wrap(6) === 2;
            });

            assert(function () {
                return wrap(7) === 3;
            });
        });

        it('is able to rotate right multiple times', function () {
            var wrap = functionalHelpers.wrap(4);

            assert(function () {
                return wrap(9) === 1;
            });

            assert(function () {
                return wrap(15) === 3;
            });

            assert(function () {
                return wrap(20) === 0;
            });
        });

        it('is able to rotate left once', function () {
            var wrap = functionalHelpers.wrap(4);

            assert(function () {
                return wrap(-1) === 3;
            });

            assert(function () {
                return wrap(-2) === 2;
            });

            assert(function () {
                return wrap(-3) === 1;
            });

            assert(function () {
                return wrap(-4) === 0;
            });
        });

        it('is able to rotate left multiple times', function () {
            var wrap = functionalHelpers.wrap(4);

            assert(function () {
                return wrap(-7) === 1;
            });

            assert(function () {
                return wrap(-16) === 0;
            });
        });
    });

    describe('.clamp()', function () {
        it('is a function', function () {
            assert(function () {
                return ts.isFunctionObject(functionalHelpers.clamp);
            });
        });

        it('returns a function', function () {
            assert(function () {
                return ts.isFunctionObject(functionalHelpers.clamp(0, 3));
            });
        });

        it('returns the input in range min..max', function () {
            var clamp = functionalHelpers.clamp(10, 20);

            assert(function () {
                return clamp(10) === 10;
            });

            assert(function () {
                return clamp(15) === 15;
            });

            assert(function () {
                return clamp(20) === 20;
            });
        });

        it('returns the maximum for values greater than the maximum', function () {
            var clamp = functionalHelpers.clamp(10, 20);

            assert(function () {
                return clamp(21) === 20;
            });

            assert(function () {
                return clamp(30) === 20;
            });

            assert(function () {
                return clamp(100000) === 20;
            });
        });

        it('returns the minimum for values less than the minimum', function () {
            var clamp = functionalHelpers.clamp(10, 20);

            assert(function () {
                return clamp(0) === 10;
            });

            assert(function () {
                return clamp(-20) === 10;
            });
        });

        it('works if minimum and maximum are swapped', function () {
            var clamp = functionalHelpers.clamp(20, 10);

            assert(function () {
                return clamp(10) === 10;
            });

            assert(function () {
                return clamp(20) === 20;
            });

            assert(function () {
                return clamp(15) === 15;
            });

            assert(function () {
                return clamp(0) === 10;
            });

            assert(function () {
                return clamp(30) === 20;
            });
        });

        it('works if only maximum is supplied', function () {
            var clamp = functionalHelpers.clamp(20);

            assert(function () {
                return clamp(30) === 20;
            });

            assert(function () {
                return clamp(20) === 20;
            });

            assert(function () {
                return clamp(19) === 19;
            });

            assert(function () {
                return clamp(10) === 10;
            });

            assert(function () {
                return clamp(1) === 1;
            });

            assert(function () {
                return clamp(0) === 0;
            });

            assert(function () {
                return clamp(-1) === 0;
            });

            assert(function () {
                return clamp(-10) === 0;
            });
        });

        it('works in negative ranges', function () {
            var clamp = functionalHelpers.clamp(-10, -20);

            assert(function () {
                return clamp(-20) === -20;
            });

            assert(function () {
                return clamp(-10) === -10;
            });

            assert(function () {
                return clamp(-9) === -10;
            });

            assert(function () {
                return clamp(-21) === -20;
            });

            assert(function () {
                return clamp(21) === -10;
            });
        });
    });

    describe('.constant()', function () {
        it('is a function', function () {
            assert(function() {
                return ts.isFunctionObject(functionalHelpers.constant);
            });
        });

        it('returns a function', function () {
            assert(function() {
                return ts.isFunctionObject(functionalHelpers.constant(100));
            });
        });

        it('returns the value for various types', function () {
            [100, {}, [], null, undefined, 0, "hello"].forEach(function (value) {
                assert(function() {
                    return functionalHelpers.constant(value)() === value;
                });
            });
        });
    });
});
