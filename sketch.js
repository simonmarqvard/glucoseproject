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
      data.days.forEach(function(day) {
        //  calculatePercentages();
        console.log(day)
        addDayMeasurement(day);
      });
    }
  })
}

// function calculatePercentages(day) {
//   day.measurements.forEach(function(measurement) {
//     var percentage = measurement["measurement_mgdl"] / 100;
//     console.log(percentage);
//   });
//   return percentage;
// }


var counter = 0;
var counter2 = 0;

function addDayMeasurement(day) {

  //console.log(day);
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

function buildDoughnutChart(day) {

  day.measurements.forEach(function(measurement) {
    var data = {
      labels: [
        "Hillary Clinton",
        "Donald Trump",
      ],
      datasets: [{
        data: [measurement["measurement_mgdl"], 5],
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
