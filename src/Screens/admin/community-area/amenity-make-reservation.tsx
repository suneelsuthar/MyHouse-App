import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyleSheet, Modal, View, TouchableOpacity } from "react-native";
import { Screen, Text, Button, TextField } from "../../../Components";
import { Header } from "../../../Components";
import ReservationCalendar from "./components/ReservationCalendar";
import ReservationStep1 from "./components/ReservationStep1";
import ReservationCalendarAddTime from "./components/ReservationCalendarAddTime";
import { WithLocalSvg } from "react-native-svg/css";
import { adjustSize, colors, typography } from "../../../theme";
import { Images } from "../../../assets/Images";
const validationSchema = yup.object().shape({
  propertyGroup: yup.string().required("Property group is required"),
  property: yup.string().required("Property is required"),
  amenity: yup.string().required("Amenity is required"),
  capacity: yup.string().required("Capacity is required"),
  reservedFor: yup.string().required("Reserved for is required"),
  selectedDates: yup
    .array()
    .min(1, "Please select at least one date")
    .required(),
  timeSlots: yup.array().min(1, "Please add at least one time slot").required(),
});

export function AdminAmenityMakeReservation({ navigation }: any) {
  const [step, setStep] = useState<number>(0);
  const [visible, setVisiable] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const selectedDates = watch("selectedDates", []);

  const handleNextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 0) {
      fieldsToValidate = ["propertyGroup", "property", "amenity"];
    } else if (step === 1) {
      fieldsToValidate = ["capacity", "reservedFor", "selectedDates"];
    } else if (step === 2) {
      fieldsToValidate = ["timeSlots"];
    }
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (step < 2) {
        setStep(step + 1);
      } else {
        setVisiable(true);
      }
    }
  };

  const handleConfirmReservation = () => {
    setVisiable(false);
    setStep(0);
    setValue("propertyGroup", "");
    setValue("property", "");
    setValue("amenity", "");
    setValue("capacity", "");
    setValue("reservedFor", "");
    setValue("selectedDates", []);
    setValue("timeSlots", []);
    navigation.goBack();
  };

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top", "bottom"]}
    >
      <Header title={"New Reservation"} />
      {step === 0 && (
        <ReservationStep1
          control={control}
          errors={errors}
          onPress={handleNextStep}
        />
      )}
      {step === 1 && (
        <ReservationCalendar
          control={control}
          errors={errors}
          setValue={setValue}
          backHandler={() => setStep(0)}
          rightBtnHandler={handleNextStep}
        />
      )}
      {step === 2 && (
        <ReservationCalendarAddTime
          errors={errors}
          setValue={setValue}
          selectedDates={watch("selectedDates")}
          backHandler={() => setStep(step - 1)}
          rightBtnHandler={handleNextStep}
        />
      )}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setVisiable(false);
        }}
      >
        <View style={styles.modalMain}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              onPress={() => {
                setVisiable(false);
              }}
              style={styles.closeBtn}
            >
              <WithLocalSvg
                asset={Images.closeIcon}
                height={adjustSize(30)}
                width={adjustSize(30)}
              />
            </TouchableOpacity>
            <View style={styles.modalData}>
              <Text style={styles.modalHeading}>Reservation Summary</Text>
              <Text style={styles.modalTitle}>
                Amenity:{" "}
                <Text
                  style={[
                    styles.modalTitle,
                    { fontFamily: typography.primary.normal },
                  ]}
                >
                  Swimming Pool
                </Text>
              </Text>
              <Text style={styles.modalTitle}>
                Reserved For:{" "}
                <Text
                  style={[
                    styles.modalTitle,
                    { fontFamily: typography.primary.normal },
                  ]}
                >
                  Tenant 2
                </Text>
              </Text>
              <Text style={styles.modalTitle}>Date & Time</Text>
              <TextField
                placeholder=""
                // value={amenityName}
                // onChangeText={setAmenityName}
                placeholderTextColor={colors.primaryLight}
                inputWrapperStyle={[
                  { height: adjustSize(120), alignItems: "flex-start" },
                ]}
                style={[{ height: adjustSize(110) }]}
                multiline
              />
              <View
                style={{
                  marginBottom: adjustSize(20),
                  marginTop: adjustSize(40),
                }}
              >
                <Button
                  text={"Confirm Reservation"}
                  preset="reversed"
                  onPress={handleConfirmReservation}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  modalMain: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: adjustSize(10),
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
  modalData: {
    paddingHorizontal: adjustSize(10),
  },
  modalHeading: {
    color: colors.primary,
    fontSize: adjustSize(24),
    fontFamily: typography.primary.semiBold,
    textAlign: "center",
    lineHeight: adjustSize(50),
    marginBottom: adjustSize(10),
  },
  modalTitle: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.primary.semiBold,
    marginBottom: adjustSize(3),
  },
});
