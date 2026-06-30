// 复杂线路：四个布尔条件 → 指令字母。key 位顺序 = 红 蓝 ★ LED（0/1）。
export type Instr = 'C' | 'D' | 'S' | 'P' | 'B';

export const COMPLICATED: Record<string, Instr> = {
  '0000': 'C', '0001': 'D', '0010': 'C', '0011': 'B',
  '0100': 'S', '0101': 'P', '0110': 'P', '0111': 'P',
  '1000': 'S', '1001': 'B', '1010': 'C', '1011': 'B',
  '1100': 'S', '1101': 'S', '1110': 'P', '1111': 'D',
};

export const INSTR_LABEL: Record<Instr, string> = {
  C: '剪断线路',
  D: '不要剪断',
  S: '序列号末位为偶数则剪断',
  P: '有 Parallel 端口则剪断',
  B: '有两个或更多电池则剪断',
};
