import React from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function ChatListItem({
  chat,
  onPress,
}) {
  const lastMessage =
    chat.messages?.[
      chat.messages.length - 1
    ];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View>
        <Text style={styles.visitor}>
          {chat.visitorId ||
            "Unknown Visitor"}
        </Text>

        <Text
          style={styles.message}
          numberOfLines={1}
        >
          {lastMessage?.content ||
            "No messages"}
        </Text>

        <Text style={styles.count}>
          {chat.messageCount || 0} messages
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  visitor: {
    fontSize: 16,
    fontWeight: "700",
  },

  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },

  count: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
});