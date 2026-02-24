import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

interface PropertyCardProps {
  title: string;
  address: string;
  rent: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image?: string;
  onPress?: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  address,
  rent,
  bedrooms,
  bathrooms,
  area,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="home-outline" size={40} color={colors.textDim} />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="bed-outline" size={16} color={colors.textDim} />
            <Text style={styles.detailText}>{bedrooms} Bed</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={16} color={colors.textDim} />
            <Text style={styles.detailText}>{bathrooms} Bath</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="resize-outline" size={16} color={colors.textDim} />
            <Text style={styles.detailText}>{area}</Text>
          </View>
        </View>
        
        <Text style={styles.rent}>{rent}/month</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.fill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: colors.textDim,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: colors.textDim,
    marginLeft: 4,
  },
  rent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
