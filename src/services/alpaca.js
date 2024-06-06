import axios from "axios";
import Constants from "expo-constants";

const {
  alpacaKey,
  alpacaSecret,
  baseUrl,
  coinGeckoKey,
  coinGeckoUrl,
  openAiKey,
} = Constants.expoConfig.extra;

const getAccount = async () => {
  const options = {
    method: "GET",
    url: `${baseUrl}/account`,
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": alpacaKey,
      "APCA-API-SECRET-KEY": alpacaSecret,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

const currentPosition = async () => {
  const options = {
    method: "GET",
    url: `${baseUrl}/positions`,
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": alpacaKey,
      "APCA-API-SECRET-KEY": alpacaSecret,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

const closeAllPositions = async () => {
  const options = {
    method: "DELETE",
    url: `${baseUrl}/positions`,
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": alpacaKey,
      "APCA-API-SECRET-KEY": alpacaSecret,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

const getAllOrders = async () => {
  const options = {
    method: "GET",
    url: `${baseUrl}/orders`,
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": alpacaKey,
      "APCA-API-SECRET-KEY": alpacaSecret,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

const setNewOrder = async ({
  side,
  type,
  time_in_force,
  symbol,
  qty,
  limit_price,
}) => {
  const options = {
    method: "POST",
    url: `${baseUrl}/orders`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "APCA-API-KEY-ID": alpacaKey,
      "APCA-API-SECRET-KEY": alpacaSecret,
    },
    data: {
      side,
      type,
      time_in_force,
      symbol,
      qty,
      limit_price,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

const getNews = async () => {
  const options = {
    method: "GET",
    url: "https://data.alpaca.markets/v1beta1/news",
    params: { symbols: "BTCUSD" },
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": alpacaKey,
      "APCA-API-SECRET-KEY": alpacaSecret,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

const getCoinData = async () => {
  const options = {
    method: "GET",
    url: `${coinGeckoUrl}/markets`,
    params: { vs_currency: "usd", per_page: "10", page: "1" },
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": coinGeckoKey,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

const closePositionById = async (id) => {
  const options = {
    method: "DELETE",
    url: `${baseUrl}/positions/${id}`,
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": alpacaKey,
      "APCA-API-SECRET-KEY": alpacaSecret,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

const closeOrderById = async (id) => {
  const options = {
    method: "DELETE",
    url: `${baseUrl}/orders/${id}`,
    headers: {
      "APCA-API-KEY-ID": alpacaKey,
      "APCA-API-SECRET-KEY": alpacaSecret,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error.message;
  }
};

const generateGPT = async (messages) => {
  const options = {
    method: "POST",
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    data: {
      model: "gpt-4o",
      messages: messages,
      temperature: 0.7,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error;
  }
};

const alpacaAPI = {
  getAccount,
  currentPosition,
  getNews,
  getAllOrders,
  setNewOrder,
  closeAllPositions,
  getCoinData,
  closePositionById,
  closeOrderById,
  generateGPT,
};

export default alpacaAPI;
