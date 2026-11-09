import { useState } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Button from './src/components/Button';
import Card from './src/components/Card';
import CustomInput from './src/components/CustomInput';
import HeaderBar from './src/components/HeaderBar';
import { COLORS } from './src/theme/colors';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    ...Ionicons.font,
  });

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {fontsLoaded ? (
        <ComponentShowcase />
      ) : (
        <View style={styles.loading}>
          {fontError ? (
            <Text style={styles.loadingError}>
              Font gagal dimuat. Silakan muat ulang aplikasi.
            </Text>
          ) : (
            <ActivityIndicator
              color={COLORS.primary}
              accessibilityLabel="Memuat komponen"
            />
          )}
        </View>
      )}
    </SafeAreaProvider>
  );
}

function ComponentShowcase() {
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('nama.email');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('Belum ada komponen yang ditekan.');

  const emailError =
    email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Format email tidak valid.'
      : '';

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <HeaderBar title="Component Showcase" subtitle="KatalogKu / Modul 3" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
      >
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Pengujian UI components</Text>
          <Text style={styles.description}>
            Coba tombol, isi input, dan tekan kartu untuk memeriksa komponen
            reusable KatalogKu.
          </Text>
        </View>
        <View style={styles.feedback}>
          <Text style={styles.feedbackLabel}>INTERAKSI TERAKHIR</Text>
          <Text style={styles.description} accessibilityLiveRegion="polite">
            {feedback}
          </Text>
        </View>
        <Section title="Button">
          <Button
            title="Primary Button"
            onPress={() => setFeedback('Primary Button ditekan.')}
          />

          <Button
            title="Outline Button"
            variant="outline"
            onPress={() => setFeedback('Outline Button ditekan.')}
          />

          <Button
            title="Danger Button"
            variant="danger"
            onPress={() => setFeedback('Danger Button ditekan.')}
          />

          <Button
            title="Disabled Button"
            disabled
            onPress={() => setFeedback('Disabled Button ditekan.')}
          />
        </Section>

        <Section title="Custom Input">
          <CustomInput
            label="Cari produk"
            icon="search"
            placeholder="Cari produk..."
            value={search}
            onChangeText={setSearch}
          />

          <CustomInput
            label="Email"
            placeholder="nama@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />

          <CustomInput
            label="Password"
            placeholder="Masukkan password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />
        </Section>

        <Section title="Product Card">
          <View style={styles.cardRow}>
            <Card
              title="Wireless Headphones"
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=480&q=80"
              price={799000}
              rating={4.7}
              discount={10}
              onPress={() => setFeedback('Kartu Wireless Headphones ditekan.')}
            />

            <Card
              title="Smart Watch"
              image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=480&q=80"
              price={1299000}
              rating={4.8}
              onPress={() => setFeedback('Kartu Smart Watch ditekan.')}
            />
          </View>
        </Section>

        <Section title="Header Bar dengan Back Button">
          <View style={styles.headerPreview}>
            <HeaderBar
              title="Preview Header"
              subtitle="Contoh header dengan aksi kembali"
              includeTopInset={false}
              onBack={() => setFeedback('Back arrow ditekan.')}
            />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

/** @param {{ title: string, children: import('react').ReactNode }} props */
function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  loadingError: {
    color: COLORS.error,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 24,
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },

  sectionContent: {
    gap: 12,
  },

  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },

  headerPreview: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  intro: {
    gap: 8,
  },
  introTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.text,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.muted,
  },
  feedback: {
    padding: 16,
    gap: 8,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceSubtle,
  },
  feedbackLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: COLORS.text,
  },
});
