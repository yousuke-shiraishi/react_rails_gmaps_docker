import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Profile } from '../components/interface/Profile';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { selectProfile, fetchAsyncUpdate } from './features/login/loginSlice';
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UpdateProfile: React.FC = () => {
  const profile = useSelector(selectProfile, shallowEqual);
  const dispatch = useDispatch();

  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({});

  const onSubmit: SubmitHandler<Profile> = (data: Profile) => {
    dispatch(fetchAsyncUpdate(data));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div>
          <div>現在の登録データ</div>
          <div>{profile.username}</div>
          <div>{profile.email}</div>
          <div>{profile.birth}</div>
        </div>
        <br />
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <div>データを更新</div>
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <span>ユーザー名</span>
            <TextField type="text" {...register('username', { required: true })} />
            <br />
            {errors.username?.type === 'required' && '名前を入力してください'}
            <br />
            <span>メールアドレス</span>
            <TextField type="email" {...register('email', { required: true })} />
            <br />
            {errors.email?.type === 'required' && 'メールアドレスを入力してください'}
            <br />
            <span>誕生日</span>
            <TextField type="date" {...register('birth', { required: true })} />
            <br />
            {errors.birth?.type === 'required' && '誕生日を入力してください'}
            <br />
            <Button variant="contained" color="primary" type="submit">
              更新
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
export default UpdateProfile;
