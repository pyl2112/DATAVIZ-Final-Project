
					//make a variable to each row of data
				 d3.csv("2017-2018_Physical_Education_-_PE_Space_20221110.csv")
							.then(function(data) {

								//NEW this is the function below with the formated data
							var stackedData =	makeDataStack(data)
								//TODO you can write the stacked chart code in the new empty function using the formatted data
								makeStackedChart(stackedData)

									dataset = data
						 } )



						 //NEW function that joins entries and adds up areas
						 function makeDataStack(dataset){
							 var formatted = {}

							 for(var i in dataset){
								 //make a variable to each row of data
							 	var space = dataset[i]
								 //is this the school id? if not change to different key
								 var schoolId = space["ATS Code"]
								 //if the id is not in the formatted dictionary, make an entry with area set to 0 for each inside and outside
								 if(Object.keys(formatted).indexOf(schoolId)==-1){
									 formatted[schoolId]={}
									 formatted[schoolId]["inside"] = 0
									 formatted[schoolId]["outside"] = 0

								 }
								 //then add the new area to it depending on if it is inside or outside
								 //use a if statement to determin whether it is outside or in
								 //this code works if there are only insdie or outsdie options.
								 if(space["Insidevoutside"]=="Inside"){
								 	formatted[schoolId]["inside"]+=parseInt(space["sqft"])
								 }else if(space["Insidevoutside"]=="Outside"){
								 	formatted[schoolId]["outside"]+=parseInt(space["sqft"])
								 }
							 }
							 //here is the formatted output of the function
							//console.log(formatted)

							 var formattedArray = []
							 for(var f in formatted){
							 //	console.log(f)
								 formattedArray.push( formatted[f])
							 }
							 return formattedArray

						 }

						 function makeStackedChart(stackedData){
							 console.log(stackedData)
							//TODO draw your chart here-------------------------------------------------------------



							//Create SVG element---------------------------------------------------------

							// set the dimensions and margins of the graph
							var margin = {top: 30, right: 30, bottom: 70, left: 60},
									w = 1500 - margin.left - margin.right,
									h = 600 - margin.top - margin.bottom;

							// append the svg object to the body of the page
							var svg = d3.select("body")
								.append("svg")
									.attr("width", w + margin.left + margin.right)
									.attr("height", h + margin.top + margin.bottom)
								.append("g")
									.attr("transform",
												"translate(" + margin.left + "," + margin.top + ")");

							//Set up stack method---------------------------------------------------
							var stack = d3.stack()
											.keys([ "inside", "outside" ])
										//	.order(d3.stackOrderDescending);  // <-- Flipped stacking order

							//Data, stacked
							var series = stack(stackedData);
											console.log(series)


							//Set up scales----------------------------------------------

							// X axis
							var xScale = d3.scaleBand()
								.domain(d3.range(stackedData.length))
								.range([ 0, w ])
								.padding(0.2);
							svg.append("g")
								.attr("transform", "translate(0," + h + ")")
								.call(d3.axisBottom(xScale))
								.selectAll("text")
									.attr("transform", "translate(-10,0)rotate(-45)")
									.style("text-anchor", "end");

							// Y axis
							var yScale = d3.scaleLinear()
								.domain([0, d3.max(stackedData, function(d) {
									return d.inside + d.outside ;
								})
							])
								.range([ h, 0]); // <-- Flipped vertical scale
							svg.append("g")
								.call(d3.axisLeft(yScale));




							//Easy colors accessible via a 10-step ordinal scale
							var colors = d3.scaleOrdinal(d3.schemeCategory10);



							// Add a group for each row of data
							//NEW 11/30/2022 this is the only change - here I changed selectAll g to rect because you added more groups with g above, so now the select doesn't work.
							var groups = svg.selectAll("rect")
								.data(series)
								.enter()
								.append("g")
								.style("fill", function(d, i) {
									return colors(i);
								});

							// Add a rect for each data value
							var rects = groups.selectAll("rect")
								.data(function(d) { return d; })
								.enter()
								.append("rect")
								.attr("x", function(d, i) {
									console.log(d)
									return xScale(i);
								})
								.attr("y", function(d) {
									return yScale(d[1]);  // <-- Changed y value
								})
								.attr("height", function(d) {
									return yScale(d[0]) - yScale(d[1]);  // <-- Changed height value
								})
								.attr("width", xScale.bandwidth());



						 })
