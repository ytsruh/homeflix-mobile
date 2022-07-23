import React, {useContext, useState, useEffect} from 'react';
import {ScrollView, Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, AuthProvider} from '../context/AuthContext';
import {APP_VERSION} from '../config';
import img from '../assets/account.jpeg';
import Loading from '../components/Loading';
import Button from '../components/Button';

export default function Account() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {logout} = useContext(AuthContext);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      let raw = await AsyncStorage.getItem('userInfo');
      let userInfo = JSON.parse(raw);
      setUser(userInfo.userData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView className="h-full pt-8 bg-white landscape:flex-none landscape:my-2">
      <View>
        <View className="p-3">
          <Text className="text-primary text-5xl">Account</Text>
          <Text className="text-md">Your account & profile</Text>
        </View>
        <Image source={img} className="h-48 landscape:h-48 w-full" />
      </View>
      <View className="m-5">
        <Text className="text-primary text-xl py-2">
          Name : <Text className="text-lg">{user ? user.name : ''}</Text>
        </Text>
        <Text className="text-primary text-xl py-2">
          App Version : <Text className="text-lg">{APP_VERSION}</Text>
        </Text>
        <View className="flex-1 items-center py-5">
          <Button press={logout} text="Logout" />
        </View>
      </View>
    </ScrollView>
  );
}
