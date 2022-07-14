import * as React from 'react';
import {Text, Pressable} from 'react-native';

export default function Button(props) {
  return (
    <Pressable
      onPress={props.press}
      className="bg-red-500 rounded-lg px-5 py-3">
      <Text className="text-white text-lg">{props.text}</Text>
    </Pressable>
  );
}
