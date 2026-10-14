import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { getChatById } from "../api/chats";

import MessageBubble from "../components/MessageBubble";

export default function ChatDetailsScreen({
  route,
}) {
  const { chatId } = route.params;

  const [chat, setChat] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadChat();
  }, []);

  const loadChat = async () => {
    try {
      const result =
        await getChatById(chatId);

      setChat(result.data);
    } catch (error) {
      console.log(
        "Chat detail error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!chat) {
    return (
      <View style={styles.center}>
        <Text>
          Chat not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.visitor}>
          {chat.visitorId}
        </Text>

        <Text style={styles.conversation}>
          {chat.conversationId}
        </Text>
      </View>

      <FlatList
        data={chat.messages || []}
        keyExtractor={(_, index) =>
          index.toString()
        }
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
          />
        )}
        contentContainerStyle={
          styles.messages
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  visitor: {
    fontSize: 17,
    fontWeight: "700",
  },

  conversation: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  messages: {
    paddingVertical: 12,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});