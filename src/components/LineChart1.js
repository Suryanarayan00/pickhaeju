import React from 'react';
import ChartBase from '#components/ChartBase';
import moment from 'moment';
import colors from '#common/colors';

const LineChart1 = ({ data, max }) => {
  if (!data) return null;

  const reduce = Object.keys(data)
    .map?.((key) => ({
      key,
      100: data[key]['100'],
      std: data[key]['std'],
    }))
    .filter((v) => v['100'] || v['std']);
  reduce.sort((a, b) => (a.key > b.key ? 1 : a.key < b.key ? -1 : 0));

  const rawData = {
    labels: reduce.map?.((v) => moment(v.key).format('YY.M.D')),
    datasets: [
      {
        label: '표준점수',
        backgroundColor: 'rgba(64, 196, 255, 0.1)',
        borderColor: '#469df6',
        borderWidth: 1,
        data: reduce.map?.((v) => v.std),
        fill: true,
        lineTension: 0,
        pointBackgroundColor: '#fff',
      },
      {
        label: '백분위',
        backgroundColor: 'rgba(64, 196, 255, 0.1)',
        borderColor: '#40c4ff',
        borderWidth: 1,
        data: reduce.map?.((v) => v['100']),
        fill: true,
        lineTension: 0,
        pointBackgroundColor: '#fff',
      },
    ],
  };

  const options = `{
    hover: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      datalabels: {
        color: function(context) {
          return context.active ? '${colors.darkPeriwinkle}' : 'transparent';
        },
        font: {
          family: 'Verdana',
          size: 9,
          weight: 'bold',
        },
        formatter: function(value, context) {
          return Math.floor(value);
        },
        textAlign: 'center',
        align: 'bottom'
      },
    },
    legend: {
      align: 'end',
      position: 'top',
      labels: {
        usePointStyle: true,
        boxWidth: 6
      },
    },
    responsive: true,
    tooltips: {
      enabled: false,
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            max: ${max || 200},
            stepSize: ${max >= 400 ? 100 : 50},
            min: 0,
            padding: 10,
            fontSize: 8,
            fontColor: '#b0bec5',
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 8,
            fontColor: '#b0bec5',
          },
        },
      ],
    },
  }`;

  return <ChartBase type={'line'} data={rawData} options={options} />;
};

export default LineChart1;
