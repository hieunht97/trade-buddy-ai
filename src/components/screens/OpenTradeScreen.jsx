import React, { useEffect, useState, useCallback } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  Modal,
  RefreshControl,
  KeyboardAvoidingView,
} from "react-native";
import alpacaAPI from "../../services/alpaca";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101a21",
    padding: 3,
  },
  inputContainer: {
    margin: 5,
  },
  input: {
    height: 30,
    borderBottomWidth: 1,
    fontSize: 12,
    borderBottomColor: "white",
    color: "white",
  },
  confirmButton: {
    padding: 10,
    margin: 10,
    marginLeft: 5,
    backgroundColor: "#ed702d",
    alignItems: "center",
    borderRadius: 5,
  },
  cancelButton: {
    padding: 10,
    margin: 10,
    marginLeft: 5,
    backgroundColor: "grey",
    alignItems: "center",
    borderRadius: 5,
  },
  editButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    width: 60,
    alignItems: "center",
    margin: 3,
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
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  positionsContainer: {
    borderRadius: 5,
    backgroundColor: "#101a21",
  },
  positions: {
    padding: 3,
    backgroundColor: "#101a21",
    borderBottomWidth: 1,
  },
  modalContainer: {
    backgroundColor: "#101a21",
    borderRadius: 10,
    padding: 20,
    justifyContent: "flex-end",
    maxHeight: 400,
    flex: 1,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: "white",
  },
  dropdown: {
    borderColor: "white",
    borderRadius: 8,
    backgroundColor: "#101a21",
    marginTop: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  dropdownText: {
    color: "white",
    fontSize: 12,
  },
});

const OrderTab = ({ order, handleCloseOrderById }) => {
  // split order.symbol into 2 parts
  const [baseSymbol, quoteSymbol] = order.symbol.split("/");

  return (
    <View>
      <View
        style={{
          flexDirection: "column",
          marginTop: 5,
          margin: 5,
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {baseSymbol} {quoteSymbol}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              backgroundColor: order.side == "buy" ? "#255111" : "#7f0000",
              borderRadius: 2,
              padding: 3,
              margin: 3,
              marginLeft: 0,
            }}
          >
            <Text
              style={{
                color: order.side == "buy" ? "#51d715" : "#ff1919",
                textTransform: "capitalize",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {order.side == "buy" ? "Buy Long" : "Sell Short"}
            </Text>
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <Pressable
              style={styles.editButton}
              onPress={() => handleCloseOrderById(order.id)}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </Pressable>
          </View>
        </View>

        {/* Big View We're working on */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ color: "#bcbcbc", marginLeft: 0, margin: 3 }}>
              Amount({baseSymbol})
            </Text>
            <Text style={{ color: "#bcbcbc", marginLeft: 0, margin: 3 }}>
              Order Price
            </Text>
          </View>

          <View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text
                style={{
                  color: "white",
                  marginLeft: 0,
                  margin: 3,
                }}
              >
                {order.filled_qty}
              </Text>
              <Text
                style={{
                  color: "#bcbcbc",
                  marginLeft: 0,
                  margin: 3,
                }}
              >
                / {order.qty}
              </Text>
            </View>

            <Text
              style={{
                color: "#bcbcbc",
                marginLeft: 0,
                margin: 3,
                textAlign: "right",
              }}
            >
              {parseFloat(order.limit_price).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const PositionTab = ({ position, handleClosePositionById }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#101a21",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "green",
              width: 11,
              height: 11,
              margin: 3,
              borderRadius: 3,
            }}
          >
            <Text
              style={{
                fontSize: 8,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              B
            </Text>
          </View>
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {position.symbol}
          </Text>
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 10,
                paddingRight: 15,
                padding: 3,
              }}
            >
              Perpetual
            </Text>
          </View>
        </View>

        <Pressable style={styles.manageButtonText}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              margin: 2,
            }}
          >
            Edit
          </Text>
        </Pressable>

        <Pressable
          style={styles.manageButtonText}
          onPress={() => handleClosePositionById(position.asset_id)}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              margin: 2,
            }}
          >
            Close
          </Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 5, margin: 5 }}>
          <Text
            style={{
              color: "#bcbcbc",
            }}
          >
            Size (Unit)
          </Text>
          <Text style={{ color: "white" }}>
            {Math.round(parseFloat(position.qty))}
          </Text>
        </View>

        <View style={{ padding: 5, margin: 5, flex: 3 }}>
          <Text style={{ color: "#bcbcbc" }}>Avg. Entry</Text>
          <Text style={{ color: "white" }}>
            {parseInt(position.cost_basis / position.qty).toLocaleString()} USD
          </Text>
        </View>

        <View style={{ padding: 5, margin: 5, flex: 3 }}>
          <Text style={{ color: "#bcbcbc" }}>Fair Price</Text>
          <Text style={{ color: "white" }}>
            {parseInt(position.current_price).toLocaleString()} USD
          </Text>
        </View>

        <View style={{ padding: 5, margin: 5, flex: 4 }}>
          <Text
            style={{
              fontWeight: "600",
              color: parseInt(position.unrealized_pl) > 0 ? "green" : "#de1a24",
            }}
          >
            Unrealized P&L
          </Text>

          <Text
            style={{
              color: parseInt(position.unrealized_pl) > 0 ? "green" : "#de1a24",
              fontWeight: "600",
            }}
          >
            {parseInt(position.unrealized_pl).toLocaleString()} USD
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 5, margin: 5 }}>
          <Text
            style={{
              textAlign: "center",
              color: "#bcbcbc",
            }}
          >
            Size (Unit)
          </Text>
          <Text style={{ color: "white" }}>
            {Math.round(parseFloat(position.qty))}
          </Text>
        </View>

        <View style={{ padding: 5, margin: 5, flex: 2 }}>
          <Text style={{ color: "#bcbcbc" }}>Market Value</Text>
          <Text style={{ color: "white" }}>
            {parseInt(position.market_value).toLocaleString()} USD
          </Text>
        </View>
      </View>
    </View>
  );
};

const OpenTradeScreen = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [positions, setPositions] = useState([]);

  const [confirmButton, setConfirmButton] = useState(false);
  const [tradeType, setTradeType] = useState("green");
  const [orderVisible, setOrderVisible] = useState(false);

  const [isFocus, setIsFocus] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);

  const [value, setValue] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [timeInForce, setTimeInForce] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [limitPrice, setLimitPrice] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    alpacaAPI
      .getAllOrders()
      .then((response) => setCurrentOrders(response))
      .catch((error) => {
        console.error("Error fetching orders data: ", error);
      });

    alpacaAPI
      .currentPosition()
      .then((response) => {
        setPositions(response);
      })
      .catch((error) => {
        console.error("Error fetching positions: ", error);
      });
  }, []);

  const fetchPositions = async () => {
    try {
      const positionsResponse = await alpacaAPI.currentPosition();
      setPositions(positionsResponse);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const ordersResponse = await alpacaAPI.getAllOrders();
      setCurrentOrders(ordersResponse);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCloseAllPositions = () => {
    Alert.alert(
      "Closing all trades",
      "Are you sure you want to close all positions?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Close all",
          onPress: () =>
            alpacaAPI
              .closeAllPositions()
              .then(() => setPositions([]))
              .then(() =>
                showNotification({
                  type: "modifyTrade",
                  text1: "All positions closed",
                  text2: "Successfully closed all postions",
                })
              ),
        },
      ]
    );
  };

  const handleClosePositionById = (id) => {
    const closedPosition = positions.filter(
      (position) => position.asset_id === id
    );
    const updatedPositions = positions.filter(
      (position) => position.asset_id !== id
    );
    // console.log(closedPosition);
    const symbol = closedPosition[0].symbol;
    const coin = symbol.substring(0, symbol.length - 3);
    const currency = symbol.substring(symbol.length - 3);

    Alert.alert(
      "Closing this trade",
      "Are you sure you want to close this position?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () =>
            alpacaAPI
              .closePositionById(id)
              .then(() => setPositions(updatedPositions))
              .then(() =>
                showNotification({
                  type: "modifyTrade",
                  text1: `${coin} ${currency} Position Closed`,
                  text2: `Closed ${Math.round(
                    closedPosition[0].qty
                  )} ${coin} for ${Math.round(
                    closedPosition[0].unrealized_pl
                  )} ${currency} profit`,
                })
              )
              .catch((error) => console.log(error.message)),
        },
      ]
    );
  };

  const handleCloseOrderById = (id) => {
    const removedOrder = currentOrders.filter((order) => order.id === id);
    const updatedOrders = currentOrders.filter((order) => order.id !== id);
    const [coin, currency] = removedOrder[0].symbol.split("/");

    Alert.alert(
      "Closing this order",
      "Are you sure you want to close this order?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () =>
            alpacaAPI
              .closeOrderById(id)
              .then(() => setCurrentOrders(updatedOrders))
              .then(() =>
                showNotification({
                  type: "modifyTrade",
                  text1: `${coin} ${currency} Order Canceled`,
                  text2: `Cancelled ${
                    removedOrder[0].qty
                  } ${coin} at ${parseFloat(
                    removedOrder[0].limit_price
                  ).toLocaleString()} ${currency}`,
                })
              )
              .catch((error) => {
                console.error("Error closing order:", error);
                // Revert the state change if the API call fails
                setCurrentOrders(currentOrders);
              }),
        },
      ]
    );
  };

  const handleCreateNewOrder = async () => {
    const orderData = {
      side: "buy", // or "sell", depending on your application logic
      type: orderType,
      time_in_force: timeInForce,
      symbol: value,
      qty: quantity,
      limit_price: orderType === "limit" ? limitPrice : undefined,
    };

    const symbol = orderData.symbol;
    const coin = symbol.substring(0, symbol.length - 3);
    const currency = symbol.substring(symbol.length - 3);

    const response = await alpacaAPI.setNewOrder(orderData);
    console.log(response);
    if (response.type === "limit") {
      const updatedOrders = [...currentOrders, response];
      setCurrentOrders(updatedOrders);
    }
    // await fetchOrders();
    showNotification({
      type: "modifyTrade",
      text1: "Order Placed",
      text2:
        orderType === "limit"
          ? `${orderData.side.toUpperCase()} ${orderData.qty} ${coin} @ ${
              orderData.limit_price
            } ${currency}`
          : `Bought market ${orderData.qty} ${orderData.symbol}`,
    });
    await fetchPositions();
    handleResetInput();
  };

  const handleResetInput = () => {
    setOrderVisible(false);
    setOrderType("");
    setValue("");
    setTradeType("green");
    setQuantity("");
    setTimeInForce("");
    setLimitPrice("");
  };

  const showNotification = ({ type, text1, text2 }) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate a network request
    await fetchOrders();
    await fetchPositions();
    setRefreshing(false);

    // setTimeout(() => {
    //   // Update your state here with new data
    //   // For example, fetch new data and update state
    //   setRefreshing(false);
    // }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Positions Section */}
      <View style={styles.positions}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 4,
            color: "#ed702d",
          }}
        >
          Positions
        </Text>
        <View style={styles.positionsContainer}>
          {positions && positions.length > 0 ? (
            positions.map((p) => (
              <PositionTab
                position={p}
                key={p.asset_id}
                handleClosePositionById={handleClosePositionById}
              />
            ))
          ) : (
            <View>
              <Text style={{ color: "white" }}>
                You currently have no trade
              </Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.openButtonText}
            onPress={() => setOrderVisible(true)}
          >
            <Text style={{ fontWeight: "bold", color: "white", margin: 2 }}>
              Open new trade
            </Text>
          </Pressable>
          <Pressable
            style={styles.closeButtonText}
            onPress={() => handleCloseAllPositions()}
          >
            <Text style={{ fontWeight: "bold", color: "white", margin: 2 }}>
              Close all trade
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Open New Trade Modal */}
      <Modal
        visible={orderVisible}
        onRequestClose={() => setOrderVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          {/* Buy/Sell Pressable */}
          <View
            style={{
              flexDirection: "row",
              width: 350,
              alignSelf: "center",
              paddingBottom: 10,
            }}
          >
            {/* Buy */}
            <Pressable
              style={{
                flex: 1,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor: tradeType == "green" ? "green" : "#101a21",
              }}
              onPress={() => setTradeType("green")}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: tradeType == "green" ? "green" : "grey",
                  margin: 5,
                }}
              >
                Buy
              </Text>
            </Pressable>
            {/* Sell */}
            <Pressable
              style={{
                flex: 1,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor: tradeType == "red" ? "red" : "#101a21",
              }}
              onPress={() => setTradeType("red")}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: tradeType == "red" ? "red" : "grey",
                  margin: 5,
                }}
              >
                Sell
              </Text>
            </Pressable>
          </View>
          {/* Modal Form Section */}
          {/* Symbol: DropDown and Order Type: DropDown */}
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={{ fontWeight: "800", color: "white" }}>Symbol</Text>
              <Dropdown
                data={[
                  { label: "BTC/USD", value: "BTCUSD" },
                  { label: "ETH/USD", value: "ETHUSD" },
                  { label: "NVDA", value: "NVDA" },
                ]}
                containerStyle={{ backgroundColor: "#101a21" }}
                style={styles.dropdown}
                activeColor={"#101a21"}
                inputSearchStyle={{
                  backgroundColor: "#101a21",
                  fontSize: 11,
                }}
                itemContainerStyle={{
                  backgroundColor: "#101a21",
                }}
                itemTextStyle={{
                  color: "white",
                  fontSize: 11,
                  backgroundColor: "#101a21",
                }}
                selectedTextStyle={{
                  color: "white",
                  fontSize: 11,
                  backgroundColor: "#101a21",
                }}
                placeholderStyle={styles.dropdownText}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select item" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={{ fontWeight: "800", color: "white" }}>
                Order Type
              </Text>
              <Dropdown
                data={[
                  { label: "Market", value: "market" },
                  { label: "Limit", value: "limit" },
                ]}
                containerStyle={{ backgroundColor: "#101a21" }}
                style={styles.dropdown}
                activeColor={"#101a21"}
                inputSearchStyle={{
                  backgroundColor: "#101a21",
                  fontSize: 11,
                }}
                itemContainerStyle={{
                  backgroundColor: "#101a21",
                }}
                itemTextStyle={{
                  color: "white",
                  fontSize: 11,
                  backgroundColor: "#101a21",
                }}
                selectedTextStyle={{
                  color: "white",
                  fontSize: 11,
                  backgroundColor: "#101a21",
                }}
                placeholderStyle={styles.dropdownText}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus2 ? "Select item" : "..."}
                searchPlaceholder="Search..."
                value={orderType}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={(item) => {
                  setOrderType(item.value);
                  setIsFocus2(false);
                }}
              />
            </View>
          </View>
          {/* Limit: input */}
          {orderType == "limit" && (
            <View style={styles.inputContainer}>
              <Text style={{ fontWeight: "800", color: "white" }}>
                Limit Price
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter here"
                placeholderTextColor={"grey"}
                value={limitPrice}
                onChangeText={setLimitPrice}
              ></TextInput>
            </View>
          )}
          {/* Quantity: Input */}
          <View style={styles.inputContainer}>
            <Text style={{ fontWeight: "800", color: "white" }}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter here"
              placeholderTextColor={"grey"}
              value={quantity}
              onChangeText={setQuantity}
            ></TextInput>
          </View>
          {/* Time in Force: DropDown */}
          <View style={styles.inputContainer}>
            <Text style={{ fontWeight: "800", color: "white" }}>
              Time in Force
            </Text>
            <Dropdown
              data={[
                { label: "GTC - Good till Canceled ", value: "gtc" },
                { label: "IOC - Immediate or Cancel", value: "ioc" },
              ]}
              containerStyle={{ backgroundColor: "#101a21" }}
              style={styles.dropdown}
              activeColor={"#101a21"}
              inputSearchStyle={{ backgroundColor: "#101a21", fontSize: 11 }}
              itemContainerStyle={{
                backgroundColor: "#101a21",
              }}
              itemTextStyle={{
                color: "white",
                fontSize: 11,
                backgroundColor: "#101a21",
              }}
              selectedTextStyle={{
                color: "white",
                fontSize: 11,
                backgroundColor: "#101a21",
              }}
              placeholderStyle={styles.dropdownText}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus3 ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={timeInForce}
              onFocus={() => setIsFocus3(true)}
              onBlur={() => setIsFocus3(false)}
              onChange={(item) => {
                setTimeInForce(item.value);
                setIsFocus3(false);
              }}
            />
          </View>
          {/* Buttons */}
          {!confirmButton && (
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.confirmButton, { flex: 1 }]}
                onPress={() => setConfirmButton(true)}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Review order
                </Text>
              </Pressable>
              <Pressable
                style={[styles.cancelButton, { flex: 1 }]}
                onPress={() => handleResetInput()}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          )}
          {confirmButton && (
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.confirmButton, { flex: 1 }]}
                onPress={async () => {
                  setConfirmButton(false);
                  setOrderVisible(false);
                  await handleCreateNewOrder();
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Confirm order
                </Text>
              </Pressable>
              <Pressable
                style={[styles.cancelButton, { flex: 1 }]}
                onPress={() => setConfirmButton(false)}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>Edit</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>

      {/* Current Order section */}
      <View style={{ padding: 3 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#ed702d",
          }}
        >
          Current orders
        </Text>
        <ScrollView>
          {currentOrders &&
            currentOrders.map((o) => (
              <OrderTab
                order={o}
                key={o.id}
                handleCloseOrderById={handleCloseOrderById}
              />
            ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default OpenTradeScreen;
