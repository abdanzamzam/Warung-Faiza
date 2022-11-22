import React, { useState, useEffect } from "react";
import {
  Provider,
  Stack,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  TextInput,
} from "@react-native-material/core";
import { ActivityIndicator } from "react-native";

export default function PopupSetPrice({
  data,
  setData,
  addItem,
  setAddItem,
  setScanner,
  setResult,
  setLoading,
  loading,
}) {
  const [type, setType] = useState("");
  const [barcode, setBarcode] = useState("");
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    setBarcode(data && data.data ? data.data : "");
    setType(data && data.type ? data.type : "");
    setNama("");
    setHarga("");
  }, [data]);

  const handleSendData = async () => {
    if (!barcode || !nama || !harga) {
      alert("Inputan tidak boleh kosong!");
    } else {
      setLoading(true);
      const response = await fetch("#", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          type: type ? type : 32,
          barcode: barcode,
          name: nama,
          price: harga,
        }),
      });

    //   const result = await response.json();

      if (response.ok) {
        setAddItem(false);
        setData(null);
        setResult(false);
        alert("Produk berhasil ditambahkan!");
      } else {
        setAddItem(false);
        setData(null);
        setResult(false);
        alert("Gagal menambahkan produk baru!");
      }

      setLoading(false);
    }
  };

  return (
    <>
      <Provider>
        <Dialog visible={addItem} onDismiss={() => setAddItem(false)}>
          <DialogHeader title="Tambah Barang" />
          {/* <View style={{ flexDirection: "row", width: "auto" }}>
            
          </View> */}
          <DialogContent>
            <Stack>
              <Button
                style={{
                  backgroundColor: "pink",
                  width: "100%",
                  marginBottom: 15,
                }}
                title="Scan Barcode"
                color="red"
                compact
                onPress={() => {
                  setScanner(true);
                  setResult(false);
                }}
              />
            </Stack>
            <Stack spacing={2}>
              {/* <Text>* Input disini.</Text> */}
              <TextInput
                label="Nomor Barcode"
                variant="standard"
                keyboardType="numeric"
                value={barcode}
                onChangeText={(e) => setBarcode(e)}
              />
              <TextInput
                label="Nama"
                variant="standard"
                value={nama}
                onChangeText={(e) => setNama(e)}
              />
              <TextInput
                label="Harga"
                variant="standard"
                keyboardType="numeric"
                value={harga}
                onChangeText={(e) => setHarga(e)}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              title="Keluar"
              color="pink"
              compact
              variant="text"
              onPress={() => {
                setAddItem(false);
                setData(null);
                setResult(false);
                setType("");
                setBarcode("");
                setNama("");
                setHarga("");
              }}
            />
            <Button
              title="Simpan"
              color="pink"
              compact
              variant="text"
              onPress={() => handleSendData()}
            />
          </DialogActions>
        </Dialog>
      </Provider>
    </>
  );
}
