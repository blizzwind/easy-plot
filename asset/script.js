var data = [];
var set = "2D";
var layout = {margin:{
  l: 0,
  r: 0,
  b: 0,
  t: 0
}};
Plotly.newPlot("plot", data, layout);
document.getElementById("csv").addEventListener("change", loadCSV);

function set2D() {
  set = "2D";
  document.getElementById("data-z").style.display = "none";
}

function set3D() {
  set = "3D";
  document.getElementById("data-z").style.display = "block";
}

function plot() {
  data_x = [];
  data_y = [];
  data_z = [];
  if (set == "2D") {
    for (var i=0; i<document.getElementById("data-x").value.length; i+=2) {
	  data_x.push(Number(document.getElementById("data-x").value[i]));
	  data_y.push(Number(document.getElementById("data-y").value[i]));
	}
	data = [{x:data_x,y:data_y,mode:"markers",type:"scatter"}];
    Plotly.newPlot("plot", data, layout);
  } else if (set == "3D") {
    for (var i=0; i<document.getElementById("data-x").value.length; i+=2) {
	  data_x.push(Number(document.getElementById("data-x").value[i]));
	  data_y.push(Number(document.getElementById("data-y").value[i]));
	  data_z.push(Number(document.getElementById("data-z").value[i]));
	}
	data = [{x:data_x,y:data_y,z:data_z,mode:"markers",type:"scatter3d"}];
    Plotly.newPlot("plot", data, layout);
  }
}

function csv() {
  document.getElementById("csv").click();
}

function loadCSV() {
  var reader = new FileReader();
  reader.onload = function() {
    data_x = [];
    data_y = [];
    data_z = [];
	document.getElementById("tmp").textContent = reader.result;
	var csv = $.csv.toObjects(document.getElementById("tmp").textContent);
	if (set == "2D") {
	  for (var i=0; i<csv.length; i++) {
	    data_x.push(csv[i]["x"]);
	    data_y.push(csv[i]["y"]);
	  }
	  data = [{x:data_x,y:data_y,mode:"markers",type:"scatter"}];
      Plotly.newPlot("plot", data, layout);
	} else if (set == "3D") {
	  for (var i=0; i<csv.length; i++) {
	    data_x.push(Number(csv[i]["x"]));
	    data_y.push(Number(csv[i]["y"]));
	    data_z.push(Number(csv[i]["z"]));
	  }
	  data = [{x:data_x,y:data_y,z:data_z,mode:"markers",type:"scatter3d"}];
      Plotly.newPlot("plot", data, layout);
	}
  };
  reader.readAsText(document.getElementById("csv").files[0]);
}
