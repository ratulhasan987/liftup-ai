import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function GetStartedScreen() {
  const theme = useColorScheme();
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#0D1117' : '#F9F9F9' },
      ]}
    >
      <Text
        style={[styles.title, { color: theme === 'dark' ? '#FFF' : '#000' }]}
      >
       Welcome to LiftUP AI!
      </Text>

      <Text
        style={[styles.subtitle, { color: theme === 'dark' ? '#DDD' : '#555' }]}
      >
        Let’s walk you through the basics so you can get started quickly:
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Login</Text>
        <Text style={styles.cardText}>
          Securely access your account with your credentials to explore
          personalized features.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Explore Features</Text>
        <Text style={styles.cardText}>
          Discover AI-powered tools to enhance your learning, career planning,
          or productivity.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dashboard</Text>
        <Text style={styles.cardText}>
          Track your progress, manage activities, and customize your experience.
        </Text>
      </View>

      <Text
        style={[styles.footer, { color: theme === 'dark' ? '#AAA' : '#888' }]}
      >
        Tip: You can always access this guide from the menu.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 15,
    color: '#555',
  },
  footer: {
    marginTop: 24,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
