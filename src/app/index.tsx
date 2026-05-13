import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
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

  const [notes, setNotes] = useState(initialNotes);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const systemColorScheme = useColorScheme();
  const [manualDark, setManualDark] = useState<boolean | null>(null);

  const isDark =
    manualDark !== null ? manualDark : systemColorScheme === "dark";

  const theme = isDark ? themes.dark : themes.light;

  const { height, width } = useWindowDimensions();
  // console.log({ height, width });

  const isTablet = width >= 768;
  const isLandscape = width > height;

  const lockLanscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    );
  };

  const lockPortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    );
  };

  const filteredNotes = notes.filter(
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.searchContainer,
              { backgroundColor: theme.card, borderColor: theme.subtext },
            ]}
          >
            <Text style={{ marginRight: 8, fontSize: 16 }}>🔍</Text>

            <TextInput
              placeholder="Search notes..."
              placeholderTextColor={theme.subtext}
              value={search}
              onChangeText={setSearch}
              style={[styles.searchInput, { color: theme.text }]}
            />
          </View>

          <Switch
            value={isDark}
            onValueChange={(value) => setManualDark(value)}
            thumbColor={theme.accent}
          />
        </View>

        {!isCreating && (
          <Pressable
            style={[styles.addNoteBtn, { backgroundColor: theme.accent }]}
            onPress={() => setIsCreating(true)}
          >
            <Text style={styles.addNoteBtnText}>＋ Add Note</Text>
          </Pressable>
        )}

        {isCreating && (
          <View style={[styles.createBox, { backgroundColor: theme.card }]}>
            <TextInput
              placeholder="Title"
              placeholderTextColor={theme.subtext}
              value={newTitle}
              onChangeText={setNewTitle}
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.subtext },
              ]}
            />
 
            <TextInput
              placeholder="Content"
              placeholderTextColor={theme.subtext}
              value={newContent}
              onChangeText={setNewContent}
              multiline
              style={[
                styles.input,
                {
                  color: theme.text,
                  borderColor: theme.subtext,
                  height: 100,
                  textAlignVertical: "top",
                },
              ]}
            />
 
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={[styles.actionBtn, { backgroundColor: "#6C63FF" }]}
                onPress={() => {
                  if (!newTitle.trim()) return;
 
                  const newNote = {
                    id: Date.now().toString(),
                    title: newTitle,
                    content: newContent,
                    date: new Date().toLocaleDateString(),
                  };
 
                  setNotes([newNote, ...notes]);
                  setNewTitle("");
                  setNewContent("");
                  setIsCreating(false);
                }}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>Save</Text>
              </Pressable>
 
              <Pressable
                style={[styles.actionBtn, { backgroundColor: "#999" }]}
                onPress={() => {
                  setIsCreating(false);
                  setNewTitle("");
                  setNewContent("");
                }}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          numColumns={isLandscape ? 2 : 1}
          key={isLandscape ? "landscape" : "portrait"} // 🔥 IMPORTANT (forces re-layout)
          columnWrapperStyle={
            isLandscape
              ? { justifyContent: "space-between", gap: 10 }
              : undefined
          }
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.card,
                { backgroundColor: theme.card },
                isLandscape && styles.cardLandscape,
              ]}
              onPress={() => setSelectedNote(item)}
            >
              <Text
                style={[
                  styles.title,
                  { color: theme.text },
                  isLandscape && styles.titleLandscape,
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[styles.preview, { color: theme.subtext }, ,]}
                numberOfLines={isLandscape ? 4 : 8}
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
        <View style={{ flexDirection: "row", marginTop: 24, gap: 12 }}>
          <Pressable
            onPress={lockLanscape}
            style={{
              flex: 1,
              backgroundColor: "#6C63FF",
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Force Landscape 📲</Text>
          </Pressable>
          <Pressable
            onPress={lockPortrait}
            style={{
              flex: 1,
              backgroundColor: "#ff6584",
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Force Portrait 📱</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    borderWidth: 1,
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

  cardLandscape: {
    flex: 1,
    maxWidth: "48%",
  },

  titleLandscape: {
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25, // 🔥 pill shape
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  addNoteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 14,
  },

  addNoteBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  createBox: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  actionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
