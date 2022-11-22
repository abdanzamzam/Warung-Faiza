import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  AppBar,
  Provider,
  Stack,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  TextInput
} from "@react-native-material/core";
import PopupPrice from "./components/PopupPrice";
import { View, ActivityIndicator } from "react-native";
import PopupSetPrice from "./components/PopupSetPrice";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeComponent from "./components/BarcodeComponent";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [viewItem, setViewItem] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [scanner, setScanner] = useState(false);
  const [result, setResult] = useState(false);
  const [data, setData] = useState(null);
  const [responseAPI, setResponseAPI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setLoading(false);
    })();
  }, [data]);

  const handleBarCodeScanned = ({ type, data }) => {
    setLoading(true);
    setScanner(false);
    setResult(true);
    setData({ type, data });
    setLoading(false);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (data && !scanner && viewDetail) {
    return (
      <>
        <PopupPrice
          viewItem={viewItem}
          setViewItem={setViewItem}
          data={data}
          setData={setData}
          setViewDetail={setViewDetail}
          setLoading={setLoading}
          responseAPI={responseAPI}
          setResponseAPI={setResponseAPI}
        />
      </>
    );
  }

  return (
    <>
      {loading && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="pink" />
        </View>
      )}
      {!loading && (
        <>
          <AppBar
            title="Warung Faiza"
            style={{ paddingTop: 20, backgroundColor: "pink" }}
            color="red"
          />
          <PopupSetPrice
            addItem={addItem}
            setAddItem={setAddItem}
            setScanner={setScanner}
            data={data}
            setData={setData}
            setResult={setResult}
            loading={loading}
            setLoading={setLoading}
          />
          <PopupPrice
            viewItem={viewItem}
            setViewItem={setViewItem}
            data={data}
            setData={setData}
            setViewDetail={setViewDetail}
            setLoading={setLoading}
            responseAPI={responseAPI}
            setResponseAPI={setResponseAPI}
          />
          {!viewItem && !addItem && !scanner && (
            <View style={styles.container}>
              <View style={{ marginBottom: 8 }}>
                <Button
                  style={{ backgroundColor: "pink", width: 200 }}
                  title="Tambah Barang"
                  color="red"
                  compact
                  onPress={() => setAddItem(true)}
                />
              </View>
              <View style={{ marginTop: 8 }}>
                <Button
                  style={{ backgroundColor: "pink", width: 200 }}
                  title="Harga Barang"
                  color="red"
                  compact
                  onPress={() => {
                    setViewItem(true);
                    setScanner(true);
                    setResult(false);
                    setViewDetail(true);
                  }}
                />
              </View>
            </View>
          )}
          {scanner && (
            <BarcodeComponent
              scanner={scanner}
              setScanner={setScanner}
              result={result}
              handleBarCodeScanned={handleBarCodeScanned}
              setViewItem={setViewItem}
            />
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
