import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme';

type TabName = 'HomeTab' | 'PropertiesTab' | 'TenantsTab' | 'MaintenanceTab' | 'MoreTab';

interface TabBarIconProps {
  name: TabName;
  color: string;
  focused: boolean;
}

const iconSize = 24;

export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, focused }) => {
  const getIcon = () => {
    const iconProps = { size: iconSize, color };
    const activeScale = focused ? 1.1 : 1;
    
    switch (name) {
      case 'HomeTab':
        return (
          <View style={[styles.iconContainer, { transform: [{ scale: activeScale }] }]}>
            <Ionicons name={focused ? 'home' : 'home-outline'} {...iconProps} />
          </View>
        );
      case 'PropertiesTab':
        return (
          <View style={[styles.iconContainer, { transform: [{ scale: activeScale }] }]}>
            <Ionicons name={focused ? 'business' : 'business-outline'} {...iconProps} />
          </View>
        );
      case 'TenantsTab':
        return (
          <View style={[styles.iconContainer, { transform: [{ scale: activeScale }] }]}>
            <MaterialCommunityIcons 
              name={focused ? 'account-group' : 'account-group-outline'} 
              {...iconProps} 
            />
          </View>
        );
      case 'MaintenanceTab':
        return (
          <View style={[styles.iconContainer, { transform: [{ scale: activeScale }] }]}>
            <MaterialCommunityIcons 
              name={focused ? 'toolbox' : 'toolbox-outline'} 
              {...iconProps} 
            />
          </View>
        );
      case 'MoreTab':
        return (
          <View style={[styles.iconContainer, { transform: [{ scale: activeScale }] }]}>
            <Ionicons name={focused ? 'menu' : 'menu-outline'} {...iconProps} />
          </View>
        );
      default:
        return <View style={styles.iconContainer} />;
    }
  };

  return getIcon();
};

const styles = StyleSheet.create({
  iconContainer: {
    width: iconSize,
    height: iconSize,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
});
