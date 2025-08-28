import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Screen, Text, Header, Button } from "../../../Components";
import { adjustSize, colors } from "../../../theme";
import { AppStackScreenProps } from "../../../utils/interfaces";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Step4 from "./components/step4";
import Step5 from "./components/step5";
import Step6 from "./components/step6";
import { Ionicons } from "@expo/vector-icons";
interface AdminAddPropertyProps
  extends AppStackScreenProps<"AdminAddProperty"> {}

export function AdminAddProperty(props: AdminAddPropertyProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = [
    { id: 0, title: "Your Details" },
    { id: 1, title: "Listing Details" },
    { id: 2, title: "Features" },
    { id: 3, title: "Property Inspection" },
    { id: 4, title: "Reservations" },
    { id: 5, title: "Media and Documents" },
    // { id: 6, title: "Add Media" },
    // { id: 7, title: "Add Property" },
    // { id: 8, title: "When are you available for property inspections?" },
  ];

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const goPrev = () => {
    if (!isFirst) setCurrentStep((s) => s - 1);
  };
  const goNext = () => {
    if (!isLast) setCurrentStep((s) => s + 1);
  };

  const onSave = () => {
    props.navigation.goBack();
    alert("Saved");
    // TODO: wire up final save/submit
  };
  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
    >
      <Header
        title={steps[currentStep].title}
        leftAccessory={
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => (isFirst ? props.navigation.goBack() : goPrev())}
            style={{ paddingVertical: adjustSize(4) }}
          >
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles._stepper}>
            {steps.map((step, i) => (
              <TouchableOpacity
                key={step.id}
                activeOpacity={0.7}
                onPress={() => setCurrentStep(i)}
                style={styles._stepperItem}
              >
                <View
                  style={[styles.step, i === currentStep && styles.stepActive]}
                >
                  <Text
                    weight="semiBold"
                    style={[
                      styles.stepText,
                      i === currentStep && styles.stepTextActive,
                    ]}
                  >
                    {i + 1}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {currentStep === 0 && <Step1 mode="add" />}
            {currentStep === 1 && <Step2 mode="add" />}
            {currentStep === 2 && <Step3 mode="add" />}
            {currentStep === 3 && <Step4 mode="add" />}
            {currentStep === 4 && <Step5 mode="add" />}
            {currentStep === 5 && <Step6 mode="add" />}
          </View>

          {/* Footer nav */}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerBtnLeft}>
          <Button
            text="Back"
            disabled={isFirst}
            style={[styles.navBtn, isFirst && styles.btnDisabled]}
            //   textStyle={isFirst ? { color: colors.grey } : undefined}
            onPress={goPrev}
          />
        </View>
        <View style={styles.footerBtnRight}>
          {isLast ? (
            <Button
              text="Save"
              preset="reversed"
              style={styles.navBtn}
              onPress={onSave}
            />
          ) : (
            <Button
              text="Next"
              preset="reversed"
              style={styles.navBtn}
              onPress={goNext}
            />
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: adjustSize(10),
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: adjustSize(10),
    marginTop: adjustSize(12),
    marginBottom: adjustSize(5),
    marginHorizontal: adjustSize(5),
  },
  footerBtnLeft: { flex: 1 },
  footerBtnRight: { flex: 1 },
  navBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.primary,
    height: adjustSize(41),
    borderRadius: adjustSize(10),
  },
  btnDisabled: {
    opacity: 0.5,
  },
  placeholder: {
    color: colors.primary,
    fontSize: adjustSize(16),
    marginTop: adjustSize(8),
  },
  subtext: {
    fontSize: adjustSize(12),
    marginTop: adjustSize(4),
  },
  _stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginVertical: adjustSize(14),
  },
  step: {
    borderRadius: adjustSize(5),
    backgroundColor: colors.fill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: adjustSize(8),
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    elevation: 3,
  },
  stepActive: {
    backgroundColor: colors.primary,
  },
  stepTextActive: {
    color: colors.white,
  },
  stepText: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  _stepperItem: {
    backgroundColor: colors.fill,
    paddingHorizontal: adjustSize(4),
    zIndex: 1,
    marginBottom: adjustSize(-10),
  },
});

