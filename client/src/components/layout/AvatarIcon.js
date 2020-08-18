import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { AuthContext } from '../../context/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function AvatarIcon(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar style={{height: '30px', width: '30px', margin: '0px'}}>{props.user}</Avatar>
    </div>
  );
}
