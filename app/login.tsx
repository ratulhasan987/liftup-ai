import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme(); // 'dark' or 'light'

  const isDark = colorScheme === 'dark';

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    router.push('/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' },
        ]}
      >
        <Text style={[styles.title, { color: isDark ? '#F8FAFC' : '#0F172A' }]}>
          Welcome Back
        </Text>
        <Text
          style={[styles.subtitle, { color: isDark ? '#CBD5E1' : '#475569' }]}
        >
          Login to your account
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
              color: isDark ? '#F8FAFC' : '#0F172A',
            },
          ]}
          placeholder="Email"
          placeholderTextColor={isDark ? '#94A3B8' : '#64748B'}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
              color: isDark ? '#F8FAFC' : '#0F172A',
            },
          ]}
          placeholder="Password"
          placeholderTextColor={isDark ? '#94A3B8' : '#64748B'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={{ color: isDark ? '#38BDF8' : '#0EA5E9' }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: isDark ? '#38BDF8' : '#0EA5E9' },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  loginButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
