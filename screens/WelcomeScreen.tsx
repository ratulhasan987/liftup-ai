import AccessibilityModal from '@/components/AccessibilityModal';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

const translations = {
  English: {
    welcome: 'Welcome to',
    brand: 'LiftUP Ai',
    subtitle: 'Your Smart Learning Companion!',
    flag: '🇬🇧',
  },
  বাংলা: {
    welcome: 'স্বাগতম',
    brand: 'LiftUP Ai',
    subtitle: 'আপনার স্মার্ট শিক্ষার সঙ্গী!',
    flag: '🇧🇩',
  },
  Deutsch: {
    welcome: 'Willkommen bei',
    brand: 'LiftUP Ai',
    subtitle: 'Ihr smarter Lernbegleiter!',
    flag: '🇩🇪',
  },
  Español: {
    welcome: 'Bienvenido a',
    brand: 'LiftUP Ai',
    subtitle: '¡Tu compañero inteligente de aprendizaje!',
    flag: '🇪🇸',
  },
  Français: {
    welcome: 'Bienvenue à',
    brand: 'LiftUP Ai',
    subtitle: 'Votre compagnon d’apprentissage intelligent !',
    flag: '🇫🇷',
  },
};

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const [accessibilityVisible, setAccessibilityVisible] = useState(false);

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    darkMode: false,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left' as 'left' | 'center' | 'right',
  });

  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const toggleModal = () => setAccessibilityVisible(!accessibilityVisible);

  const updateSettings = (
    newSettings: Partial<typeof accessibilitySettings>
  ) => {
    setAccessibilitySettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetAccessibility = () => {
    setAccessibilitySettings({
      darkMode: false,
      lineHeight: 24,
      letterSpacing: 0,
      textAlign: 'left',
    });
  };

  const isDark = accessibilitySettings.darkMode;

  const handleLanguageSelect = (lang: keyof typeof translations) => {
    setSelectedLanguage(lang);
    setShowLanguageOptions(false);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#1E1E1E' : '#FDEBFA',
        },
      ]}
    >
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[
            styles.accessibilityBtn,
            { backgroundColor: isDark ? '#333' : '#fff' },
          ]}
          onPress={toggleModal}
        >
          <Text
            style={[
              styles.accessibilityText,
              { color: isDark ? '#fff' : '#000' },
            ]}
          >
            🧠Accessibility
          </Text>
        </TouchableOpacity>

        {/* Language Selector */}
        <View>
          <TouchableOpacity
            onPress={() => setShowLanguageOptions(!showLanguageOptions)}
          >
            <Text
              style={[styles.language, { color: isDark ? '#fff' : '#000' }]}
            >
              {translations[selectedLanguage].flag} {selectedLanguage} ▾
            </Text>
          </TouchableOpacity>

          {showLanguageOptions && (
            <View
              style={[
                styles.dropdown,
                {
                  backgroundColor: isDark ? '#333' : '#fff',
                  borderColor: isDark ? '#555' : '#ccc',
                },
              ]}
            >
              {Object.entries(translations).map(([lang]) => (
                <TouchableOpacity
                  key={lang}
                  onPress={() =>
                    handleLanguageSelect(lang as keyof typeof translations)
                  }
                  style={styles.dropdownOption}
                >
                  <Text
                    style={{
                      color: isDark ? '#fff' : '#000',
                      fontWeight: selectedLanguage === lang ? 'bold' : 'normal',
                    }}
                  >
                    {translations[lang as keyof typeof translations].flag}{' '}
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Content Positioned Bottom Left */}
      <View style={styles.bottomSection}>
        {/* Logo */}
        <Image
          source={require('@/assets/logo/logo-1.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />

        {/* Texts */}
        <Text
          style={[
            styles.title,
            {
              color: isDark ? '#fff' : '#000',
              textAlign: accessibilitySettings.textAlign,
              letterSpacing: accessibilitySettings.letterSpacing,
              lineHeight: accessibilitySettings.lineHeight,
            },
          ]}
        >
          {translations[selectedLanguage].welcome}
        </Text>

        <Text
          style={[
            styles.brand,
            {
              color: '#A41CE2',
              textAlign: accessibilitySettings.textAlign,
              letterSpacing: accessibilitySettings.letterSpacing,
              lineHeight: accessibilitySettings.lineHeight,
            },
          ]}
        >
          {translations[selectedLanguage].brand}
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: isDark ? '#aaa' : '#555',
              textAlign: accessibilitySettings.textAlign,
              letterSpacing: accessibilitySettings.letterSpacing,
              lineHeight: accessibilitySettings.lineHeight,
            },
          ]}
        >
          {translations[selectedLanguage].subtitle}
        </Text>

        {/* Buttons */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.getStartedBtn}
            onPress={() => router.push('/start')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFD700', '#A41CE2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBtn}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={20}
                  color="#fff"
                  style={{ marginLeft: 8 }}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Accessibility Modal */}
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
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accessibilityBtn: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  accessibilityText: {
    fontWeight: '600',
    fontSize: 14,
  },
  language: {
    fontWeight: '600',
    fontSize: 14,
  },
  dropdown: {
    position: 'absolute',
    top: 24,
    right: 0,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    zIndex: 10,
    minWidth: 120,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  dropdownOption: {
    paddingVertical: 6,
  },
  bottomSection: {
    paddingBottom: 40,
    alignItems: 'flex-start',
  },
  logoImage: {
    marginBottom: 10,
    left: 0,
    width: 60,
    height: 40,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  brand: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 30,
  },
  buttonWrapper: {
    width: '100%',
  },
  getStartedBtn: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gradientBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
  },
  getStartedText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#A41CE2',
  },
  loginText: {
    color: '#A41CE2',
    fontWeight: 'bold',
    fontSize: 16,
  },
});