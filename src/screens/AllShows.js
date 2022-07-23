import React, {useState, useEffect, useContext} from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Button from '../components/Button';
import Loading from '../components/Loading';
import DataError from '../components/DataError';
import Header from '../components/Header';
import img from '../assets/shows.jpeg';
import {BASE_URL} from '../config';
import {FlatList} from 'react-native-gesture-handler';

export default function AllShows(props) {
  const {userToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/shows`, {
        headers: {token: userToken},
      });
      //Check for ok response
      if (!response.ok) {
        //Throw error if not ok
        throw Error(response.statusText);
      }
      // Set to json and store in state
      const shows = await response.json();
      setData(shows);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="h-full pt-8 bg-salt landscape:flex-none landscape:my-2">
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={item => (
            <ShowItem navigation={props.navigation} data={item} />
          )}
          keyExtractor={movie => movie._id}
          ListHeaderComponent={
            <Header
              title="Shows"
              img={img}
              text="Action, comedy & fantasy TV shows from 24 to Game of Thrones. Sit back
          & binge."
            />
          }
          numColumns={1}
          initialNumToRender={5}
        />
      ) : (
        <DataError message="Sorry something went wrong, there are no shows here" />
      )}
    </View>
  );
}

const ShowItem = props => {
  const imageUrl = `https://homeflix-media.azureedge.net/images/shows/${props.data.item.imageName}`;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        margin: 2,
      }}>
      <TouchableWithoutFeedback
        onPress={() =>
          props.navigation.navigate('Single Show', {data: props.data.item})
        }>
        <Image
          className="h-64 landscape:h-96"
          source={{
            uri: imageUrl,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
