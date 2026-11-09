/** @param {string} value @param {string} label */
export function required(value, label) {
  return value.trim() ? '' : `${label} wajib diisi.`;
}

/** @param {string} value */
export function validateEmail(value) {
  return (
    required(value, 'Email') ||
    (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ? ''
      : 'Format email tidak valid.')
  );
}

/** @param {string} value */
export function validatePhone(value) {
  if (!value.trim()) return 'No. HP wajib diisi.';
  if (!/^\d+$/.test(value)) return 'No. HP hanya boleh berisi angka.';
  if (!value.startsWith('08')) return 'No. HP harus diawali 08.';
  if (value.length < 10 || value.length > 13)
    return 'No. HP harus terdiri dari 10–13 digit.';
  return '';
}

/** @param {string} value */
export function validatePassword(value) {
  return (
    required(value, 'Password') ||
    (value.length >= 8 ? '' : 'Password minimal 8 karakter.')
  );
}

/** @param {string} value @param {string} password */
export function validatePasswordConfirmation(value, password) {
  return (
    required(value, 'Ulangi Password') ||
    (value === password ? '' : 'Password tidak cocok.')
  );
}
