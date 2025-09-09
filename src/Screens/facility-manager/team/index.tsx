import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Screen, Button } from "../../../Components";
import { colors } from "../../../theme/colors";
// import { adjustSize } from "../../../theme/responsive";
import { useNavigation } from "@react-navigation/native";
import { adjustSize } from "../../../theme";
const TeamList = () => {
  const navigation = useNavigation();

  const teamMembers = [
    { id: "1", name: "John Doe", role: "Maintenance" },
    { id: "2", name: "Jane Smith", role: "Supervisor" },
    // Add more team members as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.teamMemberCard}>
      <View>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
      </View>
      <Button
        text="View Details"
        onPress={() =>
          navigation.navigate("ViewTeamMember", { memberId: item.id })
        }
        style={styles.viewButton}
        textStyle={styles.buttonText}
      />
    </View>
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Team Members</Text>
        <Button
          text="+ Add Member"
          onPress={() => navigation.navigate("AddTeamMember")}
          style={styles.addButton}
          textStyle={styles.buttonText}
        />
      </View>

      <FlatList
        data={teamMembers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: adjustSize(16),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: adjustSize(20),
  },
  header: {
    fontSize: adjustSize(24),
    fontWeight: "600",
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: adjustSize(16),
    paddingVertical: adjustSize(8),
    borderRadius: 8,
  },
  listContainer: {
    paddingBottom: adjustSize(20),
  },
  teamMemberCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: adjustSize(16),
    marginBottom: adjustSize(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...colors.shadow,
  },
  memberName: {
    fontSize: adjustSize(16),
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  memberRole: {
    fontSize: adjustSize(14),
    color: colors.textSecondary,
  },
  viewButton: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(6),
    borderRadius: 6,
  },
  buttonText: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontWeight: "500",
  },
});

export default TeamList;
