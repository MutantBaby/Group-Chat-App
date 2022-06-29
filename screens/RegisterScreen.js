import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const register = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: name,
        photoURL:
          imgUrl ||
          "https://www.google.com/search?q=jpg+pics&newwindow=1&rlz=1C1UEAD_enPK995PK995&tbm=isch&source=iu&ictx=1&vet=1&fir=yWGDgj0UA0p1vM%252ClgaeYYHjwcRJQM%252C_%253BShQnriFk8AK93M%252CMxJRAkFr5rrEwM%252C_%253BkizdMvXviNQzJM%252C3SScI2vJtdCeHM%252C_%253BIeYueLCjgWE_XM%252C0OJPsWXk41YY4M%252C_%253BEUdImf9K07p0LM%252Cfqegj2N8n_8jqM%252C_%253BZ7v8NJDak3uZLM%252CSSWCzYbFNTJ5HM%252C_%253B1YpkhxUNCOqt6M%252CObYAn2No5gK9QM%252C_%253ByIgGvQEa-cY36M%252CZhiBOEkiGbW2tM%252C_%253B3ASDbF2TbGdvnM%252Cxi8p_gUTxRIu0M%252C_%253BYYbghbOTJLYXJM%252CbLsp548lIojp8M%252C_%253BlDILizkoMTqWqM%252Cxi8p_gUTxRIu0M%252C_%253BhTEa-1tbJvTjZM%252CG5Orto5UWH1nDM%252C_&usg=AI4_-kRwoSz4rZxBxqXzwsiZ-3lkvVi6Vw&sa=X&ved=2ahUKEwidtsOC2MX3AhVa57sIHfi6CM8Q9QF6BAgmEAE#imgrc=Z7v8NJDak3uZLM",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back", // not working
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.container}
    >
      <StatusBar style="light" />

      <Text
        h3
        style={{
          marginBottom: 50,
        }}
      >
        Create A Signal Account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture Url (Optional)"
          type="text"
          value={imgUrl}
          onChangeText={(text) => setImgUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title="Register"
      />
      <View style={{ height: 10 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
