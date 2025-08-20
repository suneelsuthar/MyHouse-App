import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./index";
import { adjustSize, colors, typography } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            {title ? (
              <Text weight="semiBold" style={styles.title}>
                {title}
              </Text>
            ) : null}
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <AntDesign name="close" size={18} color={colors.error} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: adjustSize(16),
  },
  card: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(14),
    width: "100%",
    maxWidth: 420,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: adjustSize(16),
    paddingVertical: adjustSize(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.greylight,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  closeBtn: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(10),
    width: adjustSize(28),
    height: adjustSize(28),
    borderRadius: adjustSize(14),
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.error,
    borderWidth: 1,
  },
  body: {
    paddingHorizontal: adjustSize(14),
    paddingBottom: adjustSize(12),
  },
});

export default CustomModal;
