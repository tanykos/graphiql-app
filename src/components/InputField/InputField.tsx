import { FormControl, Input, InputLabel, InputProps, FormHelperText } from '@mui/material';
import { forwardRef, useState } from 'react';
import { PasswordAction } from '../PasswordAction/PasswordAction';

interface InputFieldProps extends InputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, type = 'text', fullWidth = true, error, helperText, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <FormControl
        fullWidth={fullWidth}
        variant="standard"
        error={error}
        sx={{ position: 'relative', paddingBottom: '20px' }}
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input
          id={id}
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          autoComplete="off"
          endAdornment={
            type === 'password' && <PasswordAction showPassword={showPassword} setShowPassword={setShowPassword} />
          }
          ref={ref}
          {...rest}
        />
        {helperText && <FormHelperText sx={{ position: 'absolute', bottom: '0' }}>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

InputField.displayName = 'InputField';
export { InputField };
