export function parser(str: string): any {
  let i = 0;

  function parseValue(): any {
    if (isNumberChar(str[i])) {
      return parseNumber();
    }
    const currentChar = str[i] as '{' | '[' | 'n' | 't' | 'f' | '"';
    switch (currentChar) {
      case '{':
        return parseObject();
      case '[':
        return parseArray();
      case 'n':
        return parseBoolAndNull('null');
      case 't':
        return parseBoolAndNull('true');
      case 'f':
        return parseBoolAndNull('false');
      case '"':
        return parseString();
      default:
        assertNever(currentChar);
    }
  }

  function parseString(): string {
    let res = '';
    i++;
    while (str[i] !== '"') {
      res += str[i++];
    }
    i++;
    return res;
  }

  const strValueMap = {
    null: null,
    true: true,
    false: false,
  };

  function parseBoolAndNull(
    expectedStr: keyof typeof strValueMap
  ): boolean | null {
    const res = str.substr(i, expectedStr.length);
    if (res === expectedStr) {
      i += expectedStr.length;
      return strValueMap[expectedStr];
    } else {
      throw new Error('Unexpected char at pos: ' + i);
    }
  }

  function parseNumber(): number {
    let numStr = '';
    while (isNumberChar(str[i])) {
      numStr += str[i++];
    }
    return parseFloat(numStr);
  }

  function isNumberChar(char: string): boolean {
    return '1234567890-+eE.'.includes(char);
  }

  function parseArray(): any[] {
    i++;
    const res: any[] = [];
    while (str[i] !== ']') {
      res.push(parseValue());
      if (str[i] === ',') {
        i++;
      }
    }
    i++;
    return res;
  }

  function parseObject(): { [key: string]: any } {
    i++;
    const res: { [key: string]: any } = {};
    while (str[i] !== '}') {
      const key = parseString();
      i++;
      const value = parseValue();
      res[key] = value;
      if (str[i] === ',') {
        i++;
      }
    }
    i++;
    return res;
  }

  function assertNever(_value: never): never {
    throw new Error('Unexpected char at pos: ' + i);
  }

  return parseValue();
}

// test
const str = JSON.stringify({
  a: 0.1,
  b: false,
  c: true,
  d: null,
  e: 'hello',
  f: [1, 2, { a: 1, b: false, c: true, d: null, e: 'hello' }],
});
const res = parser(str);
console.log('→: res', JSON.stringify(res));
console.log('→: res', JSON.stringify(res) === str);
