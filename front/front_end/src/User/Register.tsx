import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppDispatch } from './features/login/store';
import { Profile } from '../components/interface/Profile';

import { fetchAsyncLogin, fetchAsyncRegister, fetchAsyncShowUserData } from './features/login/loginSlice';

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

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<Profile>({});

  const password = useRef('');
  password.current = watch('password', '') as string;
  const onSubmit: SubmitHandler<Profile> = (data: Profile) => user_register(data);
  const user_register = async (data: Profile) => {
    const result = await dispatch(fetchAsyncRegister({ ...data }));

    if (fetchAsyncRegister.fulfilled.match(result)) {
      await dispatch(fetchAsyncLogin({ ...data }));
      await dispatch(fetchAsyncShowUserData());
    }
  };

  const classes = useStyles();
  return (
    <>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <div>登録</div>
          </Typography>
          <span>名前</span>
          <TextField {...register('username', { required: true })} />
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
          <label>パスワード確認</label>
          <TextField
            type="password"
            {...register('password_confirmation', {
              validate: (value) => value === password.current || '確認用のパスワードが一致しません',
            })}
          />
          <br />
          {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}
          <br />
          <Button variant="contained" color="primary" type="submit">
            作成
          </Button>
        </div>
      </form>
    </>
  );
};

export default Register;
