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
  const onTabChangeHandler = (label: string) => {
    switch (label) {
      case "Summary":
        navigation.navigate("TenantUtilitiesSummary");
        break;
      case "Transaction":
        navigation.navigate("TenantUtilitiesTransactions");
        break;
      case "My meter":
        navigation.navigate("TenantUtilitiesMyMeter");
        break;
      case "Charges":
        navigation.navigate("TenantUtilitiesCharges");
        break;
      case "Report issue":
        navigation.navigate("TenantUtilitiesReportIssue");
        break;
      case "Vending History":
        navigation.navigate("TenantUtilitiesVendingHistory");
        break;
    }
  };

  return (
    <CustomTabs
      tabs={[
        {
          label: "Summary",
          activeIcon: <SummaryIcon color={colors.primary} />,
          inactiveIcon: <SummaryIcon color={colors.white} />,
        },
        {
          label: "Transaction",
          activeIcon: <TransactionIcon color={colors.primary} />,
          inactiveIcon: <TransactionIcon color={colors.white} />,
        },
        {
          label: "My meter",
          activeIcon: <MyMeterIcon color={colors.primary} />,
          inactiveIcon: <MyMeterIcon color={colors.white} />,
        },
        {
          label: "Charges",
          activeIcon: <ChargesIcon color={colors.primary} />,
          inactiveIcon: <ChargesIcon color={colors.white} />,
        },
        {
          label: "Report issue",
          activeIcon: <ReportIssueIcon color={colors.primary} />,
          inactiveIcon: <ReportIssueIcon color={colors.white} />,
        },
        {
          label: "Vending History",
          activeIcon: <VendingHistoryIcon color={colors.primary} />,
          inactiveIcon: <VendingHistoryIcon color={colors.white} />,
        },
      ]}
      activeTab={activeTab}
      onTabChange={onTabChangeHandler}
    >
      {children}
    </CustomTabs>
  );
};
