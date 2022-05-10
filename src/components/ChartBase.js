import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import WebView from 'react-native-webview';

const ChartBase = ({ type, data, options, height }) => {
  const { width } = Dimensions.get('screen');
  const [loading, setLoading] = useState(true);

  const webview = useRef();
  useEffect(() => {
    if (loading) return;

    const jsOptions =
      typeof options === 'string' ? options : JSON.stringify(options);
    webview.current?.injectJavaScript(`
      if (!window.chartview) {
        window.chartview = new Chart(
          document.getElementById('myChart'), 
          {
            'type': '${type}',
            'data': ${JSON.stringify(data)},
            'options': ${jsOptions}
          }
        );
      }
      else {
        window.chartview.data = ${JSON.stringify(data)};
        window.chartview.options = ${jsOptions};
        window.chartview.update();
      }
    `);
  }, [loading, data, options]);

  const html = useMemo(() => {
    return `
      <html>
        <head>
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
          <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3"></script>
          <style>
            #chartjs-tooltip {
              box-sizing: border-box;
              background-color: rgba(0,0,0,0.7);
              color: #fff;
              font-size: 10px;
              width: 80px;
              transform: translateX(-40px);
              padding: 3px;
              border-radius: 2px;
            }
            #chartjs-tooltip b {
              box-sizing: border-box;
              display: block;
              text-align: center;
              line-height: 12px;
              font-size: 10px;
            }
            #chartjs-tooltip .row {
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              margin-top: 2px;
              margin-left: -2px;
              margin-right: -2px;
              padding: 0px;
            }
            #chartjs-tooltip .row > div {
              box-sizing: border-box;
              display: flex;
              flex: 1;
              white-space: nowrap;
              font-size: 10px;
              line-height: 12px;
              letter-spacing: -1px;
              padding: 2px;
            }
            #chartjs-tooltip .row .col {
              min-width: 50%;
              margin: 0px;
              line-height: 10px;
            }
          </style>

        </head>
        <body style="margin: 0px; padding: 0px;">
          <div id="chart-legends"></div>
          <canvas id="myChart" width="${width}" height="${
      height || 240
    }"></canvas>
        </body>
      </html>
      `;
  }, [width]);

  return (
    <WebView
      ref={webview}
      source={{ html }}
      allowFileAccess={true}
      javaScriptEnabled={true}
      style={{ height: height || 240, marginTop: 10 }}
      overScrollMode={'never'}
      scrollEnabled={false}
      startInLoadingState
      onLoadEnd={() => setLoading(false)}
      onMessage={({ nativeEvent }) => console.log(nativeEvent.data)}
    />
  );
};

export default React.memo(ChartBase);
