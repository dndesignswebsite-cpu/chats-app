import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ChatDetailsScreen from "../screens/ChatDetailsScreen";

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Chats"
          component={ChatsScreen}
          options={{
            title: "Chats",
          }}
        />

        <Stack.Screen
          name="ChatDetails"
          component={
            ChatDetailsScreen
          }
          options={{
            title: "Conversation",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}