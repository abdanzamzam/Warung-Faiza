import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Stack,
  ActivityIndicator,
  AppBar,
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function PopupPrice({
  data,
  setData,
  viewItem,
  setViewItem,
  setViewDetail,
  setLoading,
  responseAPI,
  setResponseAPI
}) {

  const [result, setResult] = useState(null);

  const handleGetData = async () => {
    setLoading(true);

    const payload = {
      type: data.type.toString(),
      barcode: data.data
    };

    const response = await fetch("#", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        ...payload
      })
    });

    const result = await response.json();

    if (response.ok) {
      setData(null);
      setResult(result.products);
      setViewDetail(false);
      setResponseAPI(result);
    } else {
      setData(null);
      setViewDetail(false);
      alert("Error get data produk!");
    }

    // if (result.products === null) {
    //   setData(null);
    //   setViewDetail(false);
    //   alert("Error get data produk!");
    // }

    setLoading(false);
  };

  // useEffect(() => {
  //   if (data && !result) {
  //     handleGetData();
  //   }
  // }, [data]);

  return (
    <>
      <Provider>
        <Dialog
          visible={viewItem && result}
          onDismiss={() => setViewItem(false)}
        >
          <DialogHeader title="Detail Barang" />
          <DialogContent>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Barcode:</Text>{" "}
              {result && result.barcode ? result.barcode : ""}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Nama:</Text>{" "}
              {result && result.name ? result.name : ""}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Harga:</Text>{" "}
              {result && result.price ? result.price : ""}
            </Text>
          </DialogContent>
          <DialogActions>
            <Button
              title="Keluar"
              compact
              variant="text"
              onPress={() => {
                setViewItem(false);
                setData(null);
                setViewDetail(false);
                setLoading(true);
              }}
            />
          </DialogActions>
        </Dialog>
      </Provider>
    </>
  );
}
