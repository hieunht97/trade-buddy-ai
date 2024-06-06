import React from "react";
import { Text, View, Image } from "react-native";
import { StyleSheet } from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

const styles = StyleSheet.create({
  hotContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});

const CoinDetail = ({ coin }) => {
  return (
    <View style={styles.hotContainer}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ padding: 5, paddingRight: 10 }}>
          <Image
            source={{ uri: coin.image }}
            style={{ height: 24, width: 24 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                paddingRight: 5,
              }}
            >
              {coin.name}
            </Text>
            <View
              style={{
                backgroundColor: "#585858",
                paddingHorizontal: 5,
                borderRadius: 5,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "900",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {coin.market_cap_rank}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                color: "#bcbcbc",
                paddingRight: 3,
              }}
            >
              {coin.symbol.toUpperCase()}
            </Text>
            {coin.market_cap_change_percentage_24h < 0 ? (
              <Entypo name="triangle-down" size={12} color={"red"} />
            ) : (
              <Entypo name="triangle-up" size={12} color={"green"} />
            )}
            <Text
              style={{
                color:
                  coin.market_cap_change_percentage_24h < 0 ? "red" : "green",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {coin.market_cap_change_percentage_24h}%
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: coin.market_cap_change_percentage_24h < 0 ? "red" : "green",
          fontWeight: "bold",
          textAlign: "right",
          fontSize: 13,
        }}
      >
        {coin.current_price}
      </Text>
    </View>
  );
};

export default CoinDetail;
