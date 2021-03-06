// Generated by CoffeeScript 1.6.3
var a, b, bign1, bign2, n1, n2, snglDgtMult;

snglDgtMult = function(n1, n2) {
  var digit, multiplicand, multiplier, _i, _len, _results;
  if (typeof n1 === "number") {
    n1 = '' + n1;
  }
  if (typeof n2 === "number") {
    n2 = '' + n2;
  }
  multiplicand = n1.split('').reverse();
  multiplier = n2.split('').reverse();
  _results = [];
  for (_i = 0, _len = multiplier.length; _i < _len; _i++) {
    digit = multiplier[_i];
    _results.push((function(digit) {
      var a, carry, num, _j, _len1, _results1;
      carry = 0;
      _results1 = [];
      for (_j = 0, _len1 = multiplicand.length; _j < _len1; _j++) {
        num = multiplicand[_j];
        a = (digit * num) + carry;
        carry = Math.floor(a / 10);
        _results1.push(a - (carry * 10));
      }
      return _results1;
    })(digit));
  }
  return _results;
};

n1 = 1111;

n2 = 1234;

a = snglDgtMult(n1, n2);

bign1 = new BigInteger('' + n1);

bign2 = new BigInteger('' + n2);

b = bign1.multiply(bign2).toString();

a.push(stringToNumber(b.split('')));
