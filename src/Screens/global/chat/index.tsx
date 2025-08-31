// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
//   TextInput,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { colors } from "../../../theme";
// import { MessageBubble } from "../../../Components/tenant/MessageBubble";

// interface ChatMessage {
//   id: string;
//   sender: string;
//   message: string;
//   time: string;
//   isOwn: boolean;
// }

// export const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: "1",
//       sender: "Property Manager",
//       message: "Hello! How can I help you today?",
//       time: "10:30 AM",
//       isOwn: false,
//     },
//     {
//       id: "2",
//       sender: "You",
//       message: "Hi, I have a question about my lease agreement.",
//       time: "10:32 AM",
//       isOwn: true,
//     },
//     {
//       id: "3",
//       sender: "Property Manager",
//       message:
//         "Sure! What would you like to know? I can help you with any questions about your lease terms, renewal options, or any other concerns.",
//       time: "10:33 AM",
//       isOwn: false,
//     },
//     {
//       id: "4",
//       sender: "You",
//       message: "I wanted to ask about the pet policy. Can I get a small dog?",
//       time: "10:35 AM",
//       isOwn: true,
//     },
//     {
//       id: "5",
//       sender: "Property Manager",
//       message:
//         "Let me check your lease agreement. Small dogs under 25 lbs are allowed with a pet deposit of $200. Would you like me to send you the pet application form?",
//       time: "10:37 AM",
//       isOwn: false,
//     },
//   ]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const newMessage: ChatMessage = {
//         id: Date.now().toString(),
//         sender: "You",
//         message: message.trim(),
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         isOwn: true,
//       };
//       setMessages([...messages, newMessage]);
//       setMessage("");
//     }
//   };

//   const renderMessage = ({ item }: { item: ChatMessage }) => (
//     <MessageBubble
//       message={item.message}
//       time={item.time}
//       isOwn={item.isOwn}
//       sender={item.isOwn ? undefined : item.sender}
//     />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <View style={styles.avatar}>
//             <Ionicons name="person" size={20} color={colors.white} />
//           </View>
//           <View>
//             <Text style={styles.headerTitle}>Property Manager</Text>
//             <Text style={styles.headerSubtitle}>Online now</Text>
//           </View>
//         </View>
//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.headerButton}>
//             <Ionicons name="call-outline" size={24} color={colors.primary} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerButton}>
//             <Ionicons
//               name="videocam-outline"
//               size={24}
//               color={colors.primary}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Chat List */}
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.id}
//         style={styles.messagesList}
//         contentContainerStyle={styles.messagesContent}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Quick Actions */}
//       <View style={styles.quickActions}>
//         <TouchableOpacity style={styles.quickActionButton}>
//           <Ionicons name="build-outline" size={16} color={colors.primary} />
//           <Text style={styles.quickActionText}>Maintenance</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.quickActionButton}>
//           <Ionicons
//             name="help-circle-outline"
//             size={16}
//             color={colors.primary}
//           />
//           <Text style={styles.quickActionText}>Support</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.quickActionButton}>
//           <Ionicons name="calendar-outline" size={16} color={colors.primary} />
//           <Text style={styles.quickActionText}>Schedule</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Input Area */}
//       <View style={styles.inputContainer}>
//         <View style={styles.inputWrapper}>
//           <TextInput
//             style={styles.textInput}
//             value={message}
//             onChangeText={setMessage}
//             placeholder="Type a message..."
//             placeholderTextColor={colors.textDim}
//             multiline
//             maxLength={500}
//           />
//           <TouchableOpacity style={styles.attachButton}>
//             <Ionicons name="attach-outline" size={20} color={colors.textDim} />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//           style={[styles.sendButton, message.trim() && styles.sendButtonActive]}
//           onPress={sendMessage}
//           disabled={!message.trim()}
//         >
//           <Ionicons name="send" size={20} color={colors.white} />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: colors.white,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: colors.primary,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: colors.text,
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: "#4CAF50",
//     marginTop: 2,
//   },
//   headerActions: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerButton: {
//     padding: 8,
//     marginLeft: 8,
//   },
//   messagesList: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   messagesContent: {
//     paddingVertical: 16,
//   },
//   quickActions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: colors.white,
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//   },
//   quickActionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.fill,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 16,
//   },
//   quickActionText: {
//     marginLeft: 4,
//     fontSize: 12,
//     color: colors.primary,
//     fontWeight: "500",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     padding: 16,
//     alignItems: "flex-end",
//     backgroundColor: colors.white,
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//   },
//   inputWrapper: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.fill,
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 12,
//   },
//   textInput: {
//     flex: 1,
//     maxHeight: 100,
//     color: colors.text,
//     fontSize: 14,
//   },
//   attachButton: {
//     padding: 4,
//     marginLeft: 8,
//   },
//   sendButton: {
//     backgroundColor: colors.textDim,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sendButtonActive: {
//     backgroundColor: colors.primary,
//   },
// });

import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import {
  Screen,
  Text,
  Button,
  CustomTabs,
  TextField,
  Header2,
} from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing, adjustSize, typography } from "../../../theme";
import { NewMessageIcon, HistoryIcon2 } from "../../../assets/svg";
import { WithLocalSvg } from "react-native-svg/css";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";

export function Chat() {
  const navigation: any = useNavigation();

  /** ---------- STATES ---------- */
  const [activeTab, setActiveTab] = useState<"New message" | "History">(
    "New message"
  );

  // form fields
  const [fromEmail, setFromEmail] = useState("facilitymanager@gmail.com");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  // toggles
  const [sendEmail, setSendEmail] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);

  // history dummy data
  const usersData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Amelia Greene`,
    avatar: `https://i.pravatar.cc/100?img=${i + 1}`,
    message: "Hello Amelia! I want to talk about 2 bedroom apartments",
    date: "24 June, 2024",
  }));

  /** ---------- COMPONENTS ---------- */
  const ToggleRow = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
  }) => {
    return (
      <View style={styles.toggleRow}>
        <Text weight="semiBold" style={styles.toggleLabel}>
          {label}
        </Text>
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ false: colors.greylight, true: colors.primary }}
          thumbColor={colors.white}
        />
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Message")}
      style={[
        styles.chatItem,
        {
          backgroundColor: index % 2 === 0 ? "transparent" : "#dedff0",
        },
      ]}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.itemHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text
            style={[
              styles.date,
              {
                color: index % 2 === 0 ? "#B0B0B0" : "#FFFFFF",
              },
            ]}
          >
            {item.date}
          </Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  /** ---------- HANDLERS ---------- */
  const handleSend = () => {
    console.log({
      fromEmail,
      toEmail,
      subject,
      messageBody,
      sendEmail,
      sendMessage,
    });
    // TODO: API integration here
  };

  /** ---------- UI ---------- */
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Chat" />

      <View style={styles.container}>
        <FlatList
          data={usersData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

        <TouchableOpacity activeOpacity={0.6} style={styles.messageBtn}>
          <WithLocalSvg asset={Images.messageIcon} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

/** ---------- STYLES ---------- */
const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    paddingHorizontal: adjustSize(10),
    height: adjustSize(80),
  },
  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  username: {
    fontSize: adjustSize(12),
    color: colors.primary,
    lineHeight: adjustSize(20),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  role: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  profile: {
    height: adjustSize(44),
    width: adjustSize(44),
    borderRadius: 100,
    backgroundColor: colors.fill,
  },
  headerHeading: {
    fontSize: adjustSize(24),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
    flex: 1,
    lineHeight: adjustSize(50),
  },
  avatar: {
    height: adjustSize(62),
    width: adjustSize(62),
    borderRadius: adjustSize(62 / 2),
  },
  chatItem: {
    flexDirection: "row",
    paddingHorizontal: adjustSize(10),
    paddingVertical: adjustSize(20),
  },
  info: {
    flex: 1,
    marginLeft: adjustSize(15),
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  date: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  message: {
    fontSize: adjustSize(12),
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
    lineHeight: adjustSize(20),
  },
  messageBtn: {
    position: "absolute",
    right: adjustSize(15),
    bottom: adjustSize(15),
  },
  title: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(3),
    marginTop: adjustSize(5),
  },
  addBtn: {
    backgroundColor: colors.primary,
    height: adjustSize(54),
    width: adjustSize(49),
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  btn: {
    marginVertical: adjustSize(25),
  },
});
