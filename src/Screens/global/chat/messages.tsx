import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { adjustSize, colors } from "../../../theme";
import { MessageBubble } from "../../../Components/tenant/MessageBubble";
import { Screen, Text } from "../../../Components";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import Feather from "@expo/vector-icons/Feather";

interface IMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isOwn: boolean;
  avatar: string; // 👈 added avatar
}

export const Message = (props:any) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: "1",
      sender: "Property Manager",
      message: "Hello! How can I help you today?",
      time: "10:30 AM",
      isOwn: false,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg", // receiver avatar
    },
    {
      id: "2",
      sender: "You",
      message: "Hi, I have a question about my lease agreement.",
      time: "10:32 AM",
      isOwn: true,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg", // sender avatar
    },
    {
      id: "3",
      sender: "Property Manager",
      message:
        "Sure! What would you like to know? I can help you with any questions about your lease terms, renewal options, or any other concerns.",
      time: "10:33 AM",
      isOwn: false,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "4",
      sender: "You",
      message: "I wanted to ask about the pet policy. Can I get a small dog?",
      time: "10:35 AM",
      isOwn: true,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "5",
      sender: "Property Manager",
      message:
        "Let me check your lease agreement. Small dogs under 25 lbs are allowed with a pet deposit of $200. Would you like me to send you the pet application form?",
      time: "10:37 AM",
      isOwn: false,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: IMessage = {
        id: Date.now().toString(),
        sender: "You",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const renderMessage = ({ item }: { item: IMessage }) => (
    <View
      style={[styles.messageRow, item.isOwn ? styles.rowRight : styles.rowLeft]}
    >
      {!item.isOwn && (
        <Image source={{ uri: item.avatar }} style={styles.avatarBubble} />
      )}

      <MessageBubble
        message={item.message}
        time={item.time}
        isOwn={item.isOwn}
        sender={item.isOwn ? undefined : item.sender}
      />

      {item.isOwn && (
        <Image source={{ uri: item.avatar }} style={styles.avatarBubble} />
      )}
    </View>
  );

  return (
    <Screen
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={styles.container}
    >
      {/* Header */}

      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.5} onPress={() =>props.navigation.goBack()}
            style={{marginRight:5}}
            >
            <Ionicons name="arrow-back" size={20} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color={colors.white} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Amelia Greene</Text>
            <Text style={styles.headerSubtitle}>Online</Text>
          </View>
        </View>
      </View>

      <View style={styles._orderview}>
        <Text
          text="Work Order: 123456"
          weight="semiBold"
          style={styles._ordernum}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message here"
            placeholderTextColor={colors.grey}
            multiline
            maxLength={500}
          />
          <TouchableOpacity style={styles.attachButton}>
            <WithLocalSvg asset={Images.upload} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.sendButton, message.trim() && styles.sendButtonActive]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Feather
            name="send"
            size={24}
            color={message.trim() ? colors.white : colors.primary}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageRow: {
    flexDirection: "row",
    // alignItems: "flex-end",
    marginVertical: 6,
  },
  rowLeft: {
    justifyContent: "flex-start",
  },
  rowRight: {
    justifyContent: "flex-end",
  },
  avatarBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 8,
  },
  inputContainer: {
    flexDirection: "row",
    padding: adjustSize(14),
    alignItems: "flex-end",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.fill,
    borderRadius: adjustSize(5),
    paddingHorizontal: adjustSize(10),
    marginRight: 12,
    borderWidth: 0.4,
    borderColor: colors.greylight,
    height: adjustSize(40),
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    color: colors.text,
    fontSize: 14,
  },
  attachButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    backgroundColor: colors.fill,
    width: adjustSize(40),
    height: adjustSize(40),
    borderRadius: adjustSize(5),
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: colors.primary,
  },
  _orderview: {
    backgroundColor: "#29276633",
    padding: adjustSize(10),
  },
  _ordernum: {
    textAlign: "center",
    color: colors.white,
  },
});