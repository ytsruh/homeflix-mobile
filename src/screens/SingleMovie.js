import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../components/Button';
import Loading from '../components/Loading';
import {FlatList} from 'react-native-gesture-handler';

export default function SingleMovie(props) {
  const data = props.route.params.data;
  console.log(data);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>{data.title}</Text>
      <Button
        press={() => props.navigation.navigate('All Movies')}
        text="All Movies"
      />
    </View>
  );
}
