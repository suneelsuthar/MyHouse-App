import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { adjustSize, colors } from "../../theme";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../assets/Images";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";
import { logoutUser } from "../../store/thunks/authThunks";
export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [active, setactive] = useState(0);
  const [openId, setOpenId] = useState<number | null>(null); // which dropdown is open
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  // Close any open nested menu and the drawer, then navigate
  const closeMenusAndNavigate = (routeName: any, params?: any) => {
    setOpenId(null);
    props.navigation.closeDrawer?.();
    (props.navigation as any).navigate(routeName as never, params as never);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
    } finally {
      // Ensure drawer closes and navigate to Login screen
      props.navigation.closeDrawer?.();
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Login" as never }],
      });
    }
  };

  const propertiesItems = [
    {
      id: 0,
      title: "Dashboard",
      type: "item",
      icon: Images.dashborad,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminDashboard" },
        }),
    },
    {
      id: 1,
      title: "Manage Properties",
      type: "dropdown",
      icon: Images.manageprop,
      menueItems: [
        {
          id: 0,
          title: "Rental Properties",
          // onPress: () => console.log(""),
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Properties",
              params: { screen: "AdminPropertyManagement" },
            }),
        },
        {
          id: 1,
          title: "Managed Properties",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Properties",
              params: {
                screen: "AdminPropertyManagement",
                params: { propertyType: "managed" },
              },
            }),
        },
        {
          id: 2,
          title: "Property Requests",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "AdminPropertyRequests",
              },
            }),
        },
        {
          id: 3,
          title: "Services",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Properties",
              params: {
                screen: "AdminPropertyServices",
              },
            }),
        },
        {
          id: 4,
          title: "Features",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Properties",
              params: {
                screen: "AdminPropertyFeatures",
              },
            }),
        },
        {
          id: 5,
          title: "Restrictions",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Properties",
              params: {
                screen: "AdminPropertyRestriction",
              },
            }),
        },
        {
          id: 6,
          title: "Manage Inspections",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Properties",
              params: {
                screen: "AdminManageInspections",
              },
            }),
        },
      ],
    },
    {
      id: 2,
      title: "Manage Bookings",
      type: "dropdown",
      icon: Images.managebooking,
      menueItems: [
        {
          id: 0,
          title: "Reserved",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Booking",
              params: {
                screen: "AdminManageBookings",
                params: { bookingType: "reserved" },
              },
            }),
        },

        {
          id: 1,
          title: "Active",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Booking",
              params: { screen: "AdminManageBookings" },
            }),
        },

        {
          id: 2,
          title: "History",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Booking",
              params: { screen: "AdminManageBookings" },
            }),
        },
        {
          id: 3,
          title: "Cancelled",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Booking",
              params: { screen: "AdminManageBookings" },
            }),
        },
      ],
    },
    {
      id: 3,
      title: "Facility Management",
      type: "dropdown",
      icon: Images.facilitymanag,
      menueItems: [
        {
          id: 0,
          title: "Work Requests",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "FacilityManagement",
                params: { status: "work_requests" },
              },
            }),
        },
        {
          id: 1,
          title: "Work Orders",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "FacilityManagement",
                params: { status: "work_orders" },
              },
            }),
        },
        {
          id: 2,
          title: "Completed",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "FacilityManagement",
                params: { status: "completed" },
              },
            }),
        },
      ],
    },
    {
      id: 4,
      title: "Visitor Management",
      type: "dropdown",
      icon: Images.visitormanagement,
      nestedItems: [
        {
          id: 0,
          title: "Visitor Requests",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "VisitorRequests" },
            }),
        },
        {
          id: 1,
          title: "Visitors List",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "AdminVisitorsList" },
            }),
        },
        {
          id: 2,
          title: "Revoked Invitations",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "RevokedInvitations" },
            }),
        },
        {
          id: 3,
          title: "Access Alerts",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "AdminAccessAlerts" },
            }),
        },
        {
          id: 4,
          title: "Panic Alerts",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "AdminPanicAlerts" },
            }),
        },
      ],
    },
    {
      id: 5,
      title: "Tenants",
      type: "item",
      icon: Images.tenants,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminTenants" },
        }),
    },
    {
      id: 6,
      title: "Community Area",
      type: "dropdown",
      icon: Images.community,
      nestedItems: [
        {
          id: 0,
          title: "Amenities",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "CommunityArea",
                params: { tab: "amenities" },
              },
            }),
        },
        {
          id: 1,
          title: "Reservations",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "CommunityArea",
                params: { tab: "reservations" },
              },
            }),
        },
      ],
    },

    {
      id: 7,
      title: "Communications",
      type: "item",
      icon: Images.communication,
      onPress: () => closeMenusAndNavigate("Commuication"),
    },

    {
      id: 8,
      title: "Wallet",
      type: "item",
      icon: Images.wallet,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Wallet",
        }),
    },

    {
      id: 9,
      title: "Emergency",
      type: "item",
      icon: Images.emergency,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "Emergency" },
        }),
    },
    {
      id: 10,
      title: "Chat",
      type: "item",
      icon: Images.chat,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Chat",
        }),
    },
  ];

  const utilitesItems = [
    {
      id: 0,
      title: "Dashboard",
      type: "item",
      icon: Images.dashborad,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminDashboard" },
        }),
    },
    {
      id: 1,
      title: "Sim Data Management",
      type: "item",
      icon: Images.simdata,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminSimDataManagement" },
        }),
    },
    {
      id: 2,
      title: "Manage Meters",
      type: "item",
      icon: Images.meters,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminManageMeters" },
        }),
    },
    {
      id: 3,
      title: "Manage Transactions",
      type: "item",
      icon: Images.managetrans,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminManageTransactions" },
        }),
    },
    {
      id: 4,
      title: "Manage property group",
      type: "item",
      icon: Images.managegroups,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminManagePropertyGroup" },
        }),
    },
    {
      id: 5,
      title: "Manage Vending History",
      type: "item",
      icon: Images.managehistory,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminManageVendingHistory" },
        }),
    },
    {
      id: 6,
      title: "Analysis",
      type: "item",
      icon: Images.analysis,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "Analysis" },
        }),
    },
    {
      id: 7,
      title: "Settings",
      type: "item",
      icon: Images.settings,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminUtilitiesSettings" },
        }),
    },
  ];

  const tenantItems = [
    {
      id: 0,
      title: "Dashboard",
      type: "item",
      icon: Images.dashborad,
      onPress: () =>
        closeMenusAndNavigate("Tenant", {
          screen: "Home",
          params: { screen: "TenantDashboard" },
        }),
    },

    {
      id: 1,
      title: "Assigned Property",
      type: "item",
      icon: Images.propreq,
      onPress: () => closeMenusAndNavigate("TenantAssignedProp"),
    },
    {
      id: 2,
      title: "Facility Management",
      type: "dropdown",
      icon: Images.facilitymanag,
      menueItems: [
        {
          id: 0,
          title: "Work Requests",
          onPress: () =>
            closeMenusAndNavigate("Tenant", {
              screen: "Home",
              params: {
                screen: "FacilityManagement",
                params: { status: "work_requests" },
              },
            }),
        },
        {
          id: 1,
          title: "Work Orders",
          onPress: () =>
            closeMenusAndNavigate("Tenant", {
              screen: "Home",
              params: {
                screen: "FacilityManagement",
                params: { status: "work_orders" },
              },
            }),
        },
        {
          id: 2,
          title: "Completed",
          onPress: () =>
            closeMenusAndNavigate("Tenant", {
              screen: "Home",
              params: {
                screen: "FacilityManagement",
                params: { status: "completed" },
              },
            }),
        },
      ],
    },
    {
      id: 3,
      title: "Visitor Management",
      type: "item",
      icon: Images.visitormanagement,
      onPress: () =>
        closeMenusAndNavigate("Tenant", {
          screen: "Home",
          params: { screen: "VisitorRequests" },
        }),
    },
    {
      id: 4,
      title: "Community Area",
      type: "dropdown",
      icon: Images.community,
      nestedItems: [
        {
          id: 0,
          title: "Amenities",
          onPress: () =>
            closeMenusAndNavigate("Tenant", {
              screen: "Home",
              params: {
                screen: "CommunityArea",
                params: { tab: "amenities" },
              },
            }),
        },
        {
          id: 1,
          title: "Reservations",
          onPress: () =>
            closeMenusAndNavigate("Tenant", {
              screen: "Home",
              params: {
                screen: "CommunityArea",
                params: { tab: "reservations" },
              },
            }),
        },
      ],
    },

    {
      id: 5,
      title: "Utilities",
      type: "dropdown",
      icon: Images.settings,
      menueItems: [
        {
          id: 1,
          title: "Summary",
          type: "item",
          icon: Images.simdata,
          onPress: () =>
            closeMenusAndNavigate("Home", {
              screen: "UtilitiesSummary",
            }),
        },
        {
          id: 2,
          title: "My Meter",
          type: "item",
          icon: Images.meters,
          onPress: () =>
            closeMenusAndNavigate("Home", {
              screen: "TenantUtilitiesMyMeter",
            }),
        },
        {
          id: 3,
          title: "Charges",
          type: "item",
          icon: Images.managetrans,
          onPress: () =>
            closeMenusAndNavigate("Home", {
              screen: "TenantUtilitiesCharges",
            }),
        },
        {
          id: 4,
          title: "Transactions",
          type: "item",
          icon: Images.managegroups,
          onPress: () =>
            closeMenusAndNavigate("Home", {
              screen: "TenantUtilitiesTransactions",
            }),
        },
        {
          id: 5,
          title: "Vending History",
          type: "item",
          icon: Images.managehistory,
          onPress: () =>
            closeMenusAndNavigate("Home", {
              screen: "TenantUtilitiesVendingHistory",
            }),
        },
        {
          id: 6,
          title: "Report an Issue",
          type: "item",
          icon: Images.settings,
          onPress: () =>
            closeMenusAndNavigate("Home", {
              screen: "TenantUtilitiesReportIssue",
            }),
        },
      ],
    },
    {
      id: 6,
      title: "Utilities Analysis",
      type: "dropdown",
      icon: Images.analysis,
      menueItems: [
        {
          id: 1,
          title: "Power Consumption",
          type: "item",
          icon: Images.simdata,

          onPress: () =>
            closeMenusAndNavigate("Tenant", {
              screen: "Home",
              params: {
                screen: "Analysis",
                params: { tab: "power_consumption" },
              },
            }),
        },
        {
          id: 2,
          title: "Vending History",
          type: "item",
          icon: Images.meters,
          onPress: () =>
            closeMenusAndNavigate("Tenant", {
              screen: "Home",
              params: {
                screen: "Analysis",
                params: { tab: "vending_history" },
              },
            }),
        },
      ],
    },
    {
      id: 7,
      title: "Communications",
      type: "dropdown",
      icon: Images.communication,
      menueItems: [
        {
          id: 0,
          title: "Message History",
          onPress: () => closeMenusAndNavigate("MessageHistory"),
        },
      ],
    },

    {
      id: 8,
      title: "Emergency",
      type: "item",
      icon: Images.emergency,
      onPress: () =>
        closeMenusAndNavigate("Tenant", {
          screen: "Home",
          params: { screen: "Emergency" },
        }),
    },
    {
      id: 9,
      title: "Wallet",
      type: "item",
      icon: Images.wallet,
      onPress: () =>
        closeMenusAndNavigate("Tenant", {
          screen: "Wallet",
        }),
    },

    {
      id: 10,
      title: "Payments",
      type: "item",
      icon: Images.wallet,
      onPress: () => closeMenusAndNavigate("TenantRentPayment"),
    },
    {
      id: 11,
      title: "Chat",
      type: "item",
      icon: Images.communication,
      onPress: () =>
        closeMenusAndNavigate("Tenant", {
          screen: "Chat",
        }),
    },
  ];

  const agentItems = [
    {
      id: 0,
      title: "Dashboard",
      type: "item",
      icon: Images.dashborad,
      onPress: () =>
        closeMenusAndNavigate("Agent", {
          screen: "Home",
          params: { screen: "AgentHome" },
        }),
    },
    {
      id: 1,
      title: "View Assigned Details",
      type: "item",
      icon: Images.propreq,
      onPress: () => closeMenusAndNavigate("ViewAssignedDetails"),
    },
    {
      id: 2,
      title: "Assigned Agent",
      type: "item",
      icon: Images.user,
      onPress: () => closeMenusAndNavigate("AssignedAgent"),
    },
    {
      id: 3,
      title: "Renegotiate Commission",
      type: "item",
      icon: Images.managetrans,
      onPress: () => closeMenusAndNavigate("RenegotiateCommission"),
    },
  ];

  const facilityManagerItems = [
    {
      id: 0,
      title: "Dashboard",
      type: "item",
      icon: Images.dashborad,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminDashboard" },
        }),
    },
    {
      id: 1,
      title: "Assigned Properties",
      type: "dropdown",
      icon: Images.manageprop,
      menueItems: [
        {
          id: 0,
          title: "Add Property",
          // onPress: () => console.log(""),
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Properties",
              params: { screen: "AdminPropertyManagement" },
            }),
        },
        {
          id: 1,
          title: "Property List",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Properties",
              params: {
                screen: "AdminPropertyManagement",
                params: { propertyType: "managed" },
              },
            }),
        },
        {
          id: 2,
          title: "Property Groups",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "AdminPropertyRequests",
              },
            }),
        },
      ],
    },

    {
      id: 2,
      title: "Facility Management",
      type: "dropdown",
      icon: Images.facilitymanag,
      menueItems: [
        {
          id: 0,
          title: "Work Requests",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "FacilityManagement",
                params: { status: "work_requests" },
              },
            }),
        },
        {
          id: 1,
          title: "Work Orders",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "FacilityManagement",
                params: { status: "work_orders" },
              },
            }),
        },
        {
          id: 2,
          title: "Completed",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "FacilityManagement",
                params: { status: "completed" },
              },
            }),
        },
      ],
    },
    {
      id: 3,
      title: "Team",
      type: "dropdown",
      icon: Images.managebooking,
      menueItems: [
        {
          id: 0,
          title: "View Team",
          onPress: () => closeMenusAndNavigate("ViewTeamMember"),
        },

        {
          id: 1,
          title: "Add Team Member",
          onPress: () => closeMenusAndNavigate("AddTeamMember"),
        },
      ],
    },
    {
      id: 4,
      title: "Tenants",
      type: "dropdown",
      icon: Images.tenants,
      menueItems: [
        {
          id: 0,
          title: "Tenant List",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "AdminTenants" },
            }),
        },
        {
          id: 1,
          title: "Requests",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "AdminTenants" },
            }),
        },
      ],
    },
    {
      id: 5,
      title: "Visitor Management",
      type: "item",
      icon: Images.visitormanagement,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "VisitorRequests" },
        }),
    },

    {
      id: 6,
      title: "Community Area",
      type: "dropdown",
      icon: Images.community,
      nestedItems: [
        {
          id: 0,
          title: "Amenities",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "CommunityArea",
                params: { tab: "amenities" },
              },
            }),
        },
        {
          id: 1,
          title: "Reservations",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: {
                screen: "CommunityArea",
                params: { tab: "reservations" },
              },
            }),
        },
      ],
    },

    {
      id: 7,
      title: "Communications",
      type: "dropdown",
      icon: Images.communication,
      nestedItems: [
        {
          id: 0,
          title: "New Message",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "MessageHistory" },
            }),
        },
        {
          id: 1,
          title: "Message History",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "MessageHistory" },
            }),
        },
      ],
    },

    {
      id: 8,
      title: "Wallet",
      type: "item",
      icon: Images.wallet,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Wallet",
        }),
    },

    {
      id: 9,
      title: "Payments",
      type: "item",
      icon: Images.emergency,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "Emergency" },
        }),
    },

    {
      id: 10,
      title: "Emergency",
      type: "item",
      icon: Images.emergency,
      onPress: () => closeMenusAndNavigate("Emergency"),
    },
    {
      id: 11,
      title: "Chat",
      type: "item",
      icon: Images.chat,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Chat",
        }),
    },
  ];

  const facilityManagerUtilitiesItems = [
    {
      id: 0,
      title: "Summary",
      type: "item",
      icon: Images.simdata,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminSimDataManagement" },
        }),
    },
    {
      id: 1,
      title: "Manage Meters",
      type: "item",
      icon: Images.meters,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminManageMeters" },
        }),
    },
    {
      id: 2,
      title: "Manage Charges",
      type: "item",
      icon: Images.managetrans,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminManageTransactions" },
        }),
    },

    {
      id: 3,
      title: "Manage Transactions",
      type: "item",
      icon: Images.managetrans,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminManageTransactions" },
        }),
    },

    {
      id: 4,
      title: "Vending History",
      type: "item",
      icon: Images.managehistory,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminManageVendingHistory" },
        }),
    },
    {
      id: 5,
      title: "Manage Issues",
      type: "item",
      icon: Images.managehistory,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminManageVendingHistory" },
        }),
    },
    {
      id: 6,
      title: "Analysis",
      type: "dropdown",
      icon: Images.analysis,
      menueItems: [
        {
          id: 0,
          title: "Power Consumption",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "Analysis" },
            }),
        },
        {
          id: 0,
          title: "Vending History",
          onPress: () =>
            closeMenusAndNavigate("Admin", {
              screen: "Home",
              params: { screen: "Analysis" },
            }),
        },
      ],
    },
    {
      id: 7,
      title: "Settings",
      type: "item",
      icon: Images.settings,
      onPress: () =>
        closeMenusAndNavigate("Admin", {
          screen: "Home",
          params: { screen: "AdminUtilitiesSettings" },
        }),
    },
  ];

  const getItemsForRole = () => {
    switch (user?.role) {
      case "admin":
        return active === 0 ? propertiesItems : utilitesItems;
      case "tenant":
        return tenantItems;
      case "agent":
        return agentItems;
      case "facility_manager":
        return active === 0
          ? facilityManagerItems
          : facilityManagerUtilitiesItems;
      default:
        return []; // Return empty array for unknown roles or if user is not logged in
    }
  };

  const items = getItemsForRole();

  // Google Ads placeholder component
  const GoogleAdsPlaceholder = () => (
    <View style={styles.adsContainer}>
      <View style={styles.adsPlaceholder}>
        <Text weight="semiBold" style={styles.adsText}>
          Google Ads
        </Text>
        <Text style={styles.adsSubtext}>Advertisement Space</Text>
      </View>
    </View>
  );

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.primary }}
    >
      <View style={styles.container}>
        {/* Google Ads Placeholder */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              closeMenusAndNavigate("Profile", {
                screen: "Home",
              })
            }
          >
            <WithLocalSvg asset={Images.user} />
          </TouchableOpacity>
          <View style={styles.headerinfo}>
            <Text style={styles._welcomtext}>Welcome!</Text>
            <Text weight="semiBold" style={styles.username}>
              {user?.firstname} {user?.lastname}
            </Text>
            <Text style={styles.role}>{user?.role}</Text>
          </View>
          <TouchableOpacity style={styles.headerIcons} activeOpacity={0.6}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        </View>

        {/* tabs */}

        {user?.role === "admin" ||
          (user?.role === "facility_manager" && (
            <View style={styles.tab_row}>
              <TouchableOpacity
                onPress={() => setactive(0)}
                activeOpacity={0.6}
                style={[active === 0 ? styles.active_tabitem : styles._tabitem]}
              >
                <Text
                  weight="medium"
                  text={"Properties"}
                  style={[active === 0 ? styles.active_text : styles.tabtext]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setactive(1)}
                activeOpacity={0.6}
                style={[active === 1 ? styles.active_tabitem : styles._tabitem]}
              >
                <Text
                  weight="medium"
                  text="Utilities"
                  style={[active === 1 ? styles.active_text : styles.tabtext]}
                />
              </TouchableOpacity>
            </View>
          ))}

        {items.map((val, i) => {
          return (
            <TouchableOpacity
              key={val.id ?? i}
              style={[styles.menuItem]}
              activeOpacity={0.8}
              onPress={() => {
                if (val.type === "dropdown") {
                  setOpenId((prev) => (prev === val.id ? null : val.id));
                } else {
                  // Invoke item's onPress if provided, else fallback
                  if (typeof (val as any).onPress === "function") {
                    (val as any).onPress();
                  } else {
                    props.navigation.navigate("Home");
                  }
                }
              }}
            >
              <View style={styles.menuItemContent}>
                <View style={styles._mainitem}>
                  <WithLocalSvg asset={val.icon} height={20} width={20} />
                  <Text
                    weight="semiBold"
                    text={val.title}
                    style={[styles.menuText]}
                  />
                  {val.type === "dropdown" && (
                    <MaterialIcons
                      name={
                        openId === val.id
                          ? "keyboard-arrow-up"
                          : "keyboard-arrow-down"
                      }
                      size={20}
                      color={colors.white}
                    />
                  )}
                </View>
                {val.type === "dropdown" &&
                  openId === val.id &&
                  (() => {
                    const children =
                      (val as any).nestedItems || (val as any).menueItems;
                    if (!children) return null;
                    return (
                      <View style={styles._nestedmenu}>
                        {children.map((nested: any, index: number) => (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            key={nested.id ?? index}
                            style={styles._nested_items}
                            onPress={() => {
                              if (typeof nested.onPress === "function") {
                                nested.onPress();
                              }
                            }}
                          >
                            <Text
                              weight="semiBold"
                              text={nested.title}
                              style={[
                                styles.menuText,
                                { color: colors.primary },
                              ]}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    );
                  })()}
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles._divider} />
        <TouchableOpacity style={styles.logoutbtn} onPress={handleLogout}>
          <WithLocalSvg asset={Images.logout} />
          <Text weight="semiBold" text="Logout" style={styles.menuText} />
        </TouchableOpacity>
      </View>
      <GoogleAdsPlaceholder />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  adsContainer: {
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  adsPlaceholder: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderStyle: "dashed",
  },
  adsText: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 4,
  },
  adsSubtext: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
  },

  menuItem: {
    paddingVertical: adjustSize(5),
    marginVertical: adjustSize(5),
  },
  menuItemContent: {
    flexDirection: "column",
  },

  menuText: {
    fontSize: adjustSize(12),
    color: colors.white,
    marginLeft: adjustSize(10),
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(15),
    borderBottomWidth: adjustSize(0.4),
    borderColor: colors.white,
    marginBottom: adjustSize(15),
    paddingHorizontal: adjustSize(10),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },

  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(14),
    lineHeight: adjustSize(16),
  },
  username: {
    fontSize: adjustSize(15),
    color: "#B0B0B0",
    lineHeight: adjustSize(20),
  },
  role: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(14),
    color: colors.white,
  },
  tab_row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: adjustSize(1),
    borderColor: colors.white,
    height: adjustSize(30),
    borderRadius: adjustSize(7),
    overflow: "hidden",
    marginVertical: adjustSize(10),
  },
  active_tabitem: {
    backgroundColor: colors.white,
    flex: 1,
    height: adjustSize(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: adjustSize(7),
  },
  _tabitem: {
    flex: 1,
    height: adjustSize(30),
    justifyContent: "center",
    alignItems: "center",
  },
  active_text: {
    fontSize: adjustSize(10),
  },
  tabtext: {
    color: colors.white,
    fontSize: adjustSize(10),
  },
  _mainitem: {
    flexDirection: "row",
    alignItems: "center",
  },
  _nestedmenu: {
    padding: adjustSize(10),
    backgroundColor: colors.white,
    borderRadius: adjustSize(7),
    marginTop: adjustSize(15),
    gap: adjustSize(10),
  },
  _nested_items: {
    borderWidth: 1,
    borderRadius: adjustSize(10),
    borderColor: colors.primary,
    padding: adjustSize(8),
    justifyContent: "center",
  },
  logoutbtn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: adjustSize(10),
  },
  _divider: {
    borderBottomWidth: adjustSize(0.5),
    borderColor: colors.white,
    marginTop: 40,
    marginBottom: adjustSize(10),
  },
});
