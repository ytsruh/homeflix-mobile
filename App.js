import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GearFill from 'react-native-bootstrap-icons/icons/gear-fill';
import CameraReelsFill from 'react-native-bootstrap-icons/icons/camera-reels-fill';
import TvFill from 'react-native-bootstrap-icons/icons/tv-fill';

import MoviesStack from './src/MoviesStack';

function ShowsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>TV Shows</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Account</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'grey',
          headerShown: false,
        })}>
        <Tab.Screen
          name="Movies"
          component={MoviesStack}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <CameraReelsFill fill={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Shows"
          component={ShowsScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <TvFill fill={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <GearFill fill={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
