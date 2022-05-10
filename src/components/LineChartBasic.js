import React from 'react';
import ChartBase from '#components/ChartBase';
import moment from 'moment';

const LineChartBasic = ({ data, max, min, reverse, height }) => {
  if (!data) return null;

  const items = [...data.items];
  const datasets = data.labels.map?.((row) => {
    return {
      label: row.text,
      backgroundColor: row.color_bg || 'transparent',
      borderColor: row.color,
      borderWidth: 1,
      data: items.map?.((v) => (v[row.key] == 0 ? undefined : v[row.key])),
      fill: true,
      lineTension: 0,
      pointBackgroundColor: '#fff',
      type: 'line',
    };
  });

  items.sort((a, b) =>
    a.exam_date > b.exam_date ? 1 : a.exam_date < b.exam_date ? -1 : 0,
  );

  const rawData = {
    labels: items.map?.((v) => moment(v.exam_date).format('YY.M.D')),
    datasets,
  };

  const options = `{
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
      position: 'average',
      enabled: false,
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
              label += ': ';
          }
          ${
            !reverse
              ? 'label += tooltipItem.yLabel;'
              : 'label += (10 - tooltipItem.yLabel);'
          }
          return label;
        }
      },
      custom: function(tooltipModel) {
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<div class="root"></div>';
          document.body.appendChild(tooltipEl);
        }
      
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
      
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }
      
        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map?.(getBody);
          var innerHtml = '';
          titleLines?.forEach?.(function(title) {
            innerHtml += '<b>20' + title + '</b>';
          });
          innerHtml += '<div class="row">';
          bodyLines?.forEach?.(function(body, i) {
            var ops = body[0].split(':');
            var data = ops[1];
            ${
              !reverse
                ? 'data = ops[1];'
                : 'data = (10 - parseInt(ops[1], 10));'
            }
            
            innerHtml += (bodyLines?.length > 5 ? '<div class="col">' : '<div>') + ops[0] + ' : ' + data + '</div>';
          });
          innerHtml += '</div>';
          var tableRoot = tooltipEl.querySelector('div.root');
          tableRoot.innerHTML = innerHtml;
        }
        var position = this._chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = 'auto';
        tooltipEl.style.bottom = '42px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      }
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            reverse: ${String(!!reverse)},      
            max: ${max || 200},
            min: ${min || 0},
            stepSize: ${max >= 400 ? 50 : max >= 50 ? 10 : 1},
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

  return (
    <ChartBase
      type={'bar'}
      data={rawData}
      options={options}
      height={height || 300}
    />
  );
};

export default LineChartBasic;
