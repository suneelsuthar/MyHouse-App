import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen, Text, Button } from '../../../Components';
import { AppStackScreenProps } from '../../../utils/interfaces';
import { colors, spacing } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// Note: Slider component would need @react-native-community/slider package
// For now, using a simple TouchableOpacity as placeholder

interface PropertyFiltersScreenProps extends AppStackScreenProps<'PropertyFilters'> {}

interface FilterState {
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string[];
  amenities: string[];
  sortBy: string;
}

const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Studio'];
const amenities = ['Parking', 'Pool', 'Gym', 'Laundry', 'Pet Friendly', 'Balcony', 'AC', 'Furnished'];
const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Newest', 'Bedrooms', 'Distance'];

export function PropertyFiltersScreen(props: PropertyFiltersScreenProps) {
  const navigation = useNavigation();
  
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [500, 3000],
    bedrooms: null,
    bathrooms: null,
    propertyType: [],
    amenities: [],
    sortBy: 'Price: Low to High'
  });

  const togglePropertyType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter(t => t !== type)
        : [...prev.propertyType, type]
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [500, 3000],
      bedrooms: null,
      bathrooms: null,
      propertyType: [],
      amenities: [],
      sortBy: 'Price: Low to High'
    });
  };

  const applyFilters = () => {
    // Apply filters logic here
    navigation.goBack();
  };

  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text preset="heading" text="Filters & Sort" style={styles.title} />
        <TouchableOpacity onPress={clearAllFilters}>
          <Text text="Clear All" style={styles.clearText} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Price Range */}
        <View style={styles.section}>
          <Text preset="bold" text="Price Range" style={styles.sectionTitle} />
          <View style={styles.priceContainer}>
            <Text text={`$${filters.priceRange[0]}`} style={styles.priceLabel} />
            <Text text=" - " style={styles.priceSeparator} />
            <Text text={`$${filters.priceRange[1]}`} style={styles.priceLabel} />
          </View>
          <TouchableOpacity style={styles.sliderPlaceholder}>
            <Text text="Tap to adjust price range" style={styles.sliderText} />
          </TouchableOpacity>
        </View>

        {/* Bedrooms */}
        <View style={styles.section}>
          <Text preset="bold" text="Bedrooms" style={styles.sectionTitle} />
          <View style={styles.optionsRow}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.optionButton,
                  filters.bedrooms === num && styles.optionButtonSelected
                ]}
                onPress={() => setFilters(prev => ({
                  ...prev,
                  bedrooms: prev.bedrooms === num ? null : num
                }))}
              >
                <Text
                  text={num.toString()}
                  style={[
                    styles.optionText,
                    filters.bedrooms === num && styles.optionTextSelected
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bathrooms */}
        <View style={styles.section}>
          <Text preset="bold" text="Bathrooms" style={styles.sectionTitle} />
          <View style={styles.optionsRow}>
            {[1, 2, 3, 4].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.optionButton,
                  filters.bathrooms === num && styles.optionButtonSelected
                ]}
                onPress={() => setFilters(prev => ({
                  ...prev,
                  bathrooms: prev.bathrooms === num ? null : num
                }))}
              >
                <Text
                  text={num.toString()}
                  style={[
                    styles.optionText,
                    filters.bathrooms === num && styles.optionTextSelected
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Property Type */}
        <View style={styles.section}>
          <Text preset="bold" text="Property Type" style={styles.sectionTitle} />
          <View style={styles.checkboxContainer}>
            {propertyTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.checkboxRow}
                onPress={() => togglePropertyType(type)}
              >
                <Ionicons
                  name={filters.propertyType.includes(type) ? "checkbox" : "square-outline"}
                  size={20}
                  color={filters.propertyType.includes(type) ? colors.primary : colors.textDim}
                />
                <Text text={type} style={styles.checkboxText} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text preset="bold" text="Amenities" style={styles.sectionTitle} />
          <View style={styles.checkboxContainer}>
            {amenities.map((amenity) => (
              <TouchableOpacity
                key={amenity}
                style={styles.checkboxRow}
                onPress={() => toggleAmenity(amenity)}
              >
                <Ionicons
                  name={filters.amenities.includes(amenity) ? "checkbox" : "square-outline"}
                  size={20}
                  color={filters.amenities.includes(amenity) ? colors.primary : colors.textDim}
                />
                <Text text={amenity} style={styles.checkboxText} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sort By */}
        <View style={styles.section}>
          <Text preset="bold" text="Sort By" style={styles.sectionTitle} />
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioRow}
              onPress={() => setFilters(prev => ({ ...prev, sortBy: option }))}
            >
              <Ionicons
                name={filters.sortBy === option ? "radio-button-on" : "radio-button-off"}
                size={20}
                color={filters.sortBy === option ? colors.primary : colors.textDim}
              />
              <Text text={option} style={styles.radioText} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          text="Apply Filters"
          onPress={applyFilters}
          style={styles.applyButton}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.text,
  },
  clearText: {
    color: colors.primary,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  priceSeparator: {
    color: colors.textDim,
    marginHorizontal: spacing.sm,
  },
  sliderPlaceholder: {
    width: '100%',
    height: 40,
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sliderText: {
    color: colors.textDim,
    fontSize: 14,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 50,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.white,
  },
  checkboxContainer: {
    gap: spacing.sm,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  checkboxText: {
    marginLeft: spacing.sm,
    color: colors.text,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  radioText: {
    marginLeft: spacing.sm,
    color: colors.text,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  applyButton: {
    backgroundColor: colors.primary,
  },
});
