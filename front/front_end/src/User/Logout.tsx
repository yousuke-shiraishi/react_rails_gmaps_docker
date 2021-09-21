import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { selectIsLoginView, logout, setFalseMode } from './features/login/loginSlice';
import { Redirect } from 'react-router-dom';
import { AppDispatch } from './features/login/store';

const Logout: React.FC = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsLoginView);

  const handleClick = () => {
    return <Redirect to="/" />;
  };

  return isAuthenticated ? (
    <>
      <Container component="main" maxWidth="xs">
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            dispatch(logout());
            dispatch(setFalseMode());
            handleClick();
          }}
          {...props}
        >
          Logout
        </Button>
      </Container>
    </>
  ) : null;
};

export default Logout;
