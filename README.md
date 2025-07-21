# 🛸 UFO Sightings Dashboard

A sleek, interactive UFO sightings dashboard built with [Expo](https://expo.dev) and React Native.

> 📱 This mini project showcases my ability to build well-structured, readable code with a smooth and intuitive UX as well as strong familiarity with Expo, charts, and React Native best practices, all backed by solid TypeScript architecture.

---

## 🚀 Features

- 📊 **Weekly Bar Chart of UFO Sightings**  
  Visualize daily UFO sightings grouped by **calendar weeks (Monday–Sunday)**.

- ⏮️⏭️ **Week Navigation**  
  Seamlessly browse **previous and next weeks** with animated transitions.

- 📆 **Handles Missing Dates Gracefully**  
  Even when data is missing for some days, bars with value 0 are rendered for a complete week view.

- 🌐 **Live API Integration**  
  Data is dynamically fetched from the API:
  [https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings](https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings)

- 🧭 **Animated Transitions**  
  Chart slides in horizontally as you switch weeks.

- 🧠 **Global State Management**  
  Powered by [Redux Toolkit](https://redux-toolkit.js.org) for predictable and scalable state handling.

- 🔄 **Reusable Hooks & Services**  
  Modular and easy-to-maintain architecture.

- 📱 **Fully Mobile Optimized**  
  Smooth, responsive layout across different screen sizes.
  
- 📱 **Theme Support**  
  Switch between light mode and dark mode

- 📱 **Offline Support**  
  Data is still available even when the device does not have access to internet, provided it was cached at least once

- 💥 **Bonus Features**  
  - Loading indicators ✅  
  - Error and empty states ✅
  - Type-safe with TypeScript ✅
  - Redux Toolkit ✅

---

## 🛠️ Tech Stack

- **React Native + Expo**
- **TypeScript**
- **Redux Toolkit**
  
- **react-native-chart-kit** (bar chart)
- **Axios** (for API calls)
- **Date-fns** (date manipulation)
- **Lottie Animation**
- **React Navigation**

---

## 📦 Setup & Run

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the app**

   ```bash
   npx expo start
   ```

3. **Open it via:**

- **Expo Go** (for physical device testing)
- **iOS Simulator / Android Emulator**
- [Or download compliled apk file and install on an android device without cloning the repo](https://drive.google.com/file/d/13IsHxkCiHMo2F0edDnirl8EsfOV9CvFo/view?usp=sharing)

  
# 📄 Notes & Decisions

- `date-fns` is used to group data by ISO calendar weeks (Monday–Sunday).
- `reduxjs/toolkit` manages current week state and sightings data.
- Missing dates are automatically filled with zeros for clean weekly charts.
- UI is designed mobile-first and handles edge cases gracefully.

# 🔥Download Android Apk File to see the app in action
[Link to APK file hosted in Google Drive](https://drive.google.com/file/d/13IsHxkCiHMo2F0edDnirl8EsfOV9CvFo/view?usp=sharing)


  
<img width="391" height="851" alt="Screenshot 2025-07-21 at 10 21 05" src="https://github.com/user-attachments/assets/b5047c76-be49-41fa-846a-4779eea7f4c2" />
<img width="360" height="823" alt="Screenshot 2025-07-21 at 10 23 17" src="https://github.com/user-attachments/assets/bd886a77-0efa-4234-be6d-e932eb318f44" />

<img width="393" height="846" alt="Screenshot 2025-07-21 at 10 21 26" src="https://github.com/user-attachments/assets/3a9b82c0-af0a-4722-84bb-ddb4c6cf337f" />
<img width="361" height="824" alt="Screenshot 2025-07-21 at 10 22 37" src="https://github.com/user-attachments/assets/98bbc800-908b-47cf-a0f2-4b26223134b2" />

 <img width="398" height="852" alt="Screenshot 2025-07-21 at 10 21 43" src="https://github.com/user-attachments/assets/1faab6a4-b09a-4fda-830c-00fb7c59bbb0" />
<img width="359" height="824" alt="Screenshot 2025-07-21 at 10 22 58" src="https://github.com/user-attachments/assets/74b6e586-f78b-4ac1-b522-7ebd5a33eb10" />

