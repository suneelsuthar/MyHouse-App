import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  Text,
  TextField,
  Button,
  CustomModal,
  OfferDiscountModal,
} from "../../../../Components";
import PromotionModal, {
  type Promotion,
} from "../../../../Components/PromotionModal";
import AdditionalChargesModal, {
  type AdditionalCharge,
} from "../../../../Components/AdditionalChargesModal";
import type { DiscountConfig } from "../../../../Components/OfferDiscountModal";
import DropdownComponent from "../../../../Components/DropDown";
import { adjustSize, colors, typography } from "../../../../theme";
type Step2Props = {
  mode: "add" | "edit";
};

const CounterRow = ({
  label,
  value,
  setValue,
  min = 0,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min?: number;
}) => {
  const dec = () => setValue(Math.max(min, value - 1));
  const inc = () => setValue(value + 1);
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>
        <TouchableOpacity style={styles.boxBtn} onPress={dec}>
          <Text weight="semiBold" style={styles.boxBtnText}>
            -
          </Text>
        </TouchableOpacity>
        <Text weight="semiBold" style={styles.countValue}>
          {value}
        </Text>
        <TouchableOpacity style={styles.boxBtn} onPress={inc}>
          <Text weight="semiBold" style={styles.boxBtnText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
      />
    </View>
  );
};

const Step2: React.FC<Step2Props> = ({ mode }) => {
  // Bed/Bath/Toilet
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [toilets, setToilets] = useState(0);

  // Guests
  const [maxGuests, setMaxGuests] = useState<number | "">("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  // Location
  const [streetAddress, setStreetAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [stateName, setStateName] = useState("");
  const [lga, setLga] = useState("");
  const [city, setCity] = useState("");

  // Pricing
  const [currency, setCurrency] = useState<"NGN" | "NTN">("NGN");
  const [price, setPrice] = useState("");
  const [negotiation, setNegotiation] = useState(false);
  const [serviceCharge, setServiceCharge] = useState("");
  const [cautionFee, setCautionFee] = useState("");

  const [hasOtherCharges, setHasOtherCharges] = useState(false);
  const [charges, setCharges] = useState<AdditionalCharge[]>([]);
  const [chargesModalVisible, setChargesModalVisible] =
    useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [customPricing, setCustomPricing] = useState(false);
  const [customPricingModalVisible, setCustomPricingModalVisible] =
    useState<boolean>(false);
  const [customNightPrice, setCustomNightPrice] = useState<string>("");
  const [offerDiscount, setOfferDiscount] = useState(false);
  const [offerDiscountModalVisible, setOfferDiscountModalVisible] =
    useState<boolean>(false);
  const [discountConfig, setDiscountConfig] = useState<
    DiscountConfig | undefined
  >(undefined);
  const [setPromotions, setSetPromotions] = useState(false);
  const [promotions, setPromotionsList] = useState<Promotion[]>([]);
  const [promotionModalVisible, setPromotionModalVisible] =
    useState<boolean>(false);

  return (
    <View>
      <Text weight="semiBold" style={styles.sectionTitle}>
        Where is the property located?
      </Text>
      <View style={styles.card}>
        <TextField
          label="Property Name"
          placeholder="Write the name of your newly built property"
          value={streetAddress} // reuse or replace with dedicated state if preferred
          onChangeText={setStreetAddress}
          placeholderTextColor={colors.grey}
          containerStyle={styles.fieldGap as ViewStyle}
        />
        {/* Property Type - custom dropdown */}
        <Text weight="normal" style={styles.label}>
          Property Type
        </Text>
        <DropdownComponent
          label="Property Type"
          placeholder="Apartments"
          data={[
            { label: "Apartments", value: "apartments" },
            { label: "Duplex", value: "duplex" },
            { label: "Bungalow", value: "bungalow" },
            { label: "Terrace", value: "terrace" },
            { label: "Detached", value: "detached" },
          ]}
          dropdownStyle={
            {
              marginBottom: adjustSize(8),
              backgroundColor: colors.fill,
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
            } as ViewStyle
          }
          rightIconColor={colors.primary}
          placeholderStyle={{
            color: colors.grey,
            fontSize: adjustSize(12),
            fontFamily: typography.fonts.poppins.normal,
          }}
          selectedTextStyle={{
            color: "#292766",
            fontFamily: typography.fonts.poppins.normal,
            fontSize: adjustSize(12),
          }}
        />

        <TextField
          label="Description"
          placeholder="Enter Description"
          value={landmark}
          onChangeText={setLandmark}
          multiline
          inputMode="text"
          placeholderTextColor={colors.grey}
        />
      </View>
      {/* Beds / Baths / Toilets */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        Bed, Bathrooms, and Toilets
      </Text>
      <View style={styles.card}>
        <CounterRow
          label="Number of Bedrooms"
          value={bedrooms}
          setValue={setBedrooms}
        />
        <CounterRow
          label="Number of Bathrooms"
          value={bathrooms}
          setValue={setBathrooms}
        />
        <CounterRow
          label="Number of Toilets"
          value={toilets}
          setValue={setToilets}
        />
      </View>

      {/* Guests (optional) */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        Guests (optional)
      </Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Maximum number of guests allowed</Text>
        </View>

        <CounterRow label="Adults" value={adults} setValue={setAdults} />
        <CounterRow label="Children" value={children} setValue={setChildren} />
      </View>

      {/* Location */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        Location
      </Text>
      <Text weight="semiBold" style={styles.subTitle}>
        Where is the property located?
      </Text>
      <View style={styles.card}>
        <TextField
          label="Street address"
          placeholder="Enter street address"
          value={streetAddress}
          onChangeText={setStreetAddress}
          containerStyle={styles.fieldGap as ViewStyle}
        />
        <TextField
          label="Country"
          placeholder="Nigeria"
          value="Nigeria"
          editable={false}
          containerStyle={styles.fieldGap as ViewStyle}
        />
        <TextField
          label="Closest Landmark"
          placeholder="e.g Beside Reddington Hospital"
          value={landmark}
          onChangeText={setLandmark}
          containerStyle={styles.fieldGap as ViewStyle}
        />
        <TextField
          label="State"
          placeholder="Lagos"
          value={stateName}
          onChangeText={setStateName}
          containerStyle={styles.fieldGap as ViewStyle}
        />
        <TextField
          label="LGA"
          placeholder="Agege"
          value={lga}
          onChangeText={setLga}
          containerStyle={styles.fieldGap as ViewStyle}
        />
        <TextField
          label="City"
          placeholder="Alakijaun"
          value={city}
          onChangeText={setCity}
        />
      </View>

      {/* Pricing */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        Pricing
      </Text>
      <View style={styles.card}>
        <Text weight="medium" text="Price per night" style={styles.label} />
        <View style={styles.currencyRow}>
          <View>
            <DropdownComponent
              placeholder="Select currency"
              value={currency}
              onChangeValue={(v) => setCurrency(v as "NGN" | "NTN")}
              data={[
                { label: "NGN", value: "NGN" },
                { label: "NTN", value: "NTN" },
              ]}
              dropdownStyle={
                {
                  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
                  backgroundColor: colors.fill,
                  width: 100,
                  marginTop: 0,
                } as ViewStyle
              }
              placeholderStyle={{
                color: colors.grey,
                fontSize: adjustSize(12),
                fontFamily: typography.fonts.poppins.normal,
              }}
              selectedTextStyle={{
                color: colors.primary,
                fontSize: adjustSize(12),
                fontFamily: typography.fonts.poppins.medium,
              }}
              rightIconColor={colors.primary}
            />
          </View>

          <View style={{ flex: 1, marginLeft: adjustSize(8), marginTop: 5 }}>
            <TextField
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </View>

        <ToggleRow
          label="Enable Price Negotiation"
          value={negotiation}
          onChange={setNegotiation}
        />

        <View style={styles.inputfield}>
          <TextField
            placeholder="Service charge (optional)"
            keyboardType="numeric"
            value={serviceCharge}
            label="Service charge (optional)"
            onChangeText={setServiceCharge}
            containerStyle={styles.fieldGap as ViewStyle}
          />
        </View>
        <View style={styles.inputfield}>
          <TextField
            placeholder="Caution fee (optional)"
            keyboardType="numeric"
            label="Caution fee (optional)"
            value={cautionFee}
            onChangeText={setCautionFee}
          />
        </View>

        <View style={{ height: adjustSize(6) }} />

        <ToggleRow
          label="Do you have other charges to add?"
          value={hasOtherCharges}
          onChange={(v) => {
            setHasOtherCharges(v);
            if (v) setChargesModalVisible(true);
          }}
        />

        {hasOtherCharges && (
          <View style={{ paddingVertical: adjustSize(8) }}>
            <Text weight="semiBold" style={styles.label}>
              Additional charges
            </Text>
            <View style={{ height: adjustSize(8) }} />
            <Button
              text="+Another Charge"
              preset="reversed"
              onPress={() => setChargesModalVisible(true)}
            />
            {/* Simple list of added charges (optional visual) */}
            {charges.length > 0 && (
              <View style={{ marginTop: adjustSize(10) }}>
                {charges.map((c, idx) => (
                  <TouchableOpacity
                    key={`${c.name}-${idx}`}
                    style={styles.addedChargeRow}
                    onPress={() => {
                      setEditIndex(idx);
                      setChargesModalVisible(true);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.addedChargeName}>{c.name}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: adjustSize(10),
                      }}
                    >
                      <Text style={styles.addedChargeAmount}>
                        {c.amount} ({c.rate})
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setCharges((prev: AdditionalCharge[]) =>
                            prev.filter((_, i) => i !== idx)
                          );
                        }}
                      >
                        <Text style={{ color: colors.primary }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
        <ToggleRow
          label="Do you want to set custom pricing?"
          value={customPricing}
          onChange={(v) => {
            setCustomPricing(v);
            if (v) setCustomPricingModalVisible(true);
          }}
        />
        <ToggleRow
          label="Do you want to offer a discount?"
          value={offerDiscount}
          onChange={(v) => {
            setOfferDiscount(v);
            if (v) setOfferDiscountModalVisible(true);
          }}
        />
        <ToggleRow
          label="Do you want to set promotions?"
          value={setPromotions}
          onChange={(v) => {
            setSetPromotions(v);
            if (v) setPromotionModalVisible(true);
          }}
        />
      </View>

      {/* Additional Charges Modal */}
      <AdditionalChargesModal
        visible={chargesModalVisible}
        onClose={() => {
          setChargesModalVisible(false);
          setEditIndex(null);
        }}
        onSubmit={(charge) => {
          if (editIndex !== null) {
            setCharges((prev: AdditionalCharge[]) =>
              prev.map((c, i) => (i === editIndex ? charge : c))
            );
            setEditIndex(null);
            setChargesModalVisible(false);
          } else {
            setCharges((prev: AdditionalCharge[]) => [...prev, charge]);
          }
        }}
        initialCharge={editIndex !== null ? charges[editIndex] : undefined}
      />

      {/* Custom Pricing Modal */}
      <CustomModal
        visible={customPricingModalVisible}
        onClose={() => {
          setCustomPricingModalVisible(false);
          // keep the toggle on; user can turn it off manually if desired
        }}
        title="Set Custom Pricing"
      >
        {/* Subtitle and amount display (optional) */}
        {customNightPrice ? (
          <View
            style={{
              alignItems: "center",
              marginTop: adjustSize(8),
              marginBottom: adjustSize(8),
            }}
          >
            <Text style={{ color: colors.grey }}>Price per night</Text>
            <Text
              weight="semiBold"
              style={{
                color: colors.primary,
                fontSize: adjustSize(16),
                marginTop: adjustSize(4),
              }}
            >
              ₦ {customNightPrice}
            </Text>
          </View>
        ) : null}

        {/* Input mode */}
        <View style={{ marginTop: adjustSize(6) }}>
          <Text
            weight="normal"
            style={{ color: colors.primary, marginBottom: adjustSize(6) }}
          >
            Price per night : ₦{customNightPrice || "0"}
          </Text>
          <TextField
            placeholder="Enter Price per night"
            keyboardType="numeric"
            value={customNightPrice}
            onChangeText={setCustomNightPrice}
          />
        </View>

        {/* Actions */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: adjustSize(10),
            marginTop: adjustSize(14),
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              text="Cancel"
              onPress={() => setCustomPricingModalVisible(false)}
              style={{
                borderColor: colors.primary,
                borderWidth: 1,
                backgroundColor: colors.fill,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              text="Save"
              preset="reversed"
              onPress={() => setCustomPricingModalVisible(false)}
              disabled={!customNightPrice}
            />
          </View>
        </View>
      </CustomModal>

      {/* Offer Discount Modal */}
      <OfferDiscountModal
        visible={offerDiscountModalVisible}
        onClose={() => setOfferDiscountModalVisible(false)}
        basePrice={Number(price) || undefined}
        initialConfig={discountConfig}
        onSubmit={(cfg) => {
          setDiscountConfig(cfg);
          setOfferDiscountModalVisible(false);
        }}
        title="Offer a Discount"
      />

      {/* Promotion Modal */}
      <PromotionModal
        visible={promotionModalVisible}
        onClose={() => setPromotionModalVisible(false)}
        initialPromotions={promotions}
        onSubmit={(list) => {
          setPromotionsList(list);
          setPromotionModalVisible(false);
        }}
        title="Add new Promotion"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: adjustSize(16),
    color: colors.primary,
    marginTop: adjustSize(25),
    marginBottom: adjustSize(18),
  },
  subTitle: {
    color: colors.primary,
    fontSize: adjustSize(12),
    marginBottom: adjustSize(6),
  },
  card: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    marginBottom: adjustSize(12),
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: adjustSize(6),
  },
  rowLabel: {
    color: colors.primary,
    fontSize: adjustSize(13),
    flexShrink: 1,
    paddingRight: adjustSize(10),
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
  },
  boxBtn: {
    width: adjustSize(28),
    height: adjustSize(28),
    borderRadius: adjustSize(6),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  boxBtnText: {
    color: colors.primary,
    fontSize: adjustSize(16),
  } as TextStyle,
  countValue: {
    width: adjustSize(30),
    textAlign: "center",
    color: colors.primary,
    fontSize: adjustSize(14),
  },

  currencyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: adjustSize(8),
  },


  fieldGap: {
    marginBottom: adjustSize(8),
  },

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: adjustSize(8),
  },
  toggleLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flexShrink: 1,
    paddingRight: adjustSize(10),
  },
  label: {
    fontSize: adjustSize(12),
    color: colors.primary,
  },
  inputfield: {
    marginVertical: adjustSize(5),
  },
  addedChargeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: adjustSize(6),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.greylight,
  },
  addedChargeName: {
    color: colors.primary,
    fontSize: adjustSize(12),
  } as TextStyle,
  addedChargeAmount: {
    color: colors.primary,
    fontSize: adjustSize(12),
    opacity: 0.8,
  } as TextStyle,
});

export default Step2;
