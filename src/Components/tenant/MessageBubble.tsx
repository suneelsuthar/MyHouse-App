import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface MessageBubbleProps {
  message: string;
  time: string;
  isOwn: boolean;
  sender?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  time,
  isOwn,
  sender,
}) => {
  return (
    <View style={[styles.container, isOwn ? styles.ownMessage : styles.otherMessage]}>
      {!isOwn && sender && (
        <Text style={styles.senderName}>{sender}</Text>
      )}
      <Text style={[styles.messageText, isOwn && styles.ownMessageText]}>
        {message}
      </Text>
      <Text style={[styles.timeText, isOwn && styles.ownTimeText]}>
        {time}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '50%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDim,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  ownMessageText: {
    color: colors.white,
  },
  timeText: {
    fontSize: 10,
    color: colors.textDim,
    alignSelf: 'flex-end',
  },
  ownTimeText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
