import React, { Fragment } from 'react';
import PlainHeader from '../layout/PlainHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../layout/Footer';

const Forum = (props) => {
  return (
    <Fragment>
      <CssBaseline />
      <PlainHeader />
      <main>
        <p>This is the Forum page</p>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Forum;
