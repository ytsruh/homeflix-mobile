import * as React from 'react';
import {Text, Pressable} from 'react-native';

export default function Button(props) {
  return (
    <Pressable
      onPress={props.press}
      className={`${props.bgColor} rounded-lg px-5 py-3`}>
      <Text className={`${props.textColor} ${props.bgColor} text-lg`}>
        {props.text}
      </Text>
    </Pressable>
  );
}

Button.defaultProps = {
  bgColor: 'bg-primary',
  textColor: 'text-salt',
};
