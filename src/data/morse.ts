// 摩斯电码模块：解出的英文单词 → 提交频率 (MHz)。来自 PDF p12 表格。
export interface MorseWord {
  word: string;
  mhz: string;
}

export const MORSE_WORDS: MorseWord[] = [
  { word: 'shell', mhz: '3.505' },
  { word: 'halls', mhz: '3.515' },
  { word: 'slick', mhz: '3.522' },
  { word: 'trick', mhz: '3.532' },
  { word: 'boxes', mhz: '3.535' },
  { word: 'leaks', mhz: '3.542' },
  { word: 'strobe', mhz: '3.545' },
  { word: 'bistro', mhz: '3.552' },
  { word: 'flick', mhz: '3.555' },
  { word: 'bombs', mhz: '3.565' },
  { word: 'break', mhz: '3.572' },
  { word: 'brick', mhz: '3.575' },
  { word: 'steak', mhz: '3.582' },
  { word: 'sting', mhz: '3.592' },
  { word: 'vector', mhz: '3.595' },
  { word: 'beats', mhz: '3.600' },
];

// 标准国际摩斯电码（A-Z, 0-9）。·=点(短) −=划(长)。
export const MORSE_CODE: Record<string, string> = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.',
  h: '....', i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.',
  o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-', u: '..-',
  v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
};

// 反查表：摩斯串 → 字母。
export const MORSE_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_CODE).map(([k, v]) => [v, k]),
);
