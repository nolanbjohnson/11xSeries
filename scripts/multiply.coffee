snglDgtMult = (n1,n2) ->
	n1 = '' + n1 if typeof n1 is "number"
	n2 = '' + n2 if typeof n2 is "number"
	multiplicand = n1.split('').reverse()
	multiplier = n2.split('').reverse()

	for digit in multiplier
		do (digit) ->
			carry = 0
			for num in multiplicand
				#console.log "#{digit}, #{num}, #{carry}"
				#console.log +digit * +num + carry
				a = (digit * num) + carry
				carry = Math.floor(a / 10)
				a - (carry * 10)

n1 = 1111
n2 = 1234

a = snglDgtMult(n1,n2)

bign1 = new BigInteger('' + n1) 
bign2 = new BigInteger('' + n2) 

b = bign1.multiply(bign2).toString()

a.push(stringToNumber(b.split('')))