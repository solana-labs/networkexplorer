// @flow
import {observer} from 'mobx-react-lite';
import {Container, Tabs, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {map, eq} from 'lodash/fp';
import React, {useState} from 'react';
import {Match} from 'react-router-dom';
import {ReactComponent as StarIcon} from 'v2/assets/icons/star.svg';
import SectionHeader from 'v2/components/UI/SectionHeader';
import HelpLink from 'v2/components/HelpLink';
import TypeLabel from 'v2/components/UI/TypeLabel';
import QRPopup from 'v2/components/QRPopup';
import CopyBtn from 'v2/components/UI/CopyBtn';
import Loader from 'v2/components/UI/Loader';

import TabNav from '../../UI/TabNav';
import ApplicationDetails from './Details';
import ApplicationCode from './Code';
import useStyles from './styles';
import ApplicationDetailStore from 'v2/stores/applications/detail';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {LAMPORT_SOL_RATIO} from 'v2/constants';

const ApplicationDetail = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {
    isLoading,
    applicationId,
    accountInfo,
    programAccounts,
    applicationView,
    timestamp,
  } = ApplicationDetailStore;

  if (applicationId !== match.params.id) {
    ApplicationDetailStore.init({applicationId: match.params.id});
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

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="Application Detail">
          <div className={classes.applicationTitle}>
            <span>{applicationId}</span>
            <CopyBtn text={applicationId} />
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
        {eq(0, tab) && <ApplicationDetails programAccounts={programAccounts} />}
        {eq(1, tab) && <ApplicationCode applicationView={applicationView} />}
      </div>
    </Container>
  );
};

export default observer(ApplicationDetail);
