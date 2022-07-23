import React from 'react';
import {View, Text} from 'react-native';

export default function DataError(props) {
  return (
    <View className="flex-1 items-center justify-center px-10 bg-salt">
      <Text className="text-center text-lg text-primary">{props.message}</Text>
    </View>
  );
}

DataError.defaultProps = {
  message: 'Sorry something went wrong, there is no data here.',
};
