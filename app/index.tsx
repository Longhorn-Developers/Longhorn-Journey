// import CreateAccount from "./CreateAccount";

// export default function Index() {
//   return <CreateAccount />;
// }

import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Longhorn Journey</Text>
      <Button title="Enter App" onPress={() => router.push("/home")} />{" "}
      {/* router.replace("/(tabs)/home"); once they're done with onboarding so they dont go back*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
});
