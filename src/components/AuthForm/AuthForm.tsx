'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { Alert, Grid, Snackbar } from '@mui/material';
import { useContext, useState } from 'react';
import { FormContainer } from '@/components/AuthForm/FormContainer/FormContainer';
import { InputField } from '@/components/InputField/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { AuthKeys, AuthResponse, FormInputs } from '@/types/auth';
import { getValidationSchemas } from '@/utils/validation';
import { getFieldsData } from '@/utils/get-fields-data';
import { AuthFormNames } from '@/constants/form-fields-const';
import { usePathname, useRouter } from 'next/navigation';
import getLocale from '@/utils/get-locale';
import { Routes } from '@/constants/routes';
import { UserContext } from '@/providers/user-provider';

interface AuthFormProps {
  dictionaryKey: AuthKeys;
}

export default function AuthForm({ dictionaryKey }: AuthFormProps) {
  const dictionary = useContext(DictionaryContext);
  const userContext = useContext(UserContext);
  const { fetchAuthStatus } = userContext!;
  const router = useRouter();
  const pathname = usePathname();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const isSignUp = dictionaryKey === AuthFormNames.SIGNUP;
  const validationSchema = getValidationSchemas(dictionary!, isSignUp);
  const defaultValues: FormInputs = isSignUp ? { email: '', password: '', user: '' } : { email: '', password: '' };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues,
  });

  if (!dictionary) return;

  const formData = {
    title: dictionary[dictionaryKey].title,
    buttonText: dictionary[dictionaryKey].button,
    disabled: !isValid || isSubmitting,
    note: dictionary[dictionaryKey].note,
    linkText: dictionary[dictionaryKey].link,
    href: dictionaryKey === AuthFormNames.SIGNUP ? Routes.SIGN_IN : Routes.SIGN_UP,
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbar = (message: string, severity: 'error' | 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const onSubmit = async (data: FormInputs) => {
    const locale = getLocale(pathname);
    const apiEndpoint = isSignUp ? '/api/register' : '/api/login';

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data || {}),
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': locale,
        },
      });

      const result = (await res.json()) as AuthResponse;

      if (result.error) {
        handleSnackbar(result.error, 'error');
      } else {
        await fetchAuthStatus();
        router.push(`/${locale}`);
      }
    } catch {
      handleSnackbar(dictionary.authFailed, 'error');
    }
  };

  const fields = getFieldsData(dictionary, dictionaryKey);

  return (
    <>
      <FormContainer
        data={formData}
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
      >
        {fields.map(({ id, label, type }) => (
          <Grid item xs={12} key={id}>
            <Controller
              name={id}
              control={control}
              render={({ field }) => {
                const errorText = errors[id as keyof FormInputs]?.message;
                return (
                  <InputField
                    id={id}
                    label={label}
                    type={type}
                    {...field}
                    error={!!errors[id as keyof FormInputs]}
                    helperText={errorText}
                  />
                );
              }}
            />
          </Grid>
        ))}
      </FormContainer>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
