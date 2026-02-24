import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ViewStyle, ScrollView } from "react-native";
import { Text, TextField, Button } from "./index";
import { adjustSize, colors } from "../theme";
import CustomModal from "./CustomModal";
import AntDesign from "@expo/vector-icons/AntDesign";
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
  existingCharges?: AdditionalCharge[]; // list to preview existing charges
}

const AdditionalChargesModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  title = "Additional Charges",
  initialCharge,
  existingCharges = [],
}) => {
  const isEdit = !!initialCharge;
  const [adding, setAdding] = useState<boolean>(true); // kept for compatibility, not used in add flow list mode
  const [draft, setDraft] = useState<AdditionalCharge>({
    name: "",
    amount: "",
    rate: "Flat",
  });

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
    [draft],
  );

  const resetDraft = () => setDraft({ name: "", amount: "", rate: "Flat" });

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(draft);
    if (!isEdit) resetDraft();
  };

  const startAddAnother = () => {
    setAdding(true);
    resetDraft();
  };

  return (
    <CustomModal visible={visible} onClose={onClose} title={title}>
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: 30 }}
        >
          {isEdit ? (
            <View>
              <Text weight="normal" style={styles.inputLabel}>
                Name
              </Text>
              <TextField
                placeholder="Charge name"
                value={draft.name}
                onChangeText={(t) => setDraft((d) => ({ ...d, name: t }))}
                containerStyle={styles.fieldGap as ViewStyle}
                inputWrapperStyle={{ backgroundColor: "white" }}
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
                inputWrapperStyle={{ backgroundColor: "white" }}
              />

              <Text weight="normal" style={styles.inputLabel}>
                Rate
              </Text>
              <TextField
                placeholder="Flat"
                value={draft.rate}
                onChangeText={(t) => setDraft((d) => ({ ...d, rate: t }))}
                containerStyle={styles.fieldGap as ViewStyle}
                inputWrapperStyle={{ backgroundColor: "white" }}
              />

              <View style={{ paddingVertical: adjustSize(8) }}>
                <Button
                  text="Save"
                  preset="reversed"
                  onPress={handleSubmit}
                  disabled={!canSubmit}
                />
              </View>
            </View>
          ) : (
            <View>
              {/* Existing list */}
              {existingCharges && existingCharges.length > 0 ? (
                <View style={{ marginBottom: adjustSize(8) }}>
                  {existingCharges.map((c, idx) => (
                    <View
                      key={`${c.name}-${idx}`}
                      style={{ marginBottom: adjustSize(12) }}
                    >
                      <Text weight="normal" style={styles.inputLabel}>
                        Name
                      </Text>
                      <TextField
                        placeholder="Charge name"
                        value={c.name}
                        editable={false}
                        containerStyle={styles.fieldGap as ViewStyle}
                        inputWrapperStyle={{ backgroundColor: "white" }}
                      />
                      <Text weight="normal" style={styles.inputLabel}>
                        Amount
                      </Text>
                      <TextField
                        placeholder="Amount"
                        value={c.amount}
                        editable={false}
                        containerStyle={styles.fieldGap as ViewStyle}
                        inputWrapperStyle={{ backgroundColor: "white" }}
                      />
                      <Text weight="normal" style={styles.inputLabel}>
                        Rate
                      </Text>
                      <TextField
                        placeholder="Flat"
                        value={c.rate}
                        editable={false}
                        containerStyle={styles.fieldGap as ViewStyle}
                        inputWrapperStyle={{ backgroundColor: "white" }}
                      />
                    </View>
                  ))}
                </View>
              ) : null}

              {existingCharges && existingCharges.length > 0 ? (
                <View style={styles.divider} />
              ) : null}

              {/* Add-new section at bottom */}
              <Text weight="normal" style={styles.inputLabel}>
                Name
              </Text>
              <TextField
                placeholder="Charge name"
                value={draft.name}
                onChangeText={(t) => setDraft((d) => ({ ...d, name: t }))}
                containerStyle={styles.fieldGap as ViewStyle}
                inputWrapperStyle={{ backgroundColor: "white" }}
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
                inputWrapperStyle={{ backgroundColor: "white" }}
              />
              <Text weight="normal" style={styles.inputLabel}>
                Rate
              </Text>
              <TextField
                placeholder="Flat"
                value={draft.rate}
                onChangeText={(t) => setDraft((d) => ({ ...d, rate: t }))}
                containerStyle={styles.fieldGap as ViewStyle}
                inputWrapperStyle={{ backgroundColor: "white" }}
              />

              <View style={{ paddingVertical: adjustSize(8) ,marginBottom:60}}>
                <Button
                  text="Add Another Charge"
                  preset="reversed"
                  onPress={handleSubmit}
                  disabled={!canSubmit}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: adjustSize(16),
    // flex:1
  },
  inputLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    marginTop: adjustSize(8),
    marginBottom: adjustSize(6),
  },
  fieldGap: {
    marginBottom: adjustSize(8),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.greylight,
    marginBottom: adjustSize(20),
  },
});

export default AdditionalChargesModal;
