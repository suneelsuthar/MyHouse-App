import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./index";
import { adjustSize, colors, typography, spacing } from "../theme";
import { Images } from "../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  leftOnPress: () => void;
  rightOnPress: () => void;
  heading: string;
  text: string;
  rightBtnTitle: string;
  leftBtnTitle: string;
  modalType: number;
}
const SmallCustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  heading,
  text,
  rightBtnTitle = "Yes",
  leftBtnTitle = "Cancel",
  leftOnPress,
  rightOnPress,
  modalType,
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
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <WithLocalSvg asset={Images.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.footerRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.leftBtn,
                {
                  borderColor: modalType === 1 ? "#D80027" : colors.primary,
                },
              ]}
              onPress={leftOnPress}
            >
              <Text
                style={[
                  styles.leftBtnText,
                  { color: modalType === 1 ? "#D80027" : colors.primary },
                ]}
              >
                {leftBtnTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.rightBtn,
                {
                  backgroundColor: modalType === 1 ? colors.primary : "#D80027",
                },
              ]}
              onPress={rightOnPress}
            >
              <Text style={styles.rightBtnText}>{rightBtnTitle}</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: adjustSize(10),
  },
  card: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(20),
    width: "100%",
    padding: adjustSize(15),
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
  heading: {
    color: colors.primary,
    fontSize: adjustSize(24),
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
    lineHeight: adjustSize(30),
    marginTop: adjustSize(15),
  },
  text: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    marginTop: adjustSize(15),
    marginBottom: adjustSize(10),
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginVertical: adjustSize(30),
    backgroundColor: colors.fill,
  },
  leftBtn: {
    flex: 1,
    borderWidth: adjustSize(0.5),
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(47),
  },
  leftBtnText: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  rightBtn: {
    flex: 1,
    borderRadius: adjustSize(10),
    alignItems: "center",
    height: adjustSize(47),
    justifyContent: "center",
  },
  rightBtnText: {
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.white,
  },
});

export default SmallCustomModal;
