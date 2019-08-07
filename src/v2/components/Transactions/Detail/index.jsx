// @flow
import {Container, Tabs, Tab, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {map, eq} from 'lodash/fp';
import React, {useState} from 'react';
import arrowIcon from 'v2/assets/icons/arrow-right-green.png';
import arrowDarkIcon from 'v2/assets/icons/arrow-right-dark.png';
import SectionHeader from 'v2/components/UI/SectionHeader';

import HelpLink from 'v2/components/HelpLink';
import QRPopup from 'v2/components/QRPopup';
import CopyBtn from '../../UI/CopyBtn';

import ApplicationsTab from './ApplicationsTab';
import ApplicationStatus from './Status';
import useStyles from './styles';

const TransactionDetail = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const verticalTabs = useMediaQuery(theme.breakpoints.down('sm'));
  const handleTabChange = (event, tab) => setTab(tab);

  const specs = [
    {
      label: 'Time',
      hint: '',
      value: '06/05/2019 11:27AM',
    },
    {
      label: 'Fee',
      hint: '',
      value: '0.006 SOL | $0.60',
    },
    {
      label: 'Block',
      hint: '',
      value: '7887219',
    },
    {
      label: 'Confirmations',
      hint: '',
      value: '1,245',
    },
    {
      label: 'Value',
      hint: '',
      value: '0.006 SOL | $0.60',
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

  const tabNav = ['Applications: 3', 'status: success', 'code/course'];

  const renderTabNav = label => (
    <Tab
      key={label}
      classes={{
        root: classes.tab,
        selected: classes.tabSelected,
      }}
      component={({className, 'aria-selected': selected, onClick}) => {
        return (
          <div className={className} onClick={onClick}>
            {label}
            <img src={selected ? arrowDarkIcon : arrowIcon} width={52} alt="" />
          </div>
        );
      }}
    />
  );

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="Transaction Detail">
          <div className={classes.blockTitle}>
            <span>
              0x03e125a40b39a637028bce780af3544e51cfa2f61abbe7c8ec8059f7178bce74
            </span>
            <CopyBtn text="123" />
            <QRPopup />
          </div>
        </SectionHeader>
        <div className={classes.body}>
          <ul className={classes.spec}>{map(renderSpec)(specs)}</ul>
        </div>
        <Tabs
          orientation={verticalTabs ? 'vertical' : 'horizontal'}
          className={classes.tabs}
          classes={{indicator: classes.indicator}}
          value={tab}
          variant="fullWidth"
          onChange={handleTabChange}
        >
          {map(renderTabNav)(tabNav)}
        </Tabs>
        {eq(0, tab) && <ApplicationsTab />}
        {eq(1, tab) && <ApplicationStatus />}
      </div>
    </Container>
  );
};

export default TransactionDetail;
