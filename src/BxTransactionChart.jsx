import React from 'react';
import BxDateTime from './BxDateTime';
import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

const chartOptions = {
  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,

  //String - Colour of the grid lines
  scaleGridLineColor: 'rgba(0,0,0,.05)',

  //Number - Width of the grid lines
  scaleGridLineWidth: 1,

  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  //Boolean - Whether the line is curved between points
  bezierCurve: false,

  //Number - Tension of the bezier curve between points
  bezierCurveTension: 0.4,

  //Boolean - Whether to show a dot for each point
  pointDot: true,

  //Number - Radius of each point dot in pixels
  pointDotRadius: 4,

  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth: 1,

  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius: 20,

  //Boolean - Whether to show a stroke for datasets
  datasetStroke: true,

  //Number - Pixel width of dataset stroke
  datasetStrokeWidth: 2,

  //Boolean - Whether to fill the dataset with a colour
  datasetFill: true,

  //Boolean - Whether to horizontally center the label and point dot inside the grid
  offsetGridLines: false,
};

class BxTransactionChart extends React.Component {
  render() {
    const {txnStats} = this.props;

    if (_.size(txnStats) === 0) {
      return (
        <Grid container justify="center">
          <Grid item>
            <Paper style={{width: '1460px', padding:'16px'}}>
              <Typography>No Data Present - Loading...</Typography>
            </Paper>
          </Grid>
        </Grid>
      );
    }

    let theLabels = _.keys(txnStats).map(x =>
      BxDateTime.formatDateTime(x, {
        style: BxDateTime.ISO8601_FMT,
        local: true,
      }),
    );
    let theData = _(txnStats)
      .values()
      .map(x => parseFloat(x || '0.0') / 60.0)
      .value();
    let data = {
      labels: theLabels,
      datasets: [
        {
          label: 'Average TPS',
          data: theData,
          pointBackgroundColor: '#2BFEBC',
          borderColor: '#2BFEBC',
        },
      ],
    };

    let theOptions = {...chartOptions};
    theOptions.legend = {
      labels: {
        fontColor: '#D0D0D0',
      },
    };

    theOptions.scales = {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: `Minute of Day : ${theLabels[0]} - ${
              theLabels[theLabels.length - 1]
            }`,
            fontColor: '#D0D0D0',
          },
          ticks: {
            callback: x => {
              // time only
              return x.split(' ').pop();
            },
            fontColor: '#D0D0D0',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: '#D0D0D0',
          },
        },
      ],
    };

    return (
      <Grid container justify="center">
        <Grid item>
          <Paper style={{width: '1460px'}}>
            <Line data={data} options={theOptions} height={200} width={400} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default BxTransactionChart;
