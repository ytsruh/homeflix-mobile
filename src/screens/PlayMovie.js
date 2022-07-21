import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';

export default function PlayMovie(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const data = props.route.params.data;
  const url = `https://homeflix-media.azureedge.net/movies/${encodeURIComponent(
    data.fileName,
  )}`;
  console.log(url);
  const videoError = e => {
    console.log(e);
    setLoading(false);
    setError(true);
  };
  const loaded = () => {
    setLoading(false);
  };
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {loading ? <Loading /> : ''}
      {error ? (
        <Error />
      ) : (
        <Video
          source={{
            uri: url,
          }}
          style={{height: 300, width: '100%'}}
          controls={true}
          onError={videoError}
          onLoad={loaded}
        />
      )}
    </View>
  );
}

const Loading = () => {
  return <Text className="py-5 text-xl text-primary">Loading</Text>;
};

const Error = () => {
  return (
    <Text className="py-5 text-xl text-primary">
      Error : This file could not be loaded
    </Text>
  );
};
