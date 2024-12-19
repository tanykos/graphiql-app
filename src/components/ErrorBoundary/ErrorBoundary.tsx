'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from './ErrorBoundary.module.scss';
import { Box, Typography } from '@mui/material';
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  dictionary: Dictionary;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    const { dictionary } = this.props;

    if (this.state.hasError) {
      return (
        <Box className={styles.wrapper}>
          <Typography variant="h4">{dictionary.wentWrong}</Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
