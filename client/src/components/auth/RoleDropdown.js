import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '300px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      
      <FormControl className={classes.formControl}>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role"
          id="role"
          value={role}
          onChange={handleChange}
        >
          <MenuItem value={''}>Please select your typical role on projects...</MenuItem>
          <MenuItem value={'Developer'}>Developer</MenuItem>
          <MenuItem value={'Manager'}>Manager</MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}
