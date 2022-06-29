import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, ListItem } from "react-native-elements";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const CustomListItems = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useLayoutEffect(() => {
    const que = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(que, (snapshot) => {
      setChatMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return unsubscribe;
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar rounded source={{ uri: chatMessages?.[0]?.photoURL }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItems;

const styles = StyleSheet.create({});
