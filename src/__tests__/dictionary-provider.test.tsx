import DictionaryProvider, { DictionaryContext } from '@/providers/dictionary-provider';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import enDictionary from '@/app/[lang]/dictionaries/en.json';
import { useContext } from 'react';

const Component = () => {
  const dictionary = useContext(DictionaryContext);

  return <p>{dictionary?.status}</p>;
};

describe('Dictionary provider', () => {
  it('', () => {
    render(
      <DictionaryProvider dictionary={enDictionary}>
        <Component />
      </DictionaryProvider>,
    );

    const component = screen.getByText(enDictionary.status);
    expect(component instanceof HTMLParagraphElement).toBeTruthy();
  });
});
