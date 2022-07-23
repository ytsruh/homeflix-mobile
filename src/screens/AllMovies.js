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
import DataError from '../components/DataError';
import Header from '../components/Header';
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
    <View className="h-full pt-8 bg-salt landscape:flex-none landscape:my-2">
      {data.length > 0 ? (
        <KeyboardAvoidingView behavior={'position'} style={{flex: 1}}>
          <FlatList
            data={filterMovies(data)}
            renderItem={item => (
              <MovieItem navigation={props.navigation} data={item} />
            )}
            keyExtractor={movie => movie._id}
            ListHeaderComponent={
              <Header
                setFilter={setFilter}
                title="Movies"
                img={img}
                text="The best action, comedy and all round great movies"
              />
            }
            numColumns={2}
            initialNumToRender={10}
          />
        </KeyboardAvoidingView>
      ) : (
        <DataError message="Sorry something went wrong, there are no movies here" />
      )}
    </View>
  );
}

const MovieItem = props => {
  const imageUrl = `https://homeflix-media.azureedge.net/images/movies/${props.data.item.imageName}`;
  return (
    <View
      style={{
        flex: 0.5, //Flex is equal to 1 divided by number of columns in FlatList
        flexDirection: 'column',
        margin: 2,
      }}>
      <TouchableWithoutFeedback
        onPress={() =>
          props.navigation.navigate('Single Movie', {data: props.data.item})
        }>
        <Image
          className="h-72 landscape:w-[400]"
          source={{
            uri: imageUrl,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
