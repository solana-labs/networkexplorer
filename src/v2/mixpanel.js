import mixpanel from 'mixpanel-browser';
mixpanel.init('a733ed40b877d30ff2a1a58b4e326cf0');

const isProduction = process.env.NODE_ENV === 'production';

export default {
  identify: id => {
    if (isProduction) mixpanel.identify(id);
  },
  alias: id => {
    if (isProduction) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (isProduction) mixpanel.track(name, props);
  },
  people: {
    set: props => {
      if (isProduction) mixpanel.people.set(props);
    },
  },
};
