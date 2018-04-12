var ddata = []
var timeslots;

function initialize() {
  getData();
  referenceChart();
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
      data.days.forEach(function(day) {
        //  calculatePercentages();
        console.log(day)
        addDayMeasurement(day);
      });
    }
  })
}

function calculatePercentages(value) {
  var percentage = value / 100;
  console.log(percentage);
  return percentage;
}


var counter = 0;
var counter2 = 0;

function addDayMeasurement(day) {

  var dayHtml = '<div class= dayColumn>';
  // add specific timeslots
  day.measurements.forEach(function(measurement) {
    counter++
    var timeslot =
      '<div class =' + measurement["label"] + '>' +
      '<div class="description">' + measurement["measurement_mgdl"] + '</div>' +
      '<div id="chart-container">' + '<canvas id="myChart' + counter + '" + width="100%" height="100%">' +
      '</canvas>' + '</div>' +
      '</div>'
    //concatenate string (push them together)
    dayHtml += timeslot;
  });

  dayHtml += '</div>';

  $('.days').append(dayHtml);
  buildDoughnutChart(day);
}

var GlobalChartReferenceValues = [100, 80, 20, 80];
var i = -1;
// build myDoughnutChart for each time each day


function buildDoughnutChart(day) {

  day.measurements.forEach(function(measurement) {
    var adjusted = calculatePercentages(measurement["measurement_mgdl"])

    i++

    if (i > 3) {
      i = 0;
    }
    console.log(i + "coun")

    var data = {
      labels: [
        "Hillary Clinton",
        "Donald Trump",
      ],
      datasets: [{
        data: [measurement["measurement_mgdl"], GlobalChartReferenceValues[i]],
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

    counter2++

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
        animateScale: false,
        duration: 5000
      },
    }
    // first, get the context of the canvas where we're drawing the chart
    var ctx = document.getElementById("myChart" + counter2).getContext("2d");
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
  console.log(counter)
}


// ReferenceChart

function referenceChart() {
  //the real values for reference chart
  var refvalues = [100, 110, 140, 110];

  for (var i = 0; i <= 3; i++) {
    var values = refvalues[i];
    var chartReferenceValues = GlobalChartReferenceValues[i]

    var data = {
      labels: [
        "Ref-Value",
        "extra",
      ],
      datasets: [{
        data: [values, chartReferenceValues],
        backgroundColor: [
          "red",
          "white",
        ],
        hoverBackgroundColor: [
          "#1594d2",
          "#f0563a",
        ]
      }]
    };


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
        animateScale: false,
        duration: 5000
      },
    }
    // first, get the context of the canvas where we're drawing the chart
    var xpos = document.getElementById("my" + [i] + "Chart").getContext("2d");
    // now, create the doughnut chart, passing in:
    // 1. the type (required)
    // 2. the data (required)
    // 3. chart options (optional)
    myDoughnutChart = new Chart(xpos, {
      type: 'doughnut',
      data: data,
      options: options
    });
  }
}
