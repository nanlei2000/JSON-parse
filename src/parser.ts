import { stringify } from "./stringify";

export function parse(str: string): any {
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
    /** 解析`null` `false` `true`三个字面量 */
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

    type FloatTuple = [string, string];

    function parseNumber(): number | bigint | FloatTuple {
        let numStr = '';
        while (isNumberChar(str[i])) {
            numStr += str[i++];
        }
        const intOrFloat = parseFloat(numStr);
        if (!numStr.includes('.')) {
            if (Number.isSafeInteger(intOrFloat)) {
                return intOrFloat;
            } else {
                return BigInt(numStr)
            }
            // 浮点数
        } else {
            if (Number.isSafeInteger(parseInt(numStr))) {
                return intOrFloat;
            } else {
                const floatTuple = numStr.split('.') as FloatTuple
                (floatTuple as any).__proto__.toString = function (this: FloatTuple) {
                    return this.join(".")
                };
                (floatTuple as any).__proto__.toJSON = function (this: FloatTuple) {
                    return this.join(".")
                }
                return floatTuple
            }
        }
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
// const str = `{"a":0.1, "b": false, "c": true, "d": null, "e": "hello", "f": [123456789876543210, 2, {"a": 1, "b": false, "c": true, "d": null, "e": "你好"}]}`;
const str = '12345678987654321012345.123';
const res1 = parse(str);
console.log('→: res1', res1);
console.log('→: res1', stringify(res1));
console.log('→: res1', typeof res1);

const res2 = JSON.parse(str);
console.log('→: res2', res2);
console.log('→: res2', JSON.stringify(res2));
console.log('→: res2', typeof res2);
// console.log('→: res', JSON.stringify(res) === str);
