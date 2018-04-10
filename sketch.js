var ddata = []

function initialize() {
  //  getData();
  buildDoughnutChart();
}

//
// function getData() {
//   $.ajax({
//     url: "glucose.json",
//     dataType: "json",
//     error: function(err) {
//       console.log(err)
//     },
//     success: function(data) {
//       console.log("data is served")
//       console.log(data)
//     }
//   })
// }

function buildDoughnutChart() {


  var data = {
    labels: [
      "Hillary Clinton",
      "Donald Trump",
    ],
    datasets: [{
      data: [80, 20],
      backgroundColor: [
        "#179ee0",
        "#fff",
      ],
      hoverBackgroundColor: [
        "#1594d2",
        "#f0563a",
      ]
    }]
  };

  // create chart options (this is optional)
  // see list of options:
  // http://www.chartjs.org/docs/latest/charts/doughnut.html
  var options = {
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        fontColor: '#fff'
      },
    },
    tooltips: {
      backgroundColor: '#222',
    },
    animation: {
      animateScale: false
    }
  }

  // first, get the context of the canvas where we're drawing the chart
  var ctx = document.getElementById("myChart").getContext("2d");

  // now, create the doughnut chart, passing in:
  // 1. the type (required)
  // 2. the data (required)
  // 3. chart options (optional)
  myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
  });

  var ctx = document.getElementById("my2Chart").getContext("2d");

  // now, create the doughnut chart, passing in:
  // 1. the type (required)
  // 2. the data (required)
  // 3. chart options (optional)
  myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
  });

  var ctx = document.getElementById("my3Chart").getContext("2d");

  // now, create the doughnut chart, passing in:
  // 1. the type (required)
  // 2. the data (required)
  // 3. chart options (optional)
  myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
  });
}

//
// function setup() {
//   noCanvas();
// }
//
// function draw() {
//   background(220);
// }
//
//
// function gotdata() {
//   for (var i = 0; i < 3; i++) {
//     //  console.log(data.measurements[i].dailydata.lunch.ingredients);
//     ddata.push(data.measurements[i].dailydata.lunch.ingredients);
//     console.log(ddata)
//   }
//
//   $("#test").append(ddata)
//
// }
