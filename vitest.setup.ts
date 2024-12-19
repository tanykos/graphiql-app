import { cleanup } from '@testing-library/react';
import { vi, afterEach, beforeEach } from 'vitest';

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});
