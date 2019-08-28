// @flow
import {Container, Tabs, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {map, eq} from 'lodash/fp';
import React, {useState} from 'react';
import {ReactComponent as StarIcon} from 'v2/assets/icons/star.svg';
import SectionHeader from 'v2/components/UI/SectionHeader';
import HelpLink from 'v2/components/HelpLink';
import TypeLabel from 'v2/components/UI/TypeLabel';
import QRPopup from 'v2/components/QRPopup';
import CopyBtn from 'v2/components/UI/CopyBtn';

import TabNav from '../../UI/TabNav';
import ApplicationDetails from './Details';
import ApplicationCode from './Code';
import useStyles from './styles';

const TransactionDetail = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const verticalTable = useMediaQuery(theme.breakpoints.down('xs'));

  const handleTabChange = (event, tab) => setTab(tab);

  const specs = [
    {
      label: 'Balance',
      hint: '',
      value: '0.006 SOL | $1.12',
    },
    {
      label: 'Type',
      hint: '',
      value() {
        return (
          <div className={classes.types}>
            <TypeLabel type="system" label="system" />
            <TypeLabel type="consensus" label="consensus" />
          </div>
        );
      },
    },
    {
      label: 'Nickname',
      hint: '',
      value: 'Testname',
    },
    {
      label: 'Description',
      hint: '',
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  const renderSpec = ({label, value}: {label: string, value: string}) => (
    <li key={label}>
      <div className={classes.label}>
        {label}
        <HelpLink term="" text="" />
      </div>
      <div className={classes.value}>
        {typeof value === 'function' ? value() : value}
      </div>
    </li>
  );

  const tabNav = ['Details', 'code/course'];

  const renderTabNav = label => <TabNav key={label} label={label} />;

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="Application Detail">
          <div className={classes.blockTitle}>
            <span>
              0x03e125a40b39a637028bce780af3544e51cfa2f61abbe7c8ec8059f7178bce74
            </span>
            <CopyBtn text={'123'} />
            <QRPopup />
            <button>
              <StarIcon />
            </button>
          </div>
        </SectionHeader>
        <div className={classes.body}>
          <ul className={classes.spec}>{map(renderSpec)(specs)}</ul>
        </div>
        <Tabs
          orientation={verticalTable ? 'vertical' : 'horizontal'}
          className={classes.tabs}
          classes={{indicator: classes.indicator}}
          value={tab}
          variant="fullWidth"
          onChange={handleTabChange}
        >
          {map(renderTabNav)(tabNav)}
        </Tabs>
        {eq(0, tab) && <ApplicationDetails />}
        {eq(1, tab) && <ApplicationCode />}
      </div>
    </Container>
  );
};

export default TransactionDetail;
