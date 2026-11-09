import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import useForm from '../hooks/useForm';
import {
  required,
  validateEmail,
  validatePhone,
  validatePassword,
  validatePasswordConfirmation,
} from '../utils/validators';
import { COLORS } from '../theme/colors';

const INITIAL_VALUES = {
  name: 'Sirojul Firdaus',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

/** @param {typeof INITIAL_VALUES} values */
function validateProfile(values) {
  return {
    name: required(values.name, 'Nama Lengkap'),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    password: validatePassword(values.password),
    confirmPassword: validatePasswordConfirmation(
      values.confirmPassword,
      values.password,
    ),
  };
}

/** @param {any} props */
export default function ProfilScreen({ navigation }) {
  const { values, errors, setField, submit, reset } = useForm(
    INITIAL_VALUES,
    validateProfile,
  );
  const hasEmptyField = Object.values(values).some((value) => !value.trim());

  function handleSave() {
    submit((validValues) => {
      reset({ ...validValues, password: '', confirmPassword: '' });
      Alert.alert(
        'Validasi berhasil',
        'Input valid, tetapi belum disimpan secara permanen.',
      );
    });
  }

  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right']}>
      <HeaderBar title="Profil" variant="detail" />
      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.identity}>
            <View style={styles.avatar}>
              <Ionicons
                name="person-outline"
                size={24}
                color={COLORS.primaryDark}
              />
            </View>
            <Text style={styles.name}>
              {values.name.trim() || 'Nama Pengguna'}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informasi Akun</Text>
            <CustomInput
              label="Nama Lengkap"
              placeholder="Nama lengkap"
              value={values.name}
              onChangeText={(value) => setField('name', value)}
              error={errors.name}
              autoCapitalize="words"
            />
            <CustomInput
              label="Email"
              placeholder="nama@email.com"
              value={values.email}
              onChangeText={(value) => setField('email', value)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <CustomInput
              label="No. HP"
              placeholder="08xxxxxxxxxx"
              value={values.phone}
              onChangeText={(value) => setField('phone', value)}
              error={errors.phone}
              keyboardType="phone-pad"
            />
            <CustomInput
              label="Password"
              placeholder="Masukkan password"
              value={values.password}
              onChangeText={(value) => setField('password', value)}
              error={errors.password}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            <CustomInput
              label="Ulangi Password"
              placeholder="Ulangi password"
              value={values.confirmPassword}
              onChangeText={(value) => setField('confirmPassword', value)}
              error={errors.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button
              title="Simpan"
              variant="primaryDark"
              disabled={hasEmptyField}
              onPress={handleSave}
            />
          </View>
          <Button
            title="Tentang"
            variant="outline"
            onPress={() => navigation.navigate('Tentang')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  keyboardArea: { flex: 1 },
  content: { paddingHorizontal: 16, paddingVertical: 32, gap: 32 },
  identity: { alignItems: 'center', gap: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    lineHeight: 27,
  },
  section: { gap: 16 },
  sectionTitle: {
    color: COLORS.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
    lineHeight: 24,
  },
});
