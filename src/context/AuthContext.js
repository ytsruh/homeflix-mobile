import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      //Check for ok response
      if (!response.ok) {
        //Throw error if not ok
        throw Error(response.statusText);
      }
      // Set to json, put token in storage & redirect
      const data = await response.json();
      setUserToken(data.token);
      setUserInfo(data);
      AsyncStorage.setItem('userToken', data.token);
      AsyncStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem('userToken');
      let user = await AsyncStorage.getItem('userInfo');
      setUserToken(token);
      setUserInfo(user);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, logout, isLoading, userToken, userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
