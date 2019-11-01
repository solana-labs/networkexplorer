// @flow
import {observer} from 'mobx-react-lite';
import {Container, Tabs, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {map} from 'lodash/fp';
import React, {useEffect, useState} from 'react';
import {Match} from 'react-router-dom';
import SectionHeader from 'v2/components/UI/SectionHeader';
import TypeLabel from 'v2/components/UI/TypeLabel';
import QRPopup from 'v2/components/QRPopup';
import CopyBtn from 'v2/components/UI/CopyBtn';
import Loader from 'v2/components/UI/Loader';
import ProgramDetailStore from 'v2/stores/programs/detail';
import AddToFavorites from 'v2/components/AddToFavorites';
import InfoRow from 'v2/components/InfoRow';
import TabNav from 'v2/components/UI/TabNav';
import asTime from 'v2/utils/asTime';
import currentURL from 'v2/utils/currentURL';

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
    init,
  } = ProgramDetailStore;

  useEffect(() => {
    init({programId: match.params.id});
  }, [init, match.params.id]);

  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const verticalTable = useMediaQuery(theme.breakpoints.down('xs'));

  if (isLoading) {
    return (
      <Container className={classes.loader}>
        <Loader width="533" height="290" />
      </Container>
    );
  }

  if (!accountInfo) return null;

  const handleTabChange = (event, tab) => setTab(tab);

  const specs = [
    {
      label: 'Balance',
      hint: '',
      value: `${accountInfo.balance} SOL`,
    },
    {
      label: 'Type',
      hint: '',
      value: (
        <div className={classes.types}>
          TODO
          <TypeLabel type="system" label="system" />
          <TypeLabel type="consensus" label="consensus" />
        </div>
      ),
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
      value: asTime(timestamp),
    },
  ];

  const renderSpec = info => <InfoRow key={info.label} {...info} />;

  const tabNav = ['Accounts', 'code/source'];
  const tabs = {
    0: <ProgramDetails programAccounts={programAccounts} />,
    1: <ProgramCode programView={programView} />,
  };
  const renderTabNav = label => <TabNav key={label} label={label} />;
  const url = currentURL();
  const favoritesData = {
    id: programId,
    type: accountInfo.type,
  };

  return (
    <Container>
      <SectionHeader title="Program Detail">
        <div className={classes.programTitle}>
          <span>{programId}</span>
          <CopyBtn text={programId} />
          <QRPopup url={url} />
          <AddToFavorites item={favoritesData} type="programs" />
        </div>
      </SectionHeader>
      <div className={classes.body}>
        <div className={classes.spec}>{map(renderSpec)(specs)}</div>
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
      {tabs[tab]}
    </Container>
  );
};

export default observer(ProgramDetail);
