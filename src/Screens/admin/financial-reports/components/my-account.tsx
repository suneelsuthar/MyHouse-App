import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { adjustSize, colors, typography } from "../../../../theme";
import { Text } from "../../../../Components";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store";
export const MyAccount = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const data = [
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
    },
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
    },
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
    },
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
    },
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
    },

    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MyHomes Payments</Text>

      {user?.role === "admin" && (
        <>
          <TouchableOpacity activeOpacity={0.2} style={styles.btn}>
            <Text style={styles.btnTxt}>Payment of Charges</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} style={styles.btn}>
            <Text style={styles.btnTxt}>Upgrade membership plan</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} style={styles.btn}>
            <Text style={styles.btnTxt}>Utility Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} style={styles.btn}>
            <Text style={styles.btnTxt}>Payment of Charges</Text>
          </TouchableOpacity>
        </>
      )}

      {console.log(user)}
      {user?.role === "tenant" && (
        <>
          <TouchableOpacity activeOpacity={0.2} style={styles.btn}>
            <Text style={styles.btnTxt}>Utility Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} style={styles.btn}>
            <Text style={styles.btnTxt}>Payment of Charges</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.heading}>Send to</Text>
      {data.map((val, index) => {
        return (
          <TouchableOpacity key={index} activeOpacity={0.3} style={styles.list}>
            <Image source={{ uri: val.profileURL }} style={styles.thumbnail} />
            <View>
              <Text style={styles.name}>{val.name}</Text>
              <Text style={styles.bankName}>{val.bankName}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: adjustSize(10),
  },
  heading: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(15),
    marginBottom: adjustSize(5),
  },
  btn: {
    backgroundColor: colors.primary,
    borderWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
    height: adjustSize(47),
    borderRadius: adjustSize(7),
    alignItems: "center",
    justifyContent: "center",
    marginTop: adjustSize(10),
  },
  btnTxt: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  thumbnail: {
    backgroundColor: "#D9D9D9",
    height: adjustSize(58),
    width: adjustSize(58),
    borderRadius: 100,
    marginRight: adjustSize(15),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: adjustSize(7),
    marginBottom: adjustSize(10),
  },
  name: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    lineHeight: adjustSize(20),
  },
  bankName: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
});
