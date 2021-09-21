import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { FormControl, Button, TextField } from '@material-ui/core';
import GmapFlagContext from './context/GmapFlagContext';



const CreateGmap: React.FC = () => {
  const [image, setImage] = useState<string>('');
  const { gflag, setGmapFlag } = useContext(GmapFlagContext);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [magicWord, setMagicWord] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const handleImageSelect = async (e: React.FormEvent) => {


    if ((e.currentTarget as HTMLInputElement).files == null) {
      return;
    }

    const file = (e.currentTarget as HTMLInputElement).files![0];


    const baseUrl = process.env.REACT_APP_API_V1_URL
    const presignedObject = await axios.get(`${baseUrl}presigned-url?filename=${file.name}`)
        .then(response => response.data)
        .catch(e => console.log(e.message))

    const formData = new FormData()
    for (const key in presignedObject.fields) {
        formData.append(key, presignedObject.fields[key])
    }


    formData.append('file', file)


    await axios.post(presignedObject.url, formData, {
        headers: {
            'accept': 'multipart/form-data'
        }
    })
        .then((response) => {

            const matchedObject = response.data.match(/<Location>(.*?)<\/Location>/)
            const s3Url = unescape(matchedObject[1])
            console.log(s3Url);
            setImage(s3Url);
        })
        .catch(e => console.log(e.message))
    }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => (setLatitude(pos.coords.latitude), setLongitude(pos.coords.longitude)),
      (err) => console.log(err)
    );
  }, []);

  const createGmapsData = async () => {
    const requestParam: AxiosRequestConfig = {
      method: 'post',
      url: process.env.REACT_APP_API_V1_URL,
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
      .then(() => {
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
export default React.memo(CreateGmap);
