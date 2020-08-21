import React, { useContext } from 'react';
import Wrapper from '../layout/Wrapper';
import { AuthContext } from '../../context/auth/AuthContext';

const Profile = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <Wrapper>
      <p>This is the My Profile page</p>
      
  <p>{user.firstName} {user.lastName}</p>
  <p>Username: {user.username}</p>
      {/* Have a button that takes you to EditProfile so can update profile. Also have a button to delete account. */}
    </Wrapper>
  );
};

export default Profile;
