//setup
var data = math

var paths = [{"id": 2, "type": "path", "d": "m 0,0 16.246395,0.1025 c -0.21915,-21.7265 -16.230378,-21.4773 -16.246395,-0.1025 z"}];

var w = 1000, h = 1500, padding = 20, offset = 11, radius = 4;


function useOption(name) {

	if (typeof(name)==="undefined") { name = "fourOptions" }
	var checked = getCheckedRadioId(name)
	var inputs
	switch(checked) {
		case "11x10":
			inputs = ["11", "10", "101", "10101", "101010101", "10101010101010101", "101010101010101010101010101010101"];
			break;
		case "11x13":
			inputs = ["11", "12", "123", "12345", "123456789", "12345678912345678", "123456789123456789123456789123456"];
			break;
		case "11x11":
			inputs = ["11","11","111","11111","111111111","11111111111111111","111111111111111111111111111111111"];
			break;
		case "11x12":
			inputs = ["11", "12", "121", "12121", "121212121", "12121212121212121", "121212121212121212121212121212121"];
			break;
		default:
			inputs = null;
			break;
	}
	if (inputs !== null) {
		makeNewViz(inputs);
	}
}

function getCheckedRadioId(name) {
    var elements = document.getElementsByName(name);

    for (var i=0, len=elements.length; i<len; ++i)
        if (elements[i].checked) return elements[i].value;
}

function makeNewViz(inputs) {
	
	if (typeof(inputs)==='undefined') var inputs = getFrmInputs();

	var results = updateData(inputs);

	document.getElementById("math-string").innerHTML = inputsToString(inputs)

	//half-assing it for now
	for (i=0; i < data.length; i++) {
		data[i].value = results[i];
	}

	update(data)

}

function getFrmInputs() {
	var frm = document.numberForm, 
	input1 = frm.inputOne,
	input2 = frm.inputTwo,
	input3 = frm.inputThree,
	input4 = frm.inputFour,
	input5 = frm.inputFive,
	input6 = frm.inputSix,
	input7 = frm.inputSeven,
	inputs = [input1.value, input2.value, input3.value, input4.value, input5.value, input6.value, input7.value];
	return inputs
}

function updateData(inputs) {

	var results = []
	results.push(stringToNumber(inputs[0].split('').reverse()))
	var lastResult = inputs[0]
	for (var i=1; i < inputs.length; i++) {
		//console.log(inputs[i])
		results.push(stringToNumber(inputs[i].split('').reverse()))
		results = results.concat(snglDgtMult(lastResult,inputs[i]))
		var n1 = new BigInteger(lastResult) //a string to new BigInteger for multiplying
		var n2 = new BigInteger(inputs[i])
		lastResult = n1.multiply(n2).toString()
		//console.log(n1.toString() + ' x ' + n2.toString() + '=' + lastResult)
		results.push(stringToNumber(lastResult.split('').reverse()))
	}
	return results;
}

//var results = []
//results = results.concat(updateData(inputs))


function inputsToString(inputs) {
	var multString = ""
	for (i=0; i < inputs.length; i++) {
		if (multString === "") {
			multString = inputs[i].commafy();
		}else {
			multString = multString + " x " + inputs[i].commafy()
		}
	}
	return multString
}

function updateMultiplicands() {
	
	var frm = document.numberForm, 
		input1 = frm.inputOne,
		input2 = frm.inputTwo,
		input3 = frm.inputThree,
		input4 = frm.inputFour,
		input5 = frm.inputFive,
		input6 = frm.inputSix,
		input7 = frm.inputSeven,
		numbers = [],
		intermezzo = [],
		dataUpdate = [],
		results = [],
		inputs = [input1 ,input2 , input3, input4, input5, input6, input7];

	numbers.push(stringToNumber(splitInput(inputs[0].value))) //add the first input to the array
	dataUpdate.push(jsonMake(numbers[0],"input zero"))
	results.push(input1.value) //throwaway for the value to use to compute the next result
	//create an array of the raw values to encode
	for (var i=1; i < inputs.length; i++) {
		numbers.push(stringToNumber(splitInput(inputs[i].value)))
		dataUpdate.push(jsonMake(numbers[numbers.length-1],"input " + numberToNumeric(i)))
		intermezzo = multiplyMatrix([numbers[numbers.length - 2]],d3.transpose([numbers[numbers.length - 1]]))
		intermezzo = doubleDigit(intermezzo)
		numbers = numbers.concat(intermezzo)
		dataUpdate.push(jsonMake(intermezzo,"intermezzo " + numberToNumeric(i)))
		results.push(results[results.length - 1] * inputs[i].value)
		numbers.push(stringToNumber(splitInput(numberToString(results[results.length - 1]))))
		dataUpdate.push(jsonMake(numbers[numbers.length-1],"result " + numberToNumeric(i)))
	}
	//create the data objects on add to array
	for (var i=0; i < numbers.length; i++) {
		numbers[i]
	}

	console.log(dataUpdate)
	//half-assing it for now...
	for (i=0; i < data.length; i++) {
		data[i].value = numbers[i];
	}
	update(data);
}



var intermezzo1 = multiplyMatrix(m1, d3.transpose(m2)); //transpose one of the two so that we have each resulting value




//var dataReversed = reverseEach(data); //reverse each individual 

/*var results = finalResults(inputs)
*/
var m1 = [[1,6,5,8,1,3,1,5,6,5,0,0,8,5,3,5,2]];
var m2 = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

function doGroups(selection) {
         var groups = []
         selection.each(function() {
         groups.push($(this).nextUntil(":not(.intermezzo)").andSelf());
   });
   return groups
}

/*function intermediateResults(input) {
	var result = [];
	var inputString = input.toString().split(',');
	for (var i = 0; i < inputString.length; i++) {
		
	}
	for (var i = 1; i < input.length; i++) {
		if (i === 1) {
			result.push(input[0] * input[i]);
		} else {
			result.push(input[i] * results[results.length-1]);
		}
	}
	return result;
};
*/

function colorPicker(number) {
	switch(number) {
		case 0:
			return "#cccccc";
		case 1:
			return "#65cace";
		case 2:
			return "#b52e1d";
		case 3:
			return "#d583c6";
		case 4:
			return "#22826a";
		case 5:
			return "#899295";
		case 6:
			return "#35429c";
		case 7:
			return "#ffd4bb";
		case 8:
			return "#9b3996";
		case 9:
			return "#b4eef0";
	}
}


var classAssign = function(index) {
	switch(index)
	{
	//all the following rows are input
	case 0:
	case 1:
	case 5:
	case 10:
		var className = "input";
		break;
	//all the following rows are intermediate steps
	case 2:	
	case 3:	
	case 6:	
	case 7:	
	case 8:	
	case 11:
	case 12:
	case 13:
	case 14:
	case 15:
		var className = "intermezzo";
		break;
	//all the following rows are intermediate results
	case 4:
	case 9:	
	case 16:	
		var className = "result";
		break;
	default:
		var className = "";
	}
	return className
};
var svg = d3.select('#math')
			.append("svg")
			.attr("width", w + padding * 2)
			.attr("height", h + padding * 2);

//bind the array of arrays to the groups (one for each row of the visualization)
var g = svg.selectAll("g")
			.data(data)
			.enter()
			.append("g")
			.attr("class", function(d) { return d.type; });

//shift the rows to the left to align accordingly
for (var i=1; i < 7; i++) {
	svg.selectAll("g.intermezzo." + numberToNumeric(i))
		.attr("transform", function(d, i) { return "translate(" + (-i * offset) + ",0)"; })
}

g.transition()
	.attr("transform", function(d, i) { 
		if (d3.select(this).attr("transform")) {
			return d3.select(this).attr("transform").replace("0)",( i * offset) + ")");
		} else {
			return "translate(0, " + (i * offset) + ")";
		}
	});

//bind the individual elements of each individual array to each text element
var circles = g.selectAll("circle")
			  .data(function(d, i) { return d.value; })
			  .enter()
			  .append("circle")
			  .attr("r","2")
			  .attr("cx",0)
			  .attr("cy",0)
	  	      .attr("fill", function(d, i) { return colorPicker(d); })
		      .attr("stroke", "none")
		      .attr("pointer-events","none")

circles.transition()
	   .duration(1000)
	   .delay(function(d, i) { return i * 25; })
	   .ease("easeInOutBack")
	   .attr("cx", function(d, i) { return w - offset * i; })
	   .attr("cy", offset)
	   .transition()
	   .attr("r", radius)
	   .each("end", function(d, i) { d3.select(this).attr("pointer-events", null); })

//.attr("class",function(d, i) { return classAssign(i); })
circles.on("mouseover", function(d, i) {
	d3.select(this).attr("r", radius * 1.5);
})
circles.on("mouseout", function(d, i) {
	d3.select(this)
	  .transition()
	  .attr("r", radius);
})

optionButton = d3.select("input[name=fourOptions]")

$('input[name=fourOptions]').click(function() {
	useOption('fourOptions')
});

var yScale = d3.scale.ordinal()
						.domain(d3.range(data.length))
						.rangeRoundBands([0,h], 0.05);

function update(data) {

	g.data(data)
	 .enter()
	 .append("g");

	circles.data(function(d, i) { return d.value; })
		   .enter()
		   .append("circle")

	appendText()

	circles.attr("fill", function(d, i) { return colorPicker(d); });

	//circles.exit().remove();
}

function appendText() {
	if (addText.checked === true) {


		var text = g.selectAll("text")
					.data(function(d, i) { return d.value; })
					.enter()
					.append("text");

		text.text(function(d) { return d; })
			.attr("x", function(d, i) { return w - offset * i; })
			.attr("y", offset)
			.attr("style", "font-size: " + Math.round(radius * 2.5) + ";")
			.attr("opacity",1)
			.attr("text-anchor", "middle")
			//.attr("style", "dominant-baseline: central;")	

		circles//.transition()
			   //.delay(400)
			   //.duration(500)
			   //.delay(function(d, i) { return i ; })
			   //.attr("opacity",0.25)
			   .classed("dim-circle", true)
			   .transition()
			   .delay(1000)
			   .duration(1800)
			   .attr("cx", w + offset)
			   //.attr("opacity",0.03)
			   .each("end", function(d,i) {
			   					d3.select(this).attr("class", "hide-circle")
			   				})
			   //.attr("cy",function(d, i) { return 0 /* - g[0][i].getCTM().f;*/ })
			   //.attr("r", function(d, i) { return i ; })
	} else {
		circles.attr("class", "dim-circle")
				.transition()
				.delay(500)
			   .duration(1800)
			   .attr("cx", function(d, i) { return w - offset * i; })
			   .attr("cy", offset)
			   //.attr("opacity",0.25)
			   .each("end", function(d,i) {
			   					d3.select(this).classed("dim-circle", false)
			   				})

			   //.attr("r", radius)
			   

		var text = g.selectAll("text")

		text.transition()
		 .delay(2000)
		 .duration(500)
		 .attr("opacity",0)
		 .each("end", function(d, i) { d3.select(this).remove(); })

	}		
}

d3.select("#addText").on("change",function() {
	appendText();
});