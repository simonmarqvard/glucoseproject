var ddata = []
var timeslots;

function initialize() {
  getData();
}


function getData() {
  $.ajax({
    url: "glucose2.json",
    dataType: "json",
    error: function(err) {
      console.log(err)
    },
    success: function(data) {
      window.data = data;
      console.log("data is served");
      //  console.log(data);
      data.days.forEach(function(day) {
        //console.log("YEAH");
        //  calculatePercentages();
        addDayMeasurement(day);
      });
    }
  })
}

function buildDoughnutChart(day) {

  day.measurements.forEach(function(measurement) {
    var data = {
      labels: [
        "Hillary Clinton",
        "Donald Trump",
      ],
      datasets: [{
        data: [measurement["measurement_mgdl"]],
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
  });
}

// function calculatePercentages(day) {
//   day.measurements.forEach(function(measurement) {
//     var percentage = measurement["measurement_mgdl"] / 100;
//     console.log(percentage);
//   });
//   return percentage;
// }



function addDayMeasurement(day) {


  //console.log(day);
  var dayHtml = '<div class= dayColumn>';

  // add specific timeslots
  day.measurements.forEach(function(measurement) {
    // console.log(measurement["measurement_mgdl"])
    var timeslot =
      '<div class =' + measurement["label"] + '>' +
      '<div class="description">' + measurement["measurement_mgdl"] + '</div>' +
      '<div id="chart-container">' + '<canvas id="myChart" width="100%" height="100%">' +
      '</canvas>' + '</div>' +
      '</div>'
    //concatenate string (push them together)
    dayHtml += timeslot;
  });

  dayHtml += '</div>';

  $('.days').append(dayHtml);

  buildDoughnutChart(day);

}


// function addTimeslot(currentday) {
//   var timeslot =
//     '<div class = "fasted">' +
//     '<div class="description">' + 'HELLO' + '</div>' +
//     '<div id="chart-container">' + '<canvas id="myChart" width="100%" height="100%">' +
//     '</canvas>' + '</div>' +
//     '</div>'
//
//   return $('.dayColumn').append(timeslot)
//
// }

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
