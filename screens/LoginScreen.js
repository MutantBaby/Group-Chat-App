import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Image, Input } from "react-native-elements";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error)
    );
  };

  return (
    <KeyboardAvoidingView
      // behavior="padding"
      // behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.container}
    >
      <StatusBar style="light" />

      <Image
        source={require("../assets/signal_logo.png")}
        style={{ height: 150, width: 150 }}
      />

      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signin}
        />
      </View>

      <Button title="Login" onPress={signin} containerStyle={styles.button} />

      <Button
        // navigate to Register screen.
        onPress={() => navigation.navigate("Register")}
        title="Register"
        type="outline"
        containerStyle={styles.button}
      />
      <View style={{ height: 20 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: { width: 300 },
  button: {
    width: 200,
    marginTop: 10,
  },
});
