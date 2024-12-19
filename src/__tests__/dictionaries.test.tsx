import { describe, expect, it } from 'vitest';
import enDictionary from '../app/[lang]/dictionaries/en.json' with { type: 'json' };
import ruDictionary from '../app/[lang]/dictionaries/ru.json' with { type: 'json' };

describe('Dictionaries test', () => {
  it('Dictionaries keys are the same', () => {
    function replaceValues(dictionary: object): Array<unknown> {
      const arr = Object.entries(dictionary);

      return arr.map(([key, value]: [string, string | object]) =>
        typeof value === 'string' ? [key, ''] : [key, replaceValues(value)],
      );
    }

    const enKeysArr = replaceValues(enDictionary);
    const ruKeysArr = replaceValues(ruDictionary);

    expect(ruKeysArr).toStrictEqual(enKeysArr);
  });
});
