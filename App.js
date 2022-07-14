import 'react-native-gesture-handler';
import * as React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GearFill from 'react-native-bootstrap-icons/icons/gear-fill';
import CameraReelsFill from 'react-native-bootstrap-icons/icons/camera-reels-fill';
import TvFill from 'react-native-bootstrap-icons/icons/tv-fill';
import Button from './src/components/Button';
import MoviesStack from './src/MoviesStack';
import LoginScreen from './src/screens/LoginScreen';

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
const loggedIn = false;
export default function App() {
  if (loggedIn) {
    return (
      <SafeAreaView className="flex-1">
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
      </SafeAreaView>
    );
  } else {
    return <LoginScreen />;
  }
}
