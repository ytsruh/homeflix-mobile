import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
import Button from '../components/Button';
import Loading from '../components/Loading';
import {FlatList} from 'react-native-gesture-handler';

export default function SingleShow(props) {
  const data = props.route.params.data;
  console.log(data);
  const imageUrl = `https://homeflix-media.azureedge.net/images/shows/${data.imageName}`;
  const {userToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [episodes, setEpisodes] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/shows/${data._id}`, {
        headers: {token: userToken},
      });
      //Check for ok response
      if (!response.ok) {
        //Throw error if not ok
        throw Error(response.statusText);
      }
      // Set to json and store in state
      const showData = await response.json();
      setEpisodes(showData.episodes);
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
    <FlatList
      data={episodes}
      renderItem={item => (
        <Row data={item} navigation={props.navigation} showTitle={data.title} />
      )}
      keyExtractor={(item, i) => i}
      ListHeaderComponent={<Header img={imageUrl} />}
      numColumns={1}
      initialNumToRender={10}
    />
  );
}

const Row = props => {
  const data = props.data.item;
  return (
    <View className="flex flex-row justify-between p-2 bg-salt items-center">
      <Text className="basis-1/12 text-center">{data.seasonNumber}</Text>
      <Text className="basis-1/12 text-center">{data.episodeNumber}</Text>
      <Text className="basis-8/12 text-center">{data.title}</Text>
      <View className="basis-2/12 ">
        <Button
          text=">"
          press={() =>
            props.navigation.navigate('Play Show', {
              data: {...data, showName: props.showTitle},
            })
          }
        />
      </View>
    </View>
  );
};

const Header = props => {
  return (
    <View className="flex-1">
      <Image
        className="h-64"
        source={{
          uri: props.img,
        }}
      />
      <View className="flex flex-row justify-between py-3 px-2 bg-salt">
        <Text className="basis-1/12 text-primary text-center text-lg">S</Text>
        <Text className="basis-1/12 text-primary text-center text-lg">E</Text>
        <Text className="basis-8/12 text-primary text-center text-lg">
          Title
        </Text>
        <Text className="basis-2/12 text-salt">Button</Text>
      </View>
    </View>
  );
};
