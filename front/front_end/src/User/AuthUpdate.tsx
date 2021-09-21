import React, { useRef } from 'react';
import { TextField } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UpdatePW } from '../components/interface/UpdatePW';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { fetchAsyncPassWdUpdate } from './features/login/loginSlice';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UpdatePassWord: React.FC = () => {
  console.log('UpdatePassWord');
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UpdatePW>({});
  const password = useRef({});
  password.current = watch('password', '');
  const onSubmit: SubmitHandler<UpdatePW> = (data) => dispatch(fetchAsyncPassWdUpdate(data));
  return (
    <>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <label>新しいパスワード</label>
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
          更新
        </Button>
      </form>
    </>
  );
};

export default UpdatePassWord;
