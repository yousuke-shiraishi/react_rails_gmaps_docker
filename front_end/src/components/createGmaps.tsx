import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { FormControl, Button, TextField } from '@material-ui/core';
import { Gmap } from './interface/Gmap';
import GmapFlagContext from '../components/context/GmapFlagContext';
import imageCompression from 'browser-image-compression';

const CreateGmap: React.FC = () => {
  const [image, setImage] = useState('');
  const { gflag, setGmapFlag } = useContext(GmapFlagContext);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [magicWord, setMagicWord] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const compressOption = {
    maxSizeMB: 0.005,
    maxWidthOrHeight: 200,
  };

  const handleImageSelect = async (e: React.FormEvent) => {
    if ((e.currentTarget as HTMLInputElement).files == null) {
      return;
    }
    const file = (e.currentTarget as HTMLInputElement).files![0];
    try {
      const compressFile = await imageCompression(file, compressOption);
      const url = await imageCompression.getDataUrlFromFile(compressFile);
      if (url) {
        setImage(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => (setLatitude(pos.coords.latitude), setLongitude(pos.coords.longitude)),
      (err) => console.log(err)
    );
  }, []);

  const createGmapsData = async () => {
    const requestParam: AxiosRequestConfig = {
      method: 'post',
      url: 'http://localhost:3000/api/v1/gmaps',
      params: {
        title: title,
        comment: comment,
        latitude: latitude,
        longitude: longitude,
        magic_word: magicWord,
        picture: image,
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
        setGmapFlag(!gflag);
      })
      .catch((error) => {
        alert(`Error ${error.message}`);
      });
  };

  return (
    <>
      <FormControl>
        <TextField
          type="text"
          name="title"
          label="タイトル:"
          value={title}
          placeholder="タイトルを入力してください"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)}
        />
        <br />
        <TextField
          type="text"
          name="comment"
          label="コメント:"
          value={comment}
          placeholder="コメントを入力してください"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setComment(e.target.value)}
        />
        <br />
        <TextField
          type="text"
          name="magic_word"
          label="マジックワード:"
          value={magicWord}
          placeholder="マジックワードを入力してください"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setMagicWord(e.target.value)}
        />
        <br />
        <TextField type="file" onChange={handleImageSelect} />
        <br />
        <Button type="submit" variant="contained" onClick={createGmapsData} color="primary">
          Gmapを作る
        </Button>
      </FormControl>
    </>
  );
};
export default CreateGmap;
