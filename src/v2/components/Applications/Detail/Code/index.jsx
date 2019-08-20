import React from 'react';
import HelpLink from 'v2/components/HelpLink';
import CopyBtn from 'v2/components/UI/CopyBtn';

import useStyles from './styles';

const ApplicationCode = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.header}>
        <CopyBtn text={'123'} />
        <HelpLink text="" term="" />
      </div>
      <div className={classes.code}>
        <code>
          h: "759" data: h: 759 l: HzMrRwLN9DUoNXREAHGBVYqUqus3Xg6o8oNebN5BTwj5
          s: 95 dt: 2019-06-03T15:10:29.255772558Z id:
          5CpdpKwKUBJdnMFjajJamGd2u7poZBkcqXVqPugnEN4QVQhSzGrbzMtzUkkLiAAoaNTLuJfCgyAdHEzAuwz1dioT
          entry_id: 2iEcjGA5zGQKt9JGpdrpmTBWZJg1XBzQfTx8Lj6Q5rtW
        </code>
      </div>
    </div>
  );
};

export default ApplicationCode;
