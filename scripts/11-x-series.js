var data = [{"type": "input one", "value": [1,1]},
			{"type": "input two", "value": [1,1]},
			{"type": "intermezzo one", "value": [1,1]},
			{"type": "intermezzo one", "value": [1,1]},
			{"type": "result one", "value": [1,2,1]},
			{"type": "input three", "value": [1,1,1]},
			{"type": "intermezzo two", "value": [1,2,1]},
			{"type": "intermezzo two", "value": [1,2,1]},
			{"type": "intermezzo two", "value": [1,2,1]},
			{"type": "result two", "value": [1,3,4,3,1]},
			{"type": "input four", "value": [1,1,1,1,1]},
			{"type": "intermezzo three", "value": [1,3,4,3,1]},
			{"type": "intermezzo three", "value": [1,3,4,3,1]},
			{"type": "intermezzo three", "value": [1,3,4,3,1]},
			{"type": "intermezzo three", "value": [1,3,4,3,1]},
			{"type": "intermezzo three", "value": [1,3,4,3,1]},
			{"type": "result three", "value": [1,4,9,2,3,1,8,4,1]}];
//setup
var paths = [{"id": 2, "type": "path", "d": "m 0,0 16.246395,0.1025 c -0.21915,-21.7265 -16.230378,-21.4773 -16.246395,-0.1025 z"}];

var w = 700, h = 1000, padding = 20, offset = 25, radius = 10;

function updateMultiplicands() {
	
	var frm = document.numberForm;
	var input1 = frm.inputOne;
	var input2 = frm.inputTwo;
	var input3 = frm.inputThree;
	var input4 = frm.inputFour;
	var input5 = frm.inputFive;
	var input6 = frm.inputSix;
	var input7 = frm.inputSeven;
	numbers = [];
	intermezzo = [];
	dataUpdate = [];
	results = [];
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

function doubleDigit(array) {
	for (var j=0; j < array.length - 1; j++) {
		for (var k=0; k < array[j].length - 1; k++) {
			if (array[j][k] > 9) {
				if (k+1 < array[j].length) {
					array[j][k+1] = array[j][k+1] + (array[j][k] - 10);					
				} else {
					array[j].push(array[j][k]-10)
				}
			}
		}
	}
	return array	
}

function numberToNumeric(number) {
	switch(number) {
	case 0:
		return "zero";
	case 1:
		return "one";
	case 2:
		return "two";
	case 3:
		return "three";
	case 4:
		return "four";
	case 5:
		return "five";
	case 6:
		return "six";
	case 7:
		return "seven";
	case 8:
		return "eight";
	case 9:
		return "nine";
}
}


function stringToNumber(array) {
	if (typeof(array) === "string") {
		return +array
	}	
	for(var i=0; i < array.length; i++) {
		array[i] = +array[i]
	}
	return array
}

function numberToString(array) {
	if (typeof(array) === "number") {
		return '' + array
	}
	for(var i=0; i < array.length; i++) {
		array[i] = '' + array[i]
	}
	return array
}

function splitInput(input) {
	return input.split("")
}

function jsonMake(input, type) {
	var obj = {}
	obj.type = type
	obj.value = input
	return obj;
}

function finalResults(input) {
	var result = [];
	for (var i = 1; i < input.length; i++) {
		if (i === 1) {
			result.push(input[0] * input[i]);
		} else {
			result.push(input[i] * result[result.length-1]);
		}
	}
	return result;
}

/*var results = finalResults(inputs)
*/
var m1 = [[1,3,4,3,1]];
var m2 = [[1,0,1,1,1]];

function multiplyMatrix(m1, m2) {
    var result = [];
    for(var j = 0; j < m2.length; j++) {
        result[j] = [];
        for(var k = 0; k < m1[0].length; k++) {
            var sum = 0;
            for(var i = 0; i < m1.length; i++) {
                sum += m1[i][k] * m2[j][i];
            }
            result[j].push(sum);
        }
    }
    return result;
}

var intermezzo1 = multiplyMatrix(m1, d3.transpose(m2)); //transpose one of the two so that we have each resulting value

function reverseEach(arr) {
	var newArr = [];
	for(var i = 0; i < arr.length; i++) {
		newArr.push(arr[i].value.reverse());
	}
	return newArr;
}

var dataReversed = reverseEach(data); //reverse each individual 


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

/*var x = d3.scale.linear()
	.domain([0, data.length])
	.range([0, width]);

var y = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d.value; })])
	.rangeRound([0,height]);*/

var x = function(index) {

}

var shift = function(index) {

};

function colorPicker(number) {
	switch(number) {
		case 0:
			return "#FFFFFF";
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
			  .attr("r","1")
			  .attr("cx",0)
			  .attr("cy",0)
	  	      .attr("fill", function(d, i) { return colorPicker(d); })
		      .attr("stroke", "none")

circles.transition()
	   .duration(250)
	   .delay(function(d, i) { return i * 100; })
	   .ease("easeInOutBack")
	   .attr("r", radius)
	   .attr("cx", function(d, i) { return w - offset * i; })
	   .attr("cy", offset)

//.attr("class",function(d, i) { return classAssign(i); })
circles.on("mouseover", function(d, i) {
	d3.select(this).attr("r", radius * 1.5);
})
circles.on("mouseout", function(d, i) {
	d3.select(this)
	  .transition()
	  .attr("r", radius);
})

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
			.attr("opacity",1)
			.attr("text-anchor", "middle")
			//.attr("style", "dominant-baseline: central;")	

		circles.transition()
			   .duration(1000)
			   .delay(function(d, i) { return i * 20; })
			   .attr("opacity",0.1)
			   .attr("cx", w + offset)
			   //.attr("cy",function(d, i) { return 0 /* - g[0][i].getCTM().f;*/ })
			   //.attr("r", function(d, i) { return i ; })
	} else {
		circles.transition()
			   .attr("opacity",1)
			   .attr("cx", function(d, i) { return w - offset * i; })
			   .attr("cy", offset)
			   .attr("r", radius)

		var text = g.selectAll("text")

		text.transition()
		 .duration(500)
		 .attr("opacity",0)
		 .each("end", function(d, i) { d3.select(this).remove(); })

	}		
}

d3.select("#addText").on("change",function() {
	appendText();
});