import axios, { AxiosRequestConfig } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Gmap } from './interface/Gmap';
import { SearchPubObj } from './interface/SearchPubObj';
import GmapsContext from './context/GmapsContext';

const SearchPublic: React.FC = () => {
  const { setGmaps } = useContext(GmapsContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchPubObj>({});
  const getGmapsByPublic = async (data: SearchPubObj) => {
    const requestParam: AxiosRequestConfig = {
      method: 'get',
      url: process.env.REACT_APP_API_V1_URL + 'search_public',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
      params: {
        username: data.username,
        birth: data.birth,
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
  const onSubmit: SubmitHandler<SearchPubObj> = (data: SearchPubObj) => getGmapsByPublic(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前を入力"
          type="text"
          defaultValue=""
          {...register('username', { required: true })}
          placeholder="名前を入力してください"
        />
        <br />
        {errors.username?.type === 'required' && '名前を入力してください'}
        <br />
        <TextField type="date" defaultValue="" {...register('birth', { required: true })} />
        <br />
        {errors.birth?.type === 'required' && '検索したい人の誕生日を入力してください'}
        <br />
        <Button variant="contained" color="primary" type="submit">
          パブリック検索
        </Button>
      </form>
    </>
  );
};
export default SearchPublic;
