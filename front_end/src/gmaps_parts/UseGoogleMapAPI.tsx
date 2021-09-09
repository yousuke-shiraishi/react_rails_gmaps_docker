// import axios, { AxiosRequestConfig } from 'axios'
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { GoogleMap, LoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import { Gmap } from '../components/interface/Gmap';
import GmapFlagContext from '../components/context/GmapFlagContext';
// import { GmapsState } from '../components/context/GmapRecoil';
// import { useRecoilState } from 'recoil';
import GmapsContext from '../components/context/GmapsContext';

const containerStyle = {
  width: '600px',
  height: '600px',
};

const MainGmaps: React.FC = () => {
  console.log('MainGmaps');
  // const [gmaps, setGmaps] = useRecoilState(GmapsState);
  const { gmaps, setGmaps } = useContext(GmapsContext);
  const [selected, setSelected] = useState<Gmap>();
  const { gflag } = useContext(GmapFlagContext);
  const rebuildComment = (str: string, length: number) => {
    const resultArr: string[] = [];
    if (!str || !length || length < 1) {
      return resultArr;
    }
    let result = '';
    let index = 0;
    let start = index;
    let end = start + length;
    while (start < str.length) {
      resultArr[index] = str.substring(start, end);
      index++;
      start = end;
      end = start + length;
    }
    result = resultArr.join('<br>');
    return result;
  };
  // , mgmaps: Gmap[]
  const DeleteMarker = async (marker: Gmap) => {
    if (confirm('本当に削除しますか?削除すると戻せません。')) {
      await axios
        .delete(`http://localhost:3000/api/v1/gmaps/${marker.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          },
        })
        .then((res) => {
          const marker_id = res.data.mid;
          const newGmaps: Gmap[] = gmaps.filter((g: Gmap) => g.id !== marker_id);
          setGmaps(newGmaps), alert('マーカーを削除しました');
        })
        .catch(() => {
          alert('他人のマーカーは消せません');
        });
    }
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get('http://localhost:3000/api/v1/gmaps')
        .then((res) => setGmaps(res.data))
        .catch((error) => console.log(error));
    }
    fetchData();
  }, [gflag]);
  // )

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap
          zoom={8}
          mapContainerStyle={containerStyle}
          center={{
            lat: 35.454082,
            lng: 139.49701,
          }}
        >
          {gmaps.length
            ? gmaps.map((marker: Gmap) => (
                <Marker
                  key={marker.id}
                  position={{
                    lat: marker.latitude,
                    lng: marker.longitude,
                  }}
                  onMouseOver={() => {
                    setSelected(marker);
                  }}
                />
              ))
            : null}

          {selected ? (
            <InfoWindow
              key={selected.id}
              position={{
                lat: selected.latitude,
                lng: selected.longitude,
              }}
            >
              <div>
                <a href={selected.picture?.url} target="_blank" rel="noreferrer">
                  <img className="picture" src={selected.picture?.url} alt="" width="150px" height="auto" />
                </a>
                <div>
                  <p>{selected.title}</p>
                </div>
                <div>
                  <p>{rebuildComment(selected.comment, 30)}</p>
                </div>
                <div>
                  <input type="button" value="マーカーを削除する" onClick={() => DeleteMarker(selected)} />
                </div>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default React.memo(MainGmaps);
