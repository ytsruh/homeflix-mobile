import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import Button from '../components/Button';
import loginImg from '../assets/login.jpg';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submitForm = () => {
    console.log(email);
    console.log(password);
  };

  return (
    <SafeAreaView class="flex-1">
      <ScrollView className="my-8 px-3 bg-white landscape:flex-none landscape:my-2">
        <View className="flex-1 items-center">
          <Text className="text-4xl text-center text-red-600 my-3">
            Welcome to Homeflix
          </Text>
          <Image
            source={loginImg}
            className="h-96 landscape:h-48 w-full rounded-lg "
          />
        </View>
        <View className="flex-1">
          <TextInput
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={text => setEmail(text)}
            className="my-3 p-3 border border-black rounded-lg"
          />
          <TextInput
            placeholder={'Password'}
            keyboardType={'default'}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            className="my-3 p-3 border border-black rounded-lg"
          />
          <View className="flex-1 items-center py-3">
            <Button text="Login" press={() => submitForm()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
