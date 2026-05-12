import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialNotes = [
  {
    id: "1",
    title: "First class of Mobile Dev Cohort ",
    content:
      "Discuss about React two parts - React Native and React JS. More on React also elaborate on the react-DOM and react-native. Its is like landing on mobile dev with Suraj sir as a mentor.",
    date: "02-05-2026",
  },
  {
    id: "2",
    title: "React Refressher Session",
    content:
      "We had a React refresher session where we covered the basics of React, including components, state, and props. We also discussed the differences between React and React Native, and also discussed on Synthetic Events.",
    date: "03-05-2026",
  },
  {
    id: "3",
    title: "React Native and Expo",
    content:
      "We had a session on React Native and Expo, where we learned about the different types of mobile applications, including native, PWA, and cross-platform. We also discussed the benefits of using React Native and Expo for mobile development. We also had a hands-on session where we created a simple React Native app using Expo.",
    date: "09-05-2026",
  },
  {
    id: "4",
    title: "React Native core-components",
    content:
      "We had a session on React Native core components like SafeAreaView, ScrollView, and FlatList. We also had a hands-on session where we created a simple React Native app using Expo and the core components. We also discussed about Stylesheet methods like create, compose, and flatten. And also this app is a assignment of that session.",
    date: "10-05-2026",
  },
];

const themes = {
  light: {
    background: "#fff",
    card: "#f5f5f5",
    text: "#1a1a1a",
    subtext: "#666666",
    accent: "#6c63ff",
  },
  dark: {
    background: "#121212",
    card: "#1e1e1e",
    text: "#ffffff",
    subtext: "#AAAAAA",
    accent: "#9d97ff",
  },
};

export default function NotesComponent() {
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const systemColorScheme = useColorScheme();
  const [manualDark, setManualDark] = useState<boolean | null>(null);

  const isDark =
    manualDark !== null ? manualDark : systemColorScheme === "dark";

  const theme = isDark ? themes.dark : themes.light;

  const filteredNotes = initialNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  if (selectedNote) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <StatusBar style={manualDark ? "light" : "dark"} />

        <View style={styles.header}>
          <Pressable onPress={() => setSelectedNote(null)}>
            <Text style={[styles.back, { color: theme.text }]}>Back</Text>
          </Pressable>

          <Switch
            value={isDark}
            onValueChange={(value) => setManualDark(value)}
            thumbColor={theme.accent}
          />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          {selectedNote.title}
        </Text>
        <Text style={[styles.date, { color: theme.text }]}>
          {selectedNote.date}
        </Text>
        <Text style={[styles.content, { color: theme.text }]}>
          {selectedNote.content}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TextInput
          placeholder="Search notes..."
          placeholderTextColor={theme.text}
          value={search}
          onChangeText={setSearch}
          style={[styles.input, { color: theme.accent }]}
        />

        <Switch
          value={isDark}
          onValueChange={(value) => setManualDark(value)}
          thumbColor={theme.accent}
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: theme.card }]}
            onPress={() => setSelectedNote(item)}
          >
            <Text style={[styles.title, { color: theme.text }]}>
              {item.title}
            </Text>

            <Text
              style={[styles.preview, { color: theme.text }]}
              numberOfLines={8}
            >
              {item.content}
            </Text>

            <Text style={[styles.date, { color: theme.text }]}>
              {item.date}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text>No notes found</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  input: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },

  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  title: { fontSize: 16, fontWeight: "bold" },

  preview: { marginTop: 6, color: "#555" },

  date: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "right",
    color: "#777",
  },

  back: {
    marginBottom: 12,
    color: "blue",
    fontSize: 16,
    padding: 8,
    backgroundColor: "#da15cc",
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  content: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "flex-end",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    gap: 12,
  },
});
