import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import alpacaAPI from "../../services/alpaca";
import uuid from "react-native-uuid";
import { getFirstN, getFirstNCharsOrLess } from "../../utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101a21",
    flex: 1,
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
});

const BuddyAIScreen = () => {
  const [response, setResponse] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  // const [news, setNews] = useState([]);
  // const [headlines, setHeadlines] = useState("");

  const [openaiMessages, setOpenaiMessages] = useState([]);
  const [openaiResponse, setOpenaiResponse] = useState({
    messages: [],
    index: uuid.v4(),
  });

  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await alpacaAPI.getNews();
      // setNews(response.news);

      let headlines = "";
      if (response.news && response.news.length > 0) {
        headlines = response.news
          .map((n) => `${n.headline} (ticker: ${n.symbols[0]}), `)
          .join("");
      }
      return headlines;
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleTA = async () => {
    const response = await fetchNews();
    console.log(response);
  };

  const handleGenerateGPT = async () => {
    setCurrentUserMessage(userMessage);
    setUserMessage("");
    setLoading(true);
    setResponse("");
    try {
      let messagesRequest = getFirstN({ messages: openaiMessages });

      if (openaiResponse.messages.length) {
        messagesRequest = [
          ...messagesRequest,
          {
            role: "system",
            content:
              "Only respond with number from 1-100 detailing the impact of the headline.",
          },
          {
            role: "assistant",
            content: getFirstNCharsOrLess(
              openaiResponse.messages[openaiResponse.messages.length - 1]
                .assistant
            ),
          },
        ];
      }

      messagesRequest = [
        ...messagesRequest,
        { role: "user", content: userMessage },
      ];

      setOpenaiMessages(messagesRequest);

      // set local openai state to dislay user's most recent question
      let openaiArray = [
        ...openaiResponse.messages,
        {
          user: userMessage,
          assistant: "",
        },
      ];
      setOpenaiResponse((c) => ({
        index: c.index,
        messages: JSON.parse(JSON.stringify(openaiArray)),
      }));
      console.log(messagesRequest);

      const result = await alpacaAPI.generateGPT(messagesRequest);

      if (result.choices && result.choices.length > 0) {
        const message = result.choices[0].message.content;

        setResponse(message);

        openaiArray[openaiArray.length - 1].assistant = message;

        setOpenaiResponse((c) => ({
          index: c.index,
          messages: JSON.parse(JSON.stringify(openaiArray)),
        }));
        setLoading(false);
      } else {
        console.error("No message found in API response");
      }
    } catch (error) {
      console.error("error in generateOpenaiResponse: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={{ fontWeight: "800", color: "white" }}>Message</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter here"
          placeholderTextColor={"grey"}
          value={userMessage}
          onChangeText={setUserMessage}
        />
        <Button
          title="Generate GPT"
          onPress={handleGenerateGPT}
          color="white"
        />
        <Button
          title="Analyze market condition"
          onPress={handleTA}
          color="white"
        />
        <Text style={{ color: "white", fontWeight: "bold", paddingBottom: 10 }}>
          {currentUserMessage}
        </Text>
        {loading && <ActivityIndicator style={styles.loadingContainer} />}
        {response && (
          <View>
            <Text style={{ color: "white", fontWeight: "500" }}>
              {response}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BuddyAIScreen;
