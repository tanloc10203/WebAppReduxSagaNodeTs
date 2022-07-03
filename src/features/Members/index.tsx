import { Box, Button, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useAxiosJwt } from 'hooks';
import { loginSelectors } from '../auth/authSlice';
import { memberActions, memberIsFetchingSelector, membersSelector } from './memberSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(2),
  },
  box: {
    textAlign: 'center',
    background: '#ddd',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}));

export default function Members() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const users = useAppSelector(membersSelector);
  const loading = useAppSelector(memberIsFetchingSelector);
  const { accessToken } = useAppSelector(loginSelectors);
  const axiosJwt = useAxiosJwt(dispatch);

  useEffect(() => {
    dispatch(memberActions.fetchMemberStart({ accessToken: accessToken, axiosJwt: axiosJwt }));
  }, [dispatch, axiosJwt, accessToken]);

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress />}
      <Grid container>
        {users?.map((user) => (
          <Grid key={user.id} item lg={3} md={6} sm={6} className={classes.box}>
            <Typography variant="h4" component="h4">
              {user.firstName} {user.lastName}
            </Typography>

            <Typography variant="h5" component="h5">
              {user.email}
            </Typography>
            <Button color="secondary" variant="contained">
              Xóa
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
