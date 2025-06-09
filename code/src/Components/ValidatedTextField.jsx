import React from 'react';
import { TextField } from '@mui/material';

export default function ValidatedTextField({
  name,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  fullWidth = true,
  slotProps = {},
  min,
  max,
  minLength,
  maxLength,
  validationType, // 'text', 'number', 'email', 'id'
  ...rest
}) {
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const validate = (val) => {
    if (required && !val.trim()) {
      setError(true);
      setHelperText(`${label} is required`);
      return;
    }

    if (validationType === 'text' && !/^[A-Za-z .'-]{2,}$/.test(val)) {
      setError(true);
      setHelperText(`${label} may include only letters, spaces, dots, apostrophes or hyphens`);
      return;
    }

    if (validationType === 'email') {
      const emailRegex = /^[\w.-]+@[\w.-]+\.(com|co\.il|net|org|il)$/;
      if (!emailRegex.test(val)) {
        setError(true);
        setHelperText(`Email must include @ and end with .com, .net, .co.il, .org or .il`);
        return;
      }
    }

    if (validationType === 'number') {
      const num = Number(val);
      if (isNaN(num)) {
        setError(true);
        setHelperText(`${label} must be numeric`);
        return;
      }
      if (min !== undefined && num < min) {
        setError(true);
        setHelperText(`${label} must be at least ${min}`);
        return;
      }
      if (max !== undefined && num > max) {
        setError(true);
        setHelperText(`${label} must be at most ${max}`);
        return;
      }
    }

    if (validationType === 'id') {
      if (!/^\d{9}$/.test(val)) {
        setError(true);
        setHelperText(`ID must be exactly 9 digits`);
        return;
      }
    }

    if (minLength && val.length < minLength) {
      setError(true);
      setHelperText(`${label} must be at least ${minLength} characters`);
      return;
    }

    if (maxLength && val.length > maxLength) {
      setError(true);
      setHelperText(`${label} must be at most ${maxLength} characters`);
      return;
    }

    setError(false);
    setHelperText('');
  };

  const handleBlur = () => validate(value);

  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
      required={required}
      fullWidth={fullWidth}
      type={type}
      slotProps={slotProps}
      inputProps={{ min, max, maxLength, ...slotProps.inputProps }}
      {...rest}
    />
  );
}
