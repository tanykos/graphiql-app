import { FormControl, Input, InputLabel } from '@mui/material';
import { useState } from 'react';
import { PasswordAction } from '../PasswordAction/PasswordAction';

interface InputFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  fullWidth?: boolean;
}

export function InputField({ id, label, type = 'text', fullWidth = true }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth={fullWidth} variant="standard">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        autoComplete="off"
        endAdornment={
          type === 'password' && <PasswordAction showPassword={showPassword} setShowPassword={setShowPassword} />
        }
      />
    </FormControl>
  );
}
