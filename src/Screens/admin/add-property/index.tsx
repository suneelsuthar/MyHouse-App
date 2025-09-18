import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {
  Screen,
  Text,
  Header,
  Button,
  TextField,
  CustomModal,
} from "../../../../src/Components";
import { adjustSize, colors } from "../../../theme";
import { AdminStackParamList } from "../../../utils/interfaces";
import Step1, { type SelectedValue } from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Step4 from "./components/step4";
import Step5 from "./components/step5";
import Step6 from "./components/step6";
import Step7 from "./components/step7";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
interface AdminAddPropertyProps
  extends NativeStackScreenProps<AdminStackParamList, "AdminAddProperty"> {}

export function AdminAddProperty(props: AdminAddPropertyProps) {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [type, settype] = useState("Landlord");
  const [step1Data, setStep1Data] = useState<SelectedValue>({
    kind: "commercial",
    subType: "retail",
  });

  // Facility Manager form state and modal visibility
  const [isFMModalVisible, setIsFMModalVisible] = useState(false);
  const [facilityManagerData, setFacilityManagerData] = useState({
    propertyName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    units: 1,
  });

  // Handle input change for Facility Manager form
  const handleFacilityInputChange = (
    field: keyof typeof facilityManagerData,
    value: string | number
  ) => {
    setFacilityManagerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle unit increment
  const handleIncrement = () => {
    setFacilityManagerData((prev) => ({
      ...prev,
      units: prev.units + 1,
    }));
  };

  // Handle unit decrement
  const handleDecrement = () => {
    if (facilityManagerData.units > 1) {
      setFacilityManagerData((prev) => ({
        ...prev,
        units: prev.units - 1,
      }));
    }
  };

  // Handle form submission
  const handleFacilitySubmit = () => {
    console.log("Facility Manager Data:", facilityManagerData);
    // Add your form submission logic here

    // Close the modal after submission
    setIsFMModalVisible(false);

    // Reset the form if needed
    // setFacilityManagerData({
    //   propertyName: "",
    //   address: "",
    //   city: "",
    //   state: "",
    //   country: "",
    //   units: 1,
    // });
  };

  {
    console.log(props.route.params?.type);
  }

  // const steps = [
  //   { id: 0, title: "Your Details" },
  //   { id: 1, title: "Listing Details" },
  //   { id: 2, title: "Features" },
  //   { id: 3, title: "Property Inspection" },
  //   { id: 4, title: "Reservations" },
  //   { id: 5, title: "Media and Documents" },
  // ];

  const residentialSteps = [
    { id: 0, title: "Your Details" },
    { id: 1, title: "Listing Details" },
    { id: 2, title: "Features" },
    { id: 3, title: "Property Inspection" },
    { id: 4, title: "Property Availability" },
    { id: 5, title: "Media and Documents" },
    { id: 6, title: "Calendar Management" },

    // { id: 6, title: "Add Media" },
    // { id: 7, title: "Add Property" },
    // { id: 8, title: "When are you available for property inspections?" },
  ];
  const commercialSteps = [
    { id: 0, title: "Your Details" },
    { id: 1, title: "Listing Details" },
    { id: 2, title: "Features" },
    { id: 3, title: "Property Inspection" },
    { id: 4, title: "Property Availability" },
    { id: 5, title: "Media and Documents" },
  ];

  const steps =
    step1Data?.kind === "residential" ? residentialSteps : commercialSteps;

  const isFirst = currentStep === 0;
  const isLast =
    currentStep ===
    (step1Data?.kind === "residential" ? residentialSteps : commercialSteps)
      .length -
      1;

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

  // console.log(props.route.params?.mode)
  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
    >
      <Header
        title={
          currentStep < 0
            ? props.route.params?.mode === "edit"
              ? "Edit Property"
              : "Add New Property"
            : steps[currentStep].title
        }
        leftAccessory={
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              isFirst || currentStep < 0 ? props.navigation.goBack() : goPrev()
            }
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

          {currentStep === -1 && (
            <View>
              <Text
                weight="medium"
                style={{
                  textAlign: "center",
                  color: colors.textDim,
                  marginVertical: adjustSize(10),
                  fontSize: adjustSize(14),
                  marginTop: adjustSize(30),
                }}
                text="Who are you listing this property as?"
              />

              {props.route.params?.type !== "fm" ? (
                <View style={styles._row}>
                  <TouchableOpacity
                    onPress={() => settype("Landlord")}
                    activeOpacity={0.7}
                    style={
                      type === "Landlord" ? styles.active_card : styles._card
                    }
                  >
                    <MaterialCommunityIcons
                      name="bank"
                      size={adjustSize(34)}
                      color={
                        type === "Landlord" ? colors.white : colors.primary
                      }
                    />
                    <Text
                      weight="semiBold"
                      text="Landlord"
                      style={
                        type === "Landlord"
                          ? styles.active_card_title
                          : styles._card_title
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => settype("Property Manager")}
                    style={
                      type === "Property Manager"
                        ? styles.active_card
                        : styles._card
                    }
                  >
                    <FontAwesome5
                      name="user-nurse"
                      size={adjustSize(34)}
                      color={
                        type === "Property Manager"
                          ? colors.white
                          : colors.primary
                      }
                    />
                    <Text
                      weight="semiBold"
                      text="Property Manager"
                      style={
                        type === "Property Manager"
                          ? styles.active_card_title
                          : styles._card_title
                      }
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles._row}>
                  <TouchableOpacity
                    onPress={() => {
                      settype("Facility Manager");
                      setIsFMModalVisible(true);
                    }}
                    activeOpacity={0.7}
                    style={
                      type === "Facility Manager"
                        ? styles.active_card
                        : styles._card
                    }
                  >
                    <FontAwesome5
                      name="user-nurse"
                      size={adjustSize(34)}
                      color={
                        type === "Facility Manager"
                          ? colors.white
                          : colors.primary
                      }
                    />
                    <Text
                      weight="semiBold"
                      text="Facility Manager"
                      style={
                        type === "Facility Manager"
                          ? styles.active_card_title
                          : styles._card_title
                      }
                    />
                  </TouchableOpacity>
                </View>
              )}

              {type === "Property Manager" && (
                <View>
                  <Text
                    style={{ fontSize: adjustSize(14) }}
                    weight="semiBold"
                    text="Who owns this property?"
                  />

                  <Text
                    text="First Name"
                    weight="medium"
                    style={styles._label}
                  />
                  <TextField
                    placeholder="Landlord's first name"
                    inputWrapperStyle={styles._input}
                  />

                  <Text
                    text="Last Name"
                    weight="medium"
                    style={styles._label}
                  />
                  <TextField
                    placeholder="Landlord's last name"
                    inputWrapperStyle={styles._input}
                  />

                  <Text
                    text="Landlord’s Email"
                    weight="medium"
                    style={styles._label}
                  />
                  <TextField
                    placeholder="Landlord’s Email"
                    autoComplete="email"
                    inputWrapperStyle={styles._input}
                  />

                  <Text text="Phone*" weight="medium" style={styles._label} />
                  <TextField
                    placeholder="Landlord’s Phone"
                    autoComplete="email"
                    inputWrapperStyle={styles._input}
                    keyboardType="number-pad"
                  />
                </View>
              )}

              {/* Facility Manager Modal */}
              <CustomModal
                visible={isFMModalVisible}
                onClose={() => setIsFMModalVisible(false)}
                title="Facility Manager Details"
              >
                <View style={{ padding: adjustSize(10) }}>
                  <Text
                    style={{ fontSize: adjustSize(14), marginBottom: 10 }}
                    weight="semiBold"
                    text="Property or Estate Details"
                  />

                  <Text
                    text="Enter Property Name"
                    weight="medium"
                    style={styles._label}
                  />
                  <TextField
                    placeholder="Enter Property Name"
                    inputWrapperStyle={styles._input}
                    value={facilityManagerData.propertyName}
                    onChangeText={(text) =>
                      handleFacilityInputChange("propertyName", text)
                    }
                  />

                  <Text text="Location" weight="medium" style={styles._label} />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.locaitonbutn}
                    onPress={() => {
                      // TODO: Implement current location functionality
                    }}
                  >
                    <Text
                      weight="medium"
                      style={styles.locaitonbutntext}
                      text="Use Current Location"
                    />
                  </TouchableOpacity>

                  <Text
                    text="Or"
                    weight="medium"
                    style={[styles._label, { textAlign: "center" }]}
                  />
                  <TextField
                    placeholder="Enter address"
                    inputWrapperStyle={styles._input}
                    value={facilityManagerData.address}
                    onChangeText={(text) =>
                      handleFacilityInputChange("address", text)
                    }
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "48%" }}>
                      <Text text="City" weight="medium" style={styles._label} />
                      <TextField
                        placeholder="Enter City"
                        inputWrapperStyle={styles._input}
                        value={facilityManagerData.city}
                        onChangeText={(text) =>
                          handleFacilityInputChange("city", text)
                        }
                      />
                    </View>
                    <View style={{ width: "48%" }}>
                      <Text
                        text="State"
                        weight="medium"
                        style={styles._label}
                      />
                      <TextField
                        placeholder="Enter State"
                        inputWrapperStyle={styles._input}
                        value={facilityManagerData.state}
                        onChangeText={(text) =>
                          handleFacilityInputChange("state", text)
                        }
                      />
                    </View>
                  </View>

                  <Text text="Country" weight="medium" style={styles._label} />
                  <TextField
                    placeholder="Enter Country"
                    inputWrapperStyle={styles._input}
                    value={facilityManagerData.country}
                    onChangeText={(text) =>
                      handleFacilityInputChange("country", text)
                    }
                  />

                  <View style={{ marginBottom: adjustSize(20) }}>
                    <Text
                      text="Number of Units"
                      weight="medium"
                      style={styles._label}
                    />
                    <View style={styles.counterrow}>
                      <TouchableOpacity
                        style={styles.counterButton}
                        onPress={handleDecrement}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.counterButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.counterText}>
                        {facilityManagerData.units}
                      </Text>
                      <TouchableOpacity
                        style={styles.counterButton}
                        onPress={handleIncrement}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.counterButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Button
                    text="Submit"
                    preset="reversed"
                    onPress={handleFacilitySubmit}
                    style={{ marginTop: adjustSize(10) }}
                  />
                </View>
              </CustomModal>
            </View>
          )}

          {step1Data?.kind === "commercial" ? (
            <View style={{ flex: 1 }}>
              {currentStep === 0 && (
                <Step1
                  mode="add"
                  value={step1Data}
                  onChange={(value) => setStep1Data(value)}
                />
              )}
              {currentStep === 1 && <Step2 mode="add" />}
              {currentStep === 2 && <Step3 mode="add" />}
              {currentStep === 3 && <Step4 mode="add" />}
              {currentStep === 4 && <Step5 mode="add" />}
              {currentStep === 5 && <Step6 mode="add" />}
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {currentStep === 0 && (
                <Step1
                  mode="add"
                  value={step1Data}
                  onChange={(value) => setStep1Data(value)}
                />
              )}
              {currentStep === 1 && <Step2 mode="add" />}
              {currentStep === 2 && <Step3 mode="add" />}
              {currentStep === 3 && <Step4 mode="add" />}
              {currentStep === 4 && <Step5 mode="add" />}
              {currentStep === 5 && <Step6 mode="add" />}
              {currentStep === 6 && <Step7 mode="add" />}
            </View>
          )}

          {/* Footer nav */}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerBtnLeft}>
          <Button
            text="Back"
            disabled={isFirst}
            style={[styles.navBtn, isFirst && styles.btnDisabled]}
            textStyle={isFirst ? { color: colors.grey } : undefined}
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
  _row: {
    flexDirection: "row",
    gap: adjustSize(5),
    marginVertical: adjustSize(20),
  },
  _card: {
    flex: 1,
    height: adjustSize(100),
    borderWidth: 1,
    backgroundColor: colors.fill,
    borderRadius: adjustSize(5),
    justifyContent: "center",
    alignItems: "center",
  },
  active_card: {
    flex: 1,
    height: adjustSize(100),
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(5),
    justifyContent: "center",
    alignItems: "center",
  },
  _card_title: {
    fontSize: adjustSize(14),
    marginTop: adjustSize(10),
  },
  active_card_title: {
    color: colors.white,
    marginTop: adjustSize(10),
  },
  _label: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  _input: {
    borderWidth: 0.3,
    borderColor: colors.grey,
    backgroundColor: colors.white,
  },
  locaitonbutn: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(5),
    backgroundColor: colors.primary,
    padding: adjustSize(5),
    borderRadius: adjustSize(5),
    borderWidth: 1,
    borderColor: colors.grey,
    height: adjustSize(40),
    width: 200,
    justifyContent: "center",
    marginBottom: 8,
  },
  locaitonbutntext: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontWeight: "medium",
  },
  counterrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 15,
    borderWidth: 1,
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
    borderColor: colors.primary,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    // lineHeight: 24,
  },
  counterText: {
    fontSize: 18,
    fontWeight: "600",
    minWidth: 40,
    textAlign: "center",
  },
});
