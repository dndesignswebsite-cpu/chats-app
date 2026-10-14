import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function MessageBubble({
  message,
}) {
  const isUser =
    message.role === "user";

  return (
    <View
      style={[
        styles.wrapper,
        isUser
          ? styles.userWrapper
          : styles.assistantWrapper,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser
            ? styles.userBubble
            : styles.assistantBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isUser && styles.userText,
          ]}
        >
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
    paddingHorizontal: 12,
  },

  userWrapper: {
    alignItems: "flex-end",
  },

  assistantWrapper: {
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 14,
  },

  userBubble: {
    backgroundColor: "#111",
  },

  assistantBubble: {
    backgroundColor: "#e9e9e9",
  },

  text: {
    fontSize: 15,
    color: "#111",
  },

  userText: {
    color: "#fff",
  },
});