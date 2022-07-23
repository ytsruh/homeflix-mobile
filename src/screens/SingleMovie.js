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
  const imageUrl = `https://homeflix-media.azureedge.net/images/movies/${data.imageName}`;
  return (
    <ScrollView className="flex-1 bg-salt px-2 py-5">
      <View className="flex-row">
        <View className="w-1/2">
          <Image
            className="h-64 landscape:w-[400] w-full rounded-sm"
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <View className="w-1/2 px-5">
          <Text className="text-center text-primary text-2xl py-2">
            {data.title}
          </Text>
          <Text className="text-center text-md text-slate py-2">
            Release Year: {data.releaseYear}
          </Text>
          <Text className="text-center text-md text-slate py-2">
            Duration : {data.duration}
          </Text>
        </View>
      </View>
      <View className="my-5 p-2 border border-slate rounded-lg">
        <Text className="text-lg text-slate">{data.description}</Text>
      </View>
      <View className="flex-row justify-around py-5">
        <Button
          press={() => props.navigation.navigate('Play Movie', {data: data})}
          text="Play"
        />
      </View>
    </ScrollView>
  );
}
