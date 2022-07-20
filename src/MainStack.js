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
import Loading from './components/Loading';
import Button from './components/Button';
import MoviesStack from './MoviesStack';
import LoginScreen from './screens/LoginScreen';
import {AuthContext, AuthProvider} from './context/AuthContext';

function ShowsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>TV Shows</Text>
    </View>
  );
}

function AccountScreen() {
  const {userInfo, logout} = useContext(AuthContext);
  //const name = userInfo.userData.name;
  console.log(userInfo);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Account</Text>
      <Text>{userInfo.userData.name}</Text>
      <Button press={logout} text="Logout" />
    </View>
  );
}

const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
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
  );
};

const MainStack = () => {
  const {userToken, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        {userToken ? <MainApp /> : <LoginScreen />}
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default MainStack;
