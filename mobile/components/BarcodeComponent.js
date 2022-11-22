import { View, StyleSheet } from "react-native";
import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "@react-native-material/core";

export default function BarcodeComponent({
  result,
  scanner,
  setScanner,
  handleBarCodeScanned,
  setViewItem,
}) {
  return (
    <>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={result ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanner && (
        <View style={{ height: 45 }}>
          <Button
            style={{ height: 65, backgroundColor: "pink" }}
            color="red"
            title={"Kembali"}
            onPress={() => setScanner(false)}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
});
