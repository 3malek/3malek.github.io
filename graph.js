/* globals Chart:false */

function chartValues(graphDataBtc, graphDataXau, graphDataXag, graphDataXpt, graphDataUsd, graphDataEur, graphDataChf) {
//console.log("Sent via function: " + graphDataBtc);

(() => {

  'use strict'

  // Graph 1
  const ctx = document.getElementById('myChart')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '4 days',
        '3 days',
        '2 days before',
        'Yesterday',
        'Today'
      ],
      datasets:
      [
      {
        data: graphDataBtc,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'darkred',
        borderWidth: 2,
        pointBackgroundColor: 'darkred'
      },
      {
        data: graphDataXau,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'gold',
        borderWidth: 5,
        pointBackgroundColor: 'gold'
      }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          boxPadding: 3
        }
      }
    }
  })

})();


(() => {
  'use strict'

  // Graph 2
  const ctx = document.getElementById('myChart2')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '4 days',
        '3 days',
        '2 days before',
        'Yesterday',
        'Today'
      ],
      datasets:
      [
        {
            data: graphDataXag,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: 'silver',
            borderWidth: 4,
            pointBackgroundColor: 'silver'
        },
        {
            data: graphDataXpt,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#E5E4E2',
            borderWidth: 7,
            pointBackgroundColor: '#E5E4E2'
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          boxPadding: 3
        }
      }
    }
  })
})();

(() => {
  'use strict'

  // Graph 3
  const ctx = document.getElementById('myChart3')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '4 days',
        '3 days',
        '2 days before',
        'Yesterday',
        'Today'
      ],
      datasets:
      [
        {
            data: graphDataUsd,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: 'darkblue',
            borderWidth: 4,
            pointBackgroundColor: 'darkblue'
        },
        {
            data: graphDataEur,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: 'purple',
            borderWidth: 3,
            pointBackgroundColor: 'purple'
        },
        {
            data: graphDataChf,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: 'darkgreen',
            borderWidth: 2,
            pointBackgroundColor: 'darkgreen'
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          boxPadding: 3
        }
      }
    }
  })
})();

}