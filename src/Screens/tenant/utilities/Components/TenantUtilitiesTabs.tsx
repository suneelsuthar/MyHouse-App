import React from "react";
import { CustomTabs } from "../../../../Components";
import {
  SummaryIcon,
  TransactionIcon,
  MyMeterIcon,
  ChargesIcon,
  ReportIssueIcon,
  VendingHistoryIcon,
} from "../../../../assets/svg";
import { colors } from "../../../../theme";
import { useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store";

interface TenantUtilitiesTabsProps {
  activeTab: string;
  navigation: any;
  children: any;
}

export const TenantUtilitiesTabs: React.FC<TenantUtilitiesTabsProps> = ({
  activeTab,
  navigation,
  children,
}) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const onTabChangeHandler = (label: string) => {
    switch (label) {
      case "Summary":
        navigation.navigate("UtilitiesSummary");
        break;
      case "Transaction":
        navigation.navigate("TenantUtilitiesTransactions");
        break;
      case "My meter":
        navigation.navigate("UtilitiesMyMeter");
        break;
      case "Manage Meters":
        navigation.navigate("UtilitiesManagerMeters");
        break;
      case "Charges":
        navigation.navigate("UtilitiesCharges");
        break;
      case "Report issue":
        navigation.navigate("TenantUtilitiesReportIssue");
        break;
      case "Vending History":
        navigation.navigate("TenantUtilitiesVendingHistory");
        break;
    }
  };

  const tabs = [
    {
      label: "Summary",
      activeIcon: <SummaryIcon color={colors.white} />,
      inactiveIcon: <SummaryIcon color={colors.white} />,
    },
    {
      label: "Transaction",
      activeIcon: <TransactionIcon color={colors.white} />,
      inactiveIcon: <TransactionIcon color={colors.white} />,
    },
    user?.role === "facility_manager" || user?.role === "admin"
      ? {
          label: "Manage Meters",
          activeIcon: <MyMeterIcon color={colors.white} />,
          inactiveIcon: <MyMeterIcon color={colors.white} />,
        }
      : {
          label: "My meter",
          activeIcon: <MyMeterIcon color={colors.white} />,
          inactiveIcon: <MyMeterIcon color={colors.white} />,
        },
    {
      label: "Charges",
      activeIcon: <ChargesIcon color={colors.white} />,
      inactiveIcon: <ChargesIcon color={colors.white} />,
    },
    {
      label: "Report issue",
      activeIcon: <ReportIssueIcon color={colors.white} />,
      inactiveIcon: <ReportIssueIcon color={colors.white} />,
    },
    {
      label: "Vending History",
      activeIcon: <VendingHistoryIcon color={colors.white} />,
      inactiveIcon: <VendingHistoryIcon color={colors.primaryLight} />,
    },
  ];

  return (
    <CustomTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChangeHandler}
    >
      {children}
    </CustomTabs>
  );
};
