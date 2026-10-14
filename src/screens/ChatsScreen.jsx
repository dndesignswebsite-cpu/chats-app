import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getChats } from "../api/chats";
import ChatListItem from "../components/ChatListItem";

export default function ChatsScreen({
  navigation,
}) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [refreshing, setRefreshing] =
    useState(false);

  const loadChats = async () => {
    try {
      const result = await getChats(1, 20);

      console.log(
        "CHAT API RESPONSE:",
        result
      );

      setChats(
        result.data?.chats || []
      );
    } catch (error) {
      console.log(
        "Chats loading error:",
        error
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadChats();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadChats();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Chats
        </Text>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) =>
          item._id
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({ item }) => (
          <ChatListItem
            chat={item}
            onPress={() =>
              navigation.navigate(
                "ChatDetails",
                {
                  chatId: item._id,
                }
              )
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>
              No chats found
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    padding: 18,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    padding: 40,
    alignItems: "center",
  },
});