import * as React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Button from './components/Button';
import AllMovies from './screens/AllMovies';
import SingleMovie from './screens/SingleMovie';
import PlayMovie from './screens/PlayMovie';

const Stack = createNativeStackNavigator();

export default function MoviesStack() {
  return (
    <Stack.Navigator
      initialRouteName="All Movies"
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="All Movies" component={AllMovies} />
      <Stack.Screen
        name="Single Movie"
        component={SingleMovie}
        options={({route}) => ({
          title: route.params.data.title,
          headerBackVisible: true,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="Play Movie"
        component={PlayMovie}
        options={({route}) => ({
          title: route.params.data.title,
          headerBackVisible: true,
          headerBackTitle: 'Back',
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
}
