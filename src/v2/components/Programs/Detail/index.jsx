// @flow
import {observer} from 'mobx-react-lite';
import {Container, Tabs, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {map, eq} from 'lodash/fp';
import React, {useState} from 'react';
import {Match} from 'react-router-dom';
import SectionHeader from 'v2/components/UI/SectionHeader';
import HelpLink from 'v2/components/HelpLink';
import TypeLabel from 'v2/components/UI/TypeLabel';
import QRPopup from 'v2/components/QRPopup';
import CopyBtn from 'v2/components/UI/CopyBtn';
import Loader from 'v2/components/UI/Loader';
import ProgramDetailStore from 'v2/stores/programs/detail';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {LAMPORT_SOL_RATIO} from 'v2/constants';
import AddToFavorites from 'v2/components/AddToFavorites';

import TabNav from '../../UI/TabNav';
import ProgramDetails from './Details';
import ProgramCode from './Code';
import useStyles from './styles';

const ProgramDetail = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {
    isLoading,
    programId,
    accountInfo,
    programAccounts,
    programView,
    timestamp,
  } = ProgramDetailStore;

  if (programId !== match.params.id) {
    ProgramDetailStore.init({programId: match.params.id});
  }

  const asTime = x => {
    return formatDistanceToNow(Date.parse(x), {addSuffix: true});
  };

  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const verticalTable = useMediaQuery(theme.breakpoints.down('xs'));

  if (isLoading) {
    return <Loader width="533" height="290" />;
  }

  if (!accountInfo) return null;

  const handleTabChange = (event, tab) => setTab(tab);

  const specs = [
    {
      label: 'Balance',
      hint: '',
      value: `${(accountInfo.lamports * LAMPORT_SOL_RATIO).toFixed(8)} SOL`,
    },
    {
      label: 'Type',
      hint: '',
      value() {
        return (
          <div className={classes.types}>
            TODO
            <TypeLabel type="system" label="system" />
            <TypeLabel type="consensus" label="consensus" />
          </div>
        );
      },
    },
    {
      label: 'Nickname',
      hint: '',
      value: accountInfo.data,
    },
    {
      label: 'Description',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'Last Called',
      hint: '',
      value: timestamp && asTime(timestamp),
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

  const tabNav = ['Accounts', 'code/source'];

  const renderTabNav = label => <TabNav key={label} label={label} />;
  const url = window.location.href;
  const favoritesData = {
    id: programId,
    type: accountInfo.type,
  };

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="Program Detail">
          <div className={classes.programTitle}>
            <span>{programId}</span>
            <CopyBtn text={programId} />
            <QRPopup url={url} />
            <AddToFavorites item={favoritesData} type="programs" />
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
        {eq(0, tab) && <ProgramDetails programAccounts={programAccounts} />}
        {eq(1, tab) && <ProgramCode programView={programView} />}
      </div>
    </Container>
  );
};

export default observer(ProgramDetail);
