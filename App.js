import React from "react";
import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "rgba(61, 143, 25, 0.5)",
        backgroundColor: "rgba(61, 143, 25, 0.3)",
        width: 300,
        top: 40,
      }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{ fontSize: 15, color: "white" }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  modifyTrade: ({ text1, text2, text3, props }) => (
    <View
      style={{
        maxWidth: "80%",
        backgroundColor: "rgba(122, 117, 117, 0.8)",
        borderRadius: 3,
        top: 25,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            color: "white",
            paddingHorizontal: 22,
            paddingTop: 15,
            fontWeight: "bold",
          }}
        >
          <AntDesign name="checkcircle" color={"#51d715"} size={14} /> {text1}
        </Text>
      </View>
      <Text
        style={{
          color: "white",
          paddingHorizontal: 22,
          paddingTop: 5,
          paddingBottom: 15,
        }}
      >
        {text2}
      </Text>
      {/* <Text>{props.uuid}</Text> */}
    </View>
  ),
};

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
        <Toast config={toastConfig} />
      </NativeRouter>
    </>
  );
}
