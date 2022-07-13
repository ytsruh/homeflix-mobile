import * as React from 'react';
import {Text, View, Pressable} from 'react-native';
import {Link} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

export default function MoviesStack() {
  return (
    <HomeStack.Navigator
      initialRouteName="All Movies"
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <HomeStack.Screen name="All Movies" component={AllMovies} />
      <HomeStack.Screen name="No Movies" component={NoMovies} />
    </HomeStack.Navigator>
  );
}

const AllMovies = props => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-900">All Movies</Text>
      <Pressable
        onPress={() => props.navigation.navigate('No Movies')}
        className="bg-red-500 rounded-lg px-5 py-3">
        <Text className="text-white">I'm pressable!</Text>
      </Pressable>
    </View>
  );
};

const NoMovies = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>No Movies</Text>
      <Link to={{screen: 'All Movies'}}>All Movies</Link>
    </View>
  );
};
