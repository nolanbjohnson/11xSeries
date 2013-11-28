d3
Object {version: "3.3.9", ascending: function, descending: function, min: function, max: function…}
svg = d3.select("svg")

data = [[11,11,111,11111],[121,13431],[1,1,1,1,1,2,1,1,1,1]]
      [
      Array[4]
      , 
      Array[2]
      , 
      Array[10]
      ]
g = svg.selectAll("g").data(data).enter().append("g");
      [
      Array[3]
      ]
circle = g.selectAll("circle").data(function(d) { return d; }).enter().append("circle")
      [
      Array[4]
      0: circle.[object SVGAnimatedString]
      1: circle.[object SVGAnimatedString]
      2: circle.[object SVGAnimatedString]
      3: circle.[object SVGAnimatedString]
      length: 4
      parentNode: g.[object SVGAnimatedString]
      __proto__: Array[0]
      , 
      Array[2]
      , 
      Array[10]
      ]
circle.attr("r",5).attr("cx",function(d, i) { return (175 - i*25); }).attr("cy",25);
      [
      Array[4]
      , 
      Array[2]
      , 
      Array[10]
      ]
d3.select("svg g").attr("id", "input")
      [
      Array[1]
      ]
d3.select("svg g:nth-child(2)").attr("id", "result")
      [
      Array[1]
      ]
d3.select("svg g:nth-child(3)").attr("id", "intermezzo")
      [
      Array[1]
      ]
gIn = svg.select("g#input")
      [
      Array[1]
      ]
gRes = svg.select("g#result")
      [
      Array[1]
      ]
gMez = svg.select("g#intermezzo")
      [
      Array[1]
      ]
gRes.attr("transform","translate(0,50)")
      [
      Array[1]
      ]
gMez.attr("transform","translate(0,125)")
      [
      Array[1]
      ]

