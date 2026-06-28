// 顺序线路：每种颜色第 N 次出现 → 哪些接点字母代表"剪断"。
// index = 出现次数 - 1（0..8）。来自 PDF p14 三张表。
export type Conn = 'A' | 'B' | 'C';
export type SeqColor = 'red' | 'blue' | 'black';

export const SEQUENCES: Record<SeqColor, Conn[][]> = {
  red: [['C'], ['B'], ['A'], ['A', 'C'], ['B'], ['A', 'C'], ['A', 'B', 'C'], ['A', 'B'], ['B']],
  blue: [['B'], ['A', 'C'], ['B'], ['A'], ['B'], ['B', 'C'], ['C'], ['A', 'C'], ['A']],
  black: [['A', 'B', 'C'], ['A', 'C'], ['B'], ['A', 'C'], ['B'], ['B', 'C'], ['A', 'B'], ['C'], ['C']],
};

export const COLOR_LABEL: Record<SeqColor, string> = { red: '红', blue: '蓝', black: '黑' };
