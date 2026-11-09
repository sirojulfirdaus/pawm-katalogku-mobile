import { useState } from 'react';

/**
 * @template {Record<string, string>} T
 * @param {T} initialValues
 * @param {(values: T) => Partial<Record<keyof T, string>>} validate
 */
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(
    /** @type {Partial<Record<keyof T, string>>} */ ({}),
  );
  const [submitted, setSubmitted] = useState(false);

  /** @param {keyof T} field @param {string} value */
  function setField(field, value) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    if (submitted) setErrors(validate(nextValues));
  }

  /** @param {(values: T) => void} onValid */
  function submit(onValid) {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitted(true);
    if (Object.values(nextErrors).some(Boolean)) return;
    onValid(values);
  }

  /** @param {T} [nextValues] */
  function reset(nextValues = initialValues) {
    setValues(nextValues);
    setErrors({});
    setSubmitted(false);
  }

  return { values, errors, setField, submit, reset };
}
