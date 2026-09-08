
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  const successMessage = document.getElementById('form-success');

  const fields = {
    'first-name': {
      validate: (value) => value.trim().length > 0,
      message: 'First name is required.',
    },
    'second-name': {
      validate: (value) => value.trim().length > 0,
      message: 'Second name is required.',
    },
    'user-email': {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: 'Enter a valid email address (e.g. name@example.com).',
    },
    'number': {
      validate: (value) => /^\+?[0-9\s-]{7,15}$/.test(value.trim()),
      message: 'Enter a valid phone number (7–15 digits).',
    },
    'password': {
      validate: (value) =>
        value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value),
      message: 'Password must be 8+ characters and include an uppercase letter, a lowercase letter, and a number.',
    },
    'confirm-password': {
      validate: (value) => value === document.getElementById('password').value,
      message: 'Passwords do not match.',
    },
  };

  // Validate a single field and show/hide its error message
  function validateField(id) {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(`${id}-error`);
    const rule = fields[id];

    const isValid = rule.validate(input.value);

    if (isValid) {
      errorEl.textContent = '';
      input.classList.remove('invalid');
      input.classList.add('valid');
    } else {
      errorEl.textContent = rule.message;
      input.classList.remove('valid');
      input.classList.add('invalid');
    }

    return isValid;
  }

  // Wire up real-time validation: check on blur, clear error while typing
  Object.keys(fields).forEach((id) => {
    const input = document.getElementById(id);

    input.addEventListener('blur', () => validateField(id));

    input.addEventListener('input', () => {
      const errorEl = document.getElementById(`${id}-error`);
      if (input.classList.contains('invalid')) {
        // re-validate live once the user is correcting a flagged field
        validateField(id);
      } else {
        errorEl.textContent = '';
      }
    });
  });

  // Validate everything on submit
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // no backend — never reload the page

    let allValid = true;
    Object.keys(fields).forEach((id) => {
      const valid = validateField(id);
      if (!valid) allValid = false;
    });

    if (allValid) {
      successMessage.hidden = false;
      form.reset();
      // clear valid/invalid styling after reset
      Object.keys(fields).forEach((id) => {
        document.getElementById(id).classList.remove('valid', 'invalid');
      });
    } else {
      successMessage.hidden = true;
    }
  });
});
