/**
 * Validates an email format.
 * @param {string} email
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
}

/**
 * Validates that a value is non-empty.
 * @param {string} value
 * @param {string} fieldName
 * @returns {string|null} Error message or null if valid
 */
export function validateRequired(value, fieldName = 'This field') {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
}

/**
 * Validates login form fields.
 * @param {{ email: string, password: string }} fields
 * @returns {{ email: string|null, password: string|null }} Error object
 */
export function validateLoginForm({ email, password }) {
  return {
    email: validateEmail(email),
    password: validateRequired(password, 'Password'),
  };
}

/**
 * Validates template form fields.
 * @param {{ name: string, subject: string, content: string }} fields
 * @returns {{ name: string|null, subject: string|null, content: string|null }} Error object
 */
export function validateTemplateForm({ name, subject, content }) {
  return {
    name: validateRequired(name, 'Template name'),
    subject: validateRequired(subject, 'Subject'),
    content: validateRequired(content, 'Content'),
  };
}

/**
 * Checks if an error object has any errors.
 * @param {Object} errors
 * @returns {boolean}
 */
export function hasErrors(errors) {
  return Object.values(errors).some((err) => err !== null);
}
