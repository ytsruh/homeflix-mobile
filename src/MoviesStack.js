import * as React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Button from './components/Button';

const HomeStack = createNativeStackNavigator();

export default function MoviesStack() {
  return (
    <HomeStack.Navigator
      initialRouteName="All Movies"
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <HomeStack.Screen name="All Movies" component={AllMovies} />
      <HomeStack.Screen name="Single Movie" component={SingleMovie} />
    </HomeStack.Navigator>
  );
}

const AllMovies = props => {
  console.log(props);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-900">All Movies</Text>
      <Button
        press={() => props.navigation.navigate('Single Movie')}
        text="Single Movie"
      />
    </View>
  );
};

const SingleMovie = props => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Single Movie</Text>
      <Button
        press={() => props.navigation.navigate('All Movies')}
        text="All Movies"
      />
    </View>
  );
};
