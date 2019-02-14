import React from "react";
import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';


const chartOptions = {
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

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
    offsetGridLines: false
};

class BxTransactionChart extends React.Component {
    render() {
        const {txnStats} = this.props;

        if (_.size(txnStats) === 0) {
            return (<Paper style={{width: "1460px"}}>
                <Typography>No Data Present - Loading...</Typography>
            </Paper>);
        }
        let theData = _(txnStats).values().map((x) => parseInt(x || "0")).value();
        let data = {
            labels: _.keys(txnStats),
            datasets: [{
                label: "Transactions Per Minute",
                data: theData
            }]
        };
        return (
            <Grid container justify="center">
                <Grid item>
                    <Paper style={{width: "1460px"}}>
                        <Line data={data} options={chartOptions} height={200} width={400}/>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default BxTransactionChart;