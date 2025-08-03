import AccessibilityModal from '@/components/AccessibilityModal';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

export default function WelcomeScreen() {
  const [accessibilityVisible, setAccessibilityVisible] = useState(false);

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    darkMode: false,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center' as 'left' | 'center' | 'right',
  });

  const toggleModal = () => {
    setAccessibilityVisible(!accessibilityVisible);
  };

  const updateSettings = (
    newSettings: Partial<typeof accessibilitySettings>
  ) => {
    setAccessibilitySettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetAccessibility = () => {
    setAccessibilitySettings({
      darkMode: false,
      lineHeight: 22,
      letterSpacing: 0,
      textAlign: 'center',
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: accessibilitySettings.darkMode
            ? '#1e1e1e'
            : '#f8e6f9',
        },
      ]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.accessibilityBtn} onPress={toggleModal}>
          <Text style={styles.accessibilityText}>🧠 Accessibility</Text>
        </TouchableOpacity>
        <Text style={styles.language}>🌐 English</Text>
      </View>

      <Text
        style={[
          styles.logo,
          {
            color: accessibilitySettings.darkMode ? '#fff' : '#A41CE2',
            textAlign: accessibilitySettings.textAlign,
            letterSpacing: accessibilitySettings.letterSpacing,
            lineHeight: accessibilitySettings.lineHeight,
          },
        ]}
      >
        LiftUP Ai
      </Text>

      <Text
        style={[
          styles.title,
          {
            color: accessibilitySettings.darkMode ? '#fff' : '#000',
            textAlign: accessibilitySettings.textAlign,
            letterSpacing: accessibilitySettings.letterSpacing,
            lineHeight: accessibilitySettings.lineHeight,
          },
        ]}
      >
        Welcome to LiftUP Ai
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: accessibilitySettings.darkMode ? '#aaa' : '#555',
            textAlign: accessibilitySettings.textAlign,
            letterSpacing: accessibilitySettings.letterSpacing,
            lineHeight: accessibilitySettings.lineHeight,
          },
        ]}
      >
        Your Smart Learning Companion!
      </Text>

      <TouchableOpacity style={styles.getStarted}>
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <AccessibilityModal
        visible={accessibilityVisible}
        onClose={toggleModal}
        settings={accessibilitySettings}
        onChange={updateSettings}
        onReset={resetAccessibility}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accessibilityBtn: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  accessibilityText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  language: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 20,
  },
  getStarted: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
  },
  getStartedText: {
    fontWeight: 'bold',
  },
  loginBtn: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 30,
    backgroundColor: '#A41CE2',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
