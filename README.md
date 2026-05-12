# 📝 Notes App (React Native + Expo)

A responsive Notes application built using **React Native** and **Expo**, featuring:

- 📋 Notes listing with preview
- 🔍 Search functionality
- 🌗 Light/Dark mode toggle
- 📱 Adaptive layout (portrait & landscape)
- 🔄 Orientation control (manual)
- 📄 Detail view for each note

---

## 🚀 Features

### 📋 Notes List

- Displays all notes using `FlatList`
- Each card includes:
  - Title
  - Content preview
  - Date

### 🔍 Search

- Real-time filtering of notes
- Matches both title and content

### 🌗 Theme Support

- Light and Dark mode
- System theme detection (`useColorScheme`)
- Manual override using toggle switch

### 📱 Responsive Layout

- Portrait → Single column
- Landscape → Two-column grid
- Uses `useWindowDimensions`

### 🔄 Orientation Control

- Force Landscape
- Force Portrait
- Implemented using `expo-screen-orientation`

### 📄 Note Detail View

- Tap a note to open full content
- Back button to return to list

---

## 🧠 Core Concepts Used

- React Hooks (`useState`)
- Conditional Rendering
- FlatList Optimization
- Responsive Design
- Theme Management
- Keyboard Handling (`KeyboardAvoidingView`)

---

## 📦 Dependencies

```bash
expo install expo-screen-orientation
expo install react-native-safe-area-context
```
