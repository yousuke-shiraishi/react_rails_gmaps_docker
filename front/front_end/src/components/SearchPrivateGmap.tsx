import axios, { AxiosRequestConfig } from 'axios';
import { Button, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { Gmap } from './interface/Gmap';
import GmapsContext from './context/GmapsContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SearchPriObj } from './interface/SearchPriObj';

const SearchPrivate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchPriObj>({});

  const onSubmit: SubmitHandler<SearchPriObj> = (data) => GetGmapsByPrivate(data);
  const { setGmaps } = useContext(GmapsContext);
  const GetGmapsByPrivate = async (data: SearchPriObj) => {
    const requestParam: AxiosRequestConfig = {
      method: 'get',
      url: process.env.REACT_APP_API_V1_URL + 'search_private',
      params: {
        email: data.email,
        magic_word: data.magicWord,
      },
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      },
    };
    await axios(requestParam)
      .then(({ data }) => {
        const apiResponse: Gmap[] = data;
        setGmaps(apiResponse);
      })
      .catch((error) => {
        alert(`Error ${error.message}`);
      });
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <span>メールアドレス</span>
        <TextField type="email" defaultValue="" {...register('email', { required: true })} />
        <br />
        {errors.email?.type === 'required' && 'メールアドレスを入力してください'}
        <br />
        <span>マジックワード</span>
        <TextField type="text" defaultValue="" {...register('magicWord', { required: true })} />
        <br />
        {errors.magicWord?.type === 'required' && '秘密の言葉を入力してください'}
        <br />
        <Button variant="contained" color="primary" type="submit">
          プライベート検索
        </Button>
      </form>
    </>
  );
};
export default SearchPrivate;
