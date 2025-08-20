import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text, TextField, Button } from "./index";
import { adjustSize, colors } from "../theme";
import CustomModal from "./CustomModal";
import AntDesign from '@expo/vector-icons/AntDesign';
export type AdditionalCharge = {
  name: string;
  amount: string; // keep as string for TextInput; parent can parse
  rate: string; // e.g. "Flat" | "Per Night" etc.
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (charge: AdditionalCharge) => void;
  title?: string;
  initialCharge?: AdditionalCharge; // if provided, modal acts in edit mode
}

const AdditionalChargesModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  title = "Additional Charges",
  initialCharge,
}) => {
  const isEdit = !!initialCharge;
  const [adding, setAdding] = useState<boolean>(true); // add flow shows fields, then CTA
  const [draft, setDraft] = useState<AdditionalCharge>({ name: "", amount: "", rate: "Flat" });

  useEffect(() => {
    if (isEdit && initialCharge) {
      setDraft(initialCharge);
      setAdding(true);
    } else if (!isEdit) {
      setDraft({ name: "", amount: "", rate: "Flat" });
      setAdding(true);
    }
  }, [visible, isEdit, initialCharge]);

  const canSubmit = useMemo(
    () => draft.name.trim().length > 0 && draft.amount.trim().length > 0,
    [draft]
  );

  const resetDraft = () => setDraft({ name: "", amount: "", rate: "Flat" });

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(draft);
    if (!isEdit) {
      resetDraft();
      setAdding(false); // hide fields and show CTA for add flow
    }
  };

  const startAddAnother = () => {
    setAdding(true);
    resetDraft();
  };

  return (
    <CustomModal visible={visible} onClose={onClose} title={title}>
      {adding ? (
        <View>
          <Text weight="normal" style={styles.inputLabel}>
            Name
          </Text>
          <TextField
            placeholder="Charge name"
            value={draft.name}
            onChangeText={(t) => setDraft((d) => ({ ...d, name: t }))}
            containerStyle={styles.fieldGap as ViewStyle}
          />

          <Text weight="normal" style={styles.inputLabel}>
            Amount
          </Text>
          <TextField
            placeholder="Amount"
            keyboardType="numeric"
            value={draft.amount}
            onChangeText={(t) => setDraft((d) => ({ ...d, amount: t }))}
            containerStyle={styles.fieldGap as ViewStyle}
          />

          <Text weight="normal" style={styles.inputLabel}>
            Rate
          </Text>
          <TextField
            placeholder="Flat"
            value={draft.rate}
            onChangeText={(t) => setDraft((d) => ({ ...d, rate: t }))}
            containerStyle={styles.fieldGap as ViewStyle}
          />

          <View style={{ paddingVertical: adjustSize(8) }}>
            <Button
              text={isEdit ? "Save" : "Add"}
              preset="reversed"
              onPress={handleSubmit}
              disabled={!canSubmit}
            />
          </View>
        </View>
      ) : (
        <View>
          <Button text="+Another Charge" preset="reversed" onPress={startAddAnother} />
        </View>
      )}
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    marginTop: adjustSize(8),
    marginBottom: adjustSize(6),
  },
  fieldGap: {
    marginBottom: adjustSize(8),
  },
});

export default AdditionalChargesModal;
