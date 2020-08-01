import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { AuthContext } from '../../context/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertBanner = (props) => {
  const classes = useStyles();

  const { userErrors } = useContext(
    AuthContext,
  );

  return (
    <div className={classes.root}>
      {/* {userErrors !== null &&
        userErrors.length > 0 &&
        userErrors.map((el, index) => (
          <Alert severity='error' key={index}>
            {el.msg}
          </Alert>
        ))} */}
    </div>
  );
};

export default AlertBanner;
