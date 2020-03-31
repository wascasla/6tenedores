import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

const Loading = props => {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="red"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        {text && <Text style={styles.view}>{text}</Text>}
      </View>
    </Overlay>
  );
};

export default Loading;

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "auto",
    backgroundColor: "#fff",
    borderColor: "#00a680",
    borderWidth: 20,
    borderRadius: 10
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#00a680",
    textTransform: "uppercase",
    marginTop: 10
  }
});
