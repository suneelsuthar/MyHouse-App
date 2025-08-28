import React, { useMemo, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { Screen, Text, Button, TextField } from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import Feather from "@expo/vector-icons/Feather";
import { AppStackScreenProps } from "../../../utils/interfaces";

type Agent = {
  id: string;
  name: string;
  code: string;
  avatar: string;
};

const MOCK_AGENTS: Agent[] = [
  {
    id: "1",
    name: "Daniel lee",
    code: "12345",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "2",
    name: "Daniel lee",
    code: "12345",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    name: "Daniel lee",
    code: "12345",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "4",
    name: "Daniel lee",
    code: "12345",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: "5",
    name: "Daniel lee",
    code: "12345",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

export function AdminAssignProperties({
  route,
  navigation,
}: AppStackScreenProps<"AdminAssignProperties">) {
  const assignType = route?.params?.type;
  const headerTitle = useMemo(() => {
    switch (assignType) {
      case "fm":
        return "Assign Property to a Facility Manager";
      case "tenant":
        return "Assign Property to a Registered tenant";
      case "agent":
      default:
        return "Assign Property to a Registered Agent";
    }
  }, [assignType]);
  const searchPlaceholder = useMemo(() => {
    switch (assignType) {
      case "fm":
        return "Search facility manager";
      case "tenant":
        return "Search tenant";
      case "agent":
      default:
        return "Search agent";
    }
  }, [assignType]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({
    "1": true,
    "5": true,
  });
  const [commission, setCommission] = useState<Record<string, number>>({
    "1": 0,
    "5": 0,
  });
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_AGENTS;
    return MOCK_AGENTS.filter(
      (a) => a.name.toLowerCase().includes(q) || a.code.includes(q)
    );
  }, [query]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      // Initialize commission if turning on
      if (!prev[id]) {
        setCommission((c) => ({ [id]: c[id] ?? 0, ...c }));
      }
      return next;
    });
  };

  const inc = (id: string) =>
    setCommission((c) => ({ ...c, [id]: Math.min(100, (c[id] ?? 0) + 1) }));
  const dec = (id: string) =>
    setCommission((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }));

  const canAssign = useMemo(
    () => Object.entries(selected).some(([id, v]) => v),
    [selected]
  );

  const onAssign = () => {
    if (!canAssign) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
      // Navigate back or show toast in real app
    }, 800);
  };

  const renderAgent = ({ item }: { item: Agent }) => {
    const isChecked = !!selected[item.id];
    const comm = commission[item.id] ?? 0;
    return (
      <View style={styles.agentRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.agentName}>{item.name}</Text>
              <Text style={styles.agentCode}>({item.code})</Text>
            </View>
            <Pressable
              onPress={() => toggle(item.id)}
              style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            >
              {isChecked && (
                <Feather name="check" size={16} color={colors.white} />
              )}
            </Pressable>
          </View>
          {isChecked && assignType !== "fm" && (
            <View style={styles.commissionRow}>
              <Text style={styles.commissionLabel}>Commission %:</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.sm,
                }}
              >
                <Pressable style={styles.stepBtn} onPress={() => dec(item.id)}>
                  <Text style={styles.stepBtnText}>-</Text>
                </Pressable>
                <View style={styles.commInputBox}>
                  <Text style={styles.commValue}>{comm}</Text>
                </View>
                <Pressable style={styles.stepBtn} onPress={() => inc(item.id)}>
                  <Text style={styles.stepBtnText}>+</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title={headerTitle} titleStyle={{ fontSize: adjustSize(14) }} />
      <View style={styles.container}>
        {/* Search */}
        <View style={styles.searchWrap}>
          <TextField
            value={query}
            onChangeText={setQuery}
            placeholder={searchPlaceholder}
            inputWrapperStyle={styles.searchInputWrap}
            style={styles.searchInput}
            placeholderTextColor={colors.primaryLight}
          />
          <View style={styles.searchIconBox}>
            <Feather name="search" size={18} color={colors.primaryLight} />
          </View>
        </View>

        {/* Agents List */}
        <FlatList
          data={filtered}
          keyExtractor={(it) => it.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderAgent}
          contentContainerStyle={{ paddingBottom: spacing.xxl }}
        />
      </View>
      {/* Bottom Assign Button */}
      <View style={styles.bottomBar}>
        <Button
          text={loading ? "Assigning..." : "Assign"}
          preset="reversed"
          style={styles.assignBtn}
          textStyle={styles.assignText}
          onPress={onAssign}
          disabled={!canAssign || loading}
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
    paddingHorizontal: spacing.lg,
  },
  searchWrap: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    position: "relative",
  },
  searchInputWrap: {
    height: adjustSize(46),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    borderWidth: 0.4,
    borderColor: colors.grey,
  },
  searchInput: {
    fontFamily: typography.fonts.poppins.medium,
  },
  searchIconBox: {
    position: "absolute",
    right: spacing.md,
    top: adjustSize(12),
    width: adjustSize(28),
    height: adjustSize(28),
    borderRadius: adjustSize(14),
    alignItems: "center",
    justifyContent: "center",
  },
  agentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.fill,
    borderRadius: adjustSize(12),
  },
  avatar: {
    width: adjustSize(59),
    height: adjustSize(59),
    borderRadius: adjustSize(30),
    marginRight: spacing.md,
    backgroundColor: colors.white,
  },
  agentName: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: spacing.xs,
  },
  agentCode: {
    color: colors.grey,
    fontSize: adjustSize(12),
  },
  checkbox: {
    width: adjustSize(20),
    height: adjustSize(20),
    borderRadius: adjustSize(4),
    borderColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
    backgroundColor: colors.fill,
    borderWidth: 1,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  commissionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    justifyContent: "space-between",
    marginTop: adjustSize(6),
  },
  commissionLabel: {
    color: colors.primary,
    marginRight: spacing.sm,
    fontSize: adjustSize(12),
  },
  stepBtn: {
    width: adjustSize(23),
    height: adjustSize(23),
    borderRadius: adjustSize(5),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBtnText: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.semiBold,
    lineHeight: adjustSize(22),
    textAlign: "center",
    includeFontPadding: false,
  },
  commInputBox: {
    minWidth: adjustSize(44),
    height: adjustSize(27),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  commValue: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(12),
  },
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: adjustSize(20),
  },
  assignBtn: {
    height: adjustSize(52),
    borderRadius: adjustSize(14),
    backgroundColor: colors.primary,
  },
  assignText: {
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
