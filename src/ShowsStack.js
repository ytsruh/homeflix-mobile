import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllShows from './screens/AllShows';
import SingleShow from './screens/SingleShow';
import PlayShow from './screens/PlayShow';

const Stack = createNativeStackNavigator();

export default function ShowsStack() {
  return (
    <Stack.Navigator
      initialRouteName="All Shows"
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="All Shows" component={AllShows} />
      <Stack.Screen
        name="Single Show"
        component={SingleShow}
        options={({route}) => ({
          title: route.params.data.title,
          headerBackVisible: true,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="Play Show"
        component={PlayShow}
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
