import React from "react";
import BxDateTime from "./BxDateTime";
import BxEntityLink from "./BxEntityLink";
import BxHelpLink from "./BxHelpLink";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

class BxStatsTable extends React.Component {
    render() {
        const {globalStats} = this.props;

        let currentTpsKey = null;
        _.forEach(globalStats, (v, k) => {
            if (k && (k.indexOf("!txn-per-sec:") === 0)) {
                currentTpsKey = k;
            }
        });

        return (
            <Grid container justify="center" spacing={24} className="sideBySide">
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" align="center">
                                Current Leader
                                <BxHelpLink text="Leader" term="leader"/>
                            </Typography>
                            <Typography component="p" align="center">
                                <BxEntityLink node={globalStats['!ent-last-leader']} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Block Height
                                <BxHelpLink text="Block Height" term="block-height"/>
                            </Typography>
                            <Typography component="p" align="center">
                                {globalStats['!blk-last-slot']}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Current TPS
                                <BxHelpLink text="Current Transactions Per Second" term="transaction"/>
                            </Typography>
                            <Typography component="p" align="center">
                                {globalStats[currentTpsKey] || "0"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Peak TPS
                                <BxHelpLink text="Peak Transactions Per Second" term="transaction"/>
                            </Typography>
                            <Typography component="p" align="center">
                                {globalStats['!txn-per-sec-max']}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Total Transactions
                                <BxHelpLink text="All-Time Total Transactions" term="transaction"/>
                            </Typography>
                            <Typography component="p" align="center">
                                {globalStats['!txn-count']}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="h2">
                                Last
                                Updated
                            </Typography>
                            <Typography component="p" align="center">
                                <BxDateTime dateTime={globalStats['!ent-last-dt']} fromNow />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
            ;
    }
}

export default BxStatsTable;
