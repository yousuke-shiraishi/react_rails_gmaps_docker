import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AppDispatch } from './features/login/store';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchAsyncLogin, fetchAsyncShowUserData } from './features/login/loginSlice';
import { LoginParams } from '../components/interface/LoginParams';

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

const Login: React.FC = () => {
  const onSubmit: SubmitHandler<LoginParams> = (data: LoginParams) => LoginToPage(data);
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginParams>({});

  const LoginToPage = async (data: LoginParams) => {
    await dispatch(fetchAsyncLogin(data));
    await dispatch(fetchAsyncShowUserData());
  };

  const classes = useStyles();
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <div>ログイン</div>
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <span>メールアドレス</span>
            <TextField type="email" {...register('email', { required: true })} />
            <br />
            {errors.email?.type === 'required' && 'メールアドレスを入力してください'}
            <br />
            <span>パスワード</span>
            <TextField
              type="password"
              {...register('password', {
                required: 'パスワードを指定する必要があります',
                minLength: {
                  value: 8,
                  message: 'パスワードは少なくとも８文字以上です',
                },
              })}
            />
            <br />
            {errors.password && <p>{errors.password.message}</p>}
            <br />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default React.memo(Login);
