import React from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { adjustSize, colors } from "../../../../theme";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalMain}>
        <View style={styles.modalCard}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <WithLocalSvg
              asset={Images.closeIcon}
              height={adjustSize(30)}
              width={adjustSize(30)}
            />
          </TouchableOpacity>

          {/* Modal Content */}
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalMain: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: adjustSize(15),
  },
  modalCard: {
    width: "100%",
    backgroundColor: colors.fill,
    borderRadius: adjustSize(20),
    paddingVertical: adjustSize(20),
  },
  closeBtn: {
    alignSelf: "flex-end",
    marginRight: adjustSize(15),
  },
});
