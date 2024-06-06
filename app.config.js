import "dotenv/config";

export default {
  name: "phone-app",
  slug: "phone-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    env: process.env.ENV,
    alpacaKey: process.env.APCA_API_KEY_ID,
    alpacaSecret: process.env.APCA_API_SECRET_KEY,
    baseUrl: process.env.APCA_API_BASE_URL,
    coinGeckoKey: process.env.COINGECKO_API_KEY,
    coinGeckoUrl: process.env.COINGECKO_BASE_URL,
    openAiKey: process.env.OPENAI_KEY,
  },
};
