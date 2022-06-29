import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Avatar } from "react-native-elements";
import {
  AntDesign,
  Ionicons,
  Foundation,
  FontAwesome,
} from "@expo/vector-icons";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackVisible: false,
      headerTitleAlign: "left ",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            marginLeft: 25,
            alignItems: "center",
          }}
        >
          <Avatar rounded source={{ uri: messages[0]?.data.photoURL }} />
          <Text
            style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
          ></Text>
          <Text style={{ color: "white" }}>{route.params?.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <Foundation name="telephone" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="videocam" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = async () => {
    if (input === "") {
      Keyboard.dismiss();
      return null;
    }

    Keyboard.dismiss();

    const collRef = await addDoc(
      collection(db, "chats", route.params?.id, "messages"),
      {
        message: input,
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        photoURL: auth.currentUser?.photoURL,
        timestamp: serverTimestamp(),
      }
    ).catch((error) => alert(error));

    console.log("collREFFFF: ", collRef);

    setInput("");
  };

  useLayoutEffect(() => {
    const que = query(
      collection(db, "chats", route.params?.id, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(que, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    console.log("router: ", route);
    console.log("unsubscribe: ", unsubscribe);
    console.log("messages: ", messages);

    return unsubscribe;
  }, [route]);

  console.log("1router: ", route);
  console.log("3messages: ", messages);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#2B68E6" barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : ""}
        KeyboardVerticalOffset={90}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
        <>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 15,
            }}
          >
            {messages.map(({ id, data }) =>
              data?.email === auth.currentUser?.email ? (
                <View key={id} style={styles.reciever}>
                  <Avatar
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      right: -5,
                    }}
                    position="absolute"
                    bottom={-15}
                    right={-5}
                    rounded
                    source={{ uri: data?.photoURL }}
                  />
                  <Text style={styles.recieverText}>{data?.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Avatar
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      left: -5,
                    }}
                    position="absolute"
                    bottom={-15}
                    left={-5}
                    rounded
                    source={{ uri: data?.photoURL }}
                  />
                  <Text style={styles.senderText}>{data?.message}</Text>
                  <Text style={styles.senderName}>{data?.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="Signal Messages"
              style={styles.textInput}
              value={input}
              onChangeText={(text) => setInput(text)}
            />
            <TouchableOpacity
              disabled={!input}
              onPress={sendMessage}
              activeOpacity={0.5}
            >
              <FontAwesome name="send-o" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  textInput: {
    bottom: 0,
    height: 50,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderRadius: 30,
    fontSize: 18,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    position: "relative",
  },
  recieverText: {},
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
});
