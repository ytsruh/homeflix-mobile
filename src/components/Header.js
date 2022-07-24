import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import img from '../assets/movies.jpeg';

const Header = props => {
  return (
    <View>
      <View>
        <View className="p-3">
          <Text className="text-primary text-5xl">{props.title}</Text>
          <Text className="text-md text-slate">{props.text}</Text>
        </View>
        <Image source={props.img} className="h-48 landscape:h-48 w-full" />
      </View>
      {props.setFilter ? (
        <TextInput
          placeholder={'Filter'}
          placeholderTextColor="#36393B"
          onChangeText={text => props.setFilter(text)}
          className="w-100 p-3 m-3 border border-coal rounded-lg"
        />
      ) : (
        <View className="my-3 mx-5 border border-primary" />
      )}
    </View>
  );
};

Header.defaultProps = {
  title: 'Title',
  text: 'Description of the page',
  img: img,
};

export default Header;
