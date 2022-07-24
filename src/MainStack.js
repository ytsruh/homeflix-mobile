import 'react-native-gesture-handler';
import React, {useContext} from 'react';
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
import {AuthContext, AuthProvider} from './context/AuthContext';
import Loading from './components/Loading';
import LoginScreen from './screens/LoginScreen';
import MoviesStack from './MoviesStack';
import ShowsStack from './ShowsStack';
import Account from './screens/Account';

const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#D6220E',
        tabBarInactiveTintColor: '#3f3f46',
        tabBarActiveBackgroundColor: '#f9fafb',
        tabBarInactiveBackgroundColor: '#f9fafb',
        headerShown: false,
        tabBarStyle: {marginBottom: 5},
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
        component={ShowsStack}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <TvFill fill={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <GearFill fill={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  const {userToken, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-salt">
      <NavigationContainer>
        {userToken ? <MainApp /> : <LoginScreen />}
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default MainStack;
