import React, {useState, useEffect, useContext} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Button from '../components/Button';
import Loading from '../components/Loading';
import img from '../assets/movies.jpeg';
import {BASE_URL} from '../config';
import {FlatList} from 'react-native-gesture-handler';

export default function AllMovies(props) {
  const {userToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/movies`, {
        headers: {token: userToken},
      });
      //Check for ok response
      if (!response.ok) {
        //Throw error if not ok
        throw Error(response.statusText);
      }
      // Set to json and store in state
      const movies = await response.json();
      setData(movies);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const filterMovies = data => {
    return data.filter(movie =>
      movie.title.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View className="h-full pt-8 bg-white landscape:flex-none landscape:my-2">
      {data.length > 0 ? (
        <KeyboardAvoidingView behavior={'position'} style={{flex: 1}}>
          <FlatList
            nestedScrollEnabled
            data={filterMovies(data)}
            renderItem={item => (
              <MovieItem navigation={props.navigation} data={item} />
            )}
            keyExtractor={movie => movie._id}
            ListHeaderComponent={<Header setFilter={setFilter} />}
            numColumns={2}
          />
        </KeyboardAvoidingView>
      ) : (
        <NoMovies />
      )}
    </View>
  );
}

const Header = props => {
  return (
    <View>
      <View>
        <View className="p-3">
          <Text className="text-primary text-5xl">Movies</Text>
          <Text className="text-md">
            The best action, comedy and all round great movies
          </Text>
        </View>
        <Image source={img} className="h-48 landscape:h-48 w-full" />
      </View>
      <TextInput
        placeholder={'Filter'}
        onChangeText={text => props.setFilter(text)}
        className="w-100 p-3 m-3 border border-black rounded-lg"
      />
    </View>
  );
};

const NoMovies = () => {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <Text className="text-center text-lg">
        Sorry something went wrong, there are no movies here
      </Text>
    </View>
  );
};

const MovieItem = props => {
  const imageUrl = `https://homeflix-media.azureedge.net/images/movies/${props.data.item.imageName}`;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        margin: 2,
      }}>
      <TouchableWithoutFeedback
        onPress={() =>
          props.navigation.navigate('Single Movie', {data: props.data.item})
        }>
        <Image
          className="h-72 landscape:w-[400] w-full"
          source={{
            uri: imageUrl,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
