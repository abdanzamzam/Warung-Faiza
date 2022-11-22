import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ButtonAnt as Button, Modal, Space, Toast, Divider } from "antd-mobile";
import { DemoBlock, DemoDescription, sleep } from "demos";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [menu, setMenu] = useState("home");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [menu]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setMenu("home");
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (menu === "scanner") {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    );
  } else if (menu === "home") {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 10 }}>
          <Button
            title={"Cek Harga"}
            onPress={() => {
              setScanned(false);
              setMenu("scanner");
            }}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Button title={"Tambah Harga"} onPress={() => setScanned(false)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
