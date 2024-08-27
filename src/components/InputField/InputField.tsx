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

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <FormControl fullWidth={fullWidth} variant="standard">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        type={getInputType()}
        autoComplete="off"
        endAdornment={
          type === 'password' && <PasswordAction showPassword={showPassword} setShowPassword={setShowPassword} />
        }
      />
    </FormControl>
  );
}
