import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import alpacaAPI from "../../services/alpaca";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import CoinDetail from "../CoinDetail";
import Gradient from "../Gradient";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101a21",
    padding: 3,
  },
  welcome: {
    marginBottom: 4,
    padding: 3,
    backgroundColor: "#101a21",
    // flex: 1.5,
    alignSelf: "center",
  },
  positions: {
    padding: 3,
    backgroundColor: "#101a21",
    borderBottomWidth: 1,
  },
  coinDetail: {
    padding: 3,
    backgroundColor: "#101a21",
    borderBottomWidth: 1,
  },
  news: {
    flex: 3,
    padding: 3,
    backgroundColor: "#101a21",
  },
  positionsContainer: {
    borderRadius: 5,
    backgroundColor: "#101a21",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  openButtonText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: "#3f8f29", // Optional: background color
    width: 150,
    alignItems: "center",
    margin: 3,
  },
  closeButtonText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: "#de1a24", // Optional: background color
    width: 150,
    alignItems: "center",
    margin: 3,
  },
  manageButtonText: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    width: 60,
    alignItems: "center",
    margin: 3,
  },
  hotContainer: { flexDirection: "row" },
});

const NewsTab = ({ news }) => {
  return (
    <View
      style={{
        padding: 2,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "white",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          color: "white",
          paddingBottom: 4,
        }}
      >
        {news.headline}
      </Text>
      {/* <Text>{news.summary}</Text> */}
      <Text style={{ color: "white" }}>
        Ticker: {news.symbols[0]}, {news.symbols[1]}
      </Text>
    </View>
  );
};

const WelcomeScreen = () => {
  const [accountData, setAccountData] = useState(null);
  const [news, setNews] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate a network request
    await fetchCoinData();
    await fetchNews();
    await fetchAccountData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    alpacaAPI
      .getAccount()
      .then((response) => {
        setAccountData(response);
      })
      .catch((error) => {
        console.error("Error fetching account data: ", error);
      });
    alpacaAPI
      .getNews()
      .then((response) => {
        setNews(response);
      })
      .catch((error) => {
        console.error("Error fetching news: ", error);
      });
    alpacaAPI
      .getCoinData()
      .then((response) => {
        setCoinData(response);
      })
      .catch((error) => {
        console.error("Error fetching coin data: ", error);
      });
  }, []);

  const fetchNews = async () => {
    try {
      const newsResponse = await alpacaAPI.getNews();
      setNews(newsResponse);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const fetchCoinData = async () => {
    try {
      const coinDataResponse = await alpacaAPI.getCoinData();
      setCoinData(coinDataResponse);
    } catch (error) {
      console.error("Error fetching coinData:", error);
    }
  };

  const fetchAccountData = async () => {
    try {
      const accountDataResponse = await alpacaAPI.getAccount();
      setAccountData(accountDataResponse);
    } catch (error) {
      console.error("Error fetching accountData:", error);
    }
  };

  const width = useWindowDimensions();

  if (!accountData || !news || !coinData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Portfolio Section */}
      <View style={{ flexDirection: "column" }}>
        <View style={styles.welcome}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#ed702d",
              alignSelf: "center",
            }}
          >
            Portfolio balance
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "grey",
            }}
          >
            ${parseFloat(accountData.equity).toLocaleString()}
          </Text>
        </View>
        {/* height: 200, width: 300, alignSelf: "center"  */}
        <View style={{ height: 300, width: width }}>
          <LottieView
            style={{ flex: 1 }}
            source={require("../../../assets/main.json")}
            autoPlay
            loop
          />
        </View>
      </View>

      {/* Coin Details Section */}
      <View style={styles.coinDetail}>
        {/* Coin Detail Header */}
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 4,
              color: "#ed702d",
              paddingRight: 6,
            }}
          >
            Top 10 Cryptos
          </Text>
          <FontAwesome5 name="fire" color={"#ed702d"} size={24} />
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
            paddingLeft: 3,
          }}
        >
          <Text style={{ color: "#bcbcbc", flex: 1, fontWeight: "bold" }}>
            Cryptocurrency
          </Text>
          <Text
            style={{ color: "#bcbcbc", textAlign: "right", fontWeight: "bold" }}
          >
            Price (USD)
          </Text>
        </View>

        {/* Coin Detail */}
        {coinData && coinData.length > 0 ? (
          coinData.map((c) => <CoinDetail coin={c} key={c.id} />)
        ) : (
          <Text style={{ color: "white" }}>Loading...</Text>
        )}
      </View>

      {/* News Section */}
      <View style={styles.news}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 4,
              color: "#ed702d",
              paddingRight: 6,
            }}
          >
            News
          </Text>
          <Entypo name="news" color={"#ed702d"} size={24} />
        </View>
        {news.news && news.news.length > 0 ? (
          news.news.map((n) => <NewsTab news={n} key={n.id} />)
        ) : (
          <Text>Nothing is here</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen;
