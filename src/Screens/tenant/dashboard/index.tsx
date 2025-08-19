import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Screen, Text, Button } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logoutUser } from "../../../store/thunks/authThunks";
import { selectUser } from "../../../store/selectors";
import { Ionicons } from "@expo/vector-icons";

interface TenantDashboardProps extends AppStackScreenProps<"TenantDashboard"> {}

export function TenantDashboard(props: TenantDashboardProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} weight="bold">
            Tenant Dashboard
          </Text>
          <TouchableOpacity 
            style={styles.logoutBtn}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        {user && (
          <View style={styles.userInfo}>
            <Text text={`Welcome, ${user.role}!`} style={styles.welcomeText} />
            <Text text={user.email} style={styles.emailText} />
          </View>
        )}
        
        <View style={styles.content}>
          <Text style={styles.description}>
            Welcome to your tenant dashboard. Here you can view your property information, recent activities, and quick actions.
          </Text>
        </View>

        <Button
          text="Back to Tenant Home"
          style={styles.backButton}
          textStyle={styles.backButtonText}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    backgroundColor: colors.palette.neutral100,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  welcomeText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  emailText: {
    color: colors.textDim,
    fontSize: 12,
    marginTop: 2,
  },
});
