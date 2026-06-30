// 全局炸弹状态：电池数量 / 指示灯 / 端口 / 序列号。
// 全炸弹通用，跨页面、跨刷新保留（localStorage），直到点击顶部「重置」清空。

export interface BombState {
  serial: string;        // 序列号（用于判断含元音、末位奇偶）
  batteries: number;     // 电池数量
  indicators: string[];  // 已点亮的指示灯标签
  ports: string[];       // 存在的端口
}

// 附录 A 常见指示灯标记（取自 modules.ts）
export const INDICATOR_LABELS = ['SND', 'CLR', 'CAR', 'IND', 'FRQ', 'SIG', 'NSA', 'MSA', 'TRN', 'BOB', 'FRK'] as const;
// 附录 C 常见端口类型
export const PORT_LABELS = ['DVI-D', 'Parallel', 'PS/2', 'RJ-45', 'Serial', 'Stereo RCA'] as const;

const KEY = 'ktane-bomb-state';
const EVT = 'bombstate:change';

const EMPTY: BombState = { serial: '', batteries: 0, indicators: [], ports: [] };

export function getBombState(): BombState {
  if (typeof localStorage === 'undefined') return { ...EMPTY };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const p = JSON.parse(raw);
    return {
      serial: typeof p.serial === 'string' ? p.serial : '',
      batteries: Number.isFinite(p.batteries) ? p.batteries : 0,
      indicators: Array.isArray(p.indicators) ? p.indicators : [],
      ports: Array.isArray(p.ports) ? p.ports : [],
    };
  } catch {
    return { ...EMPTY };
  }
}

export function setBombState(patch: Partial<BombState>): BombState {
  const next = { ...getBombState(), ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* localStorage 不可用时仅广播，不持久化 */
  }
  emit(next);
  return next;
}

export function resetBombState(): BombState {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit({ ...EMPTY });
  return { ...EMPTY };
}

function emit(state: BombState) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<BombState>(EVT, { detail: state }));
}

// 订阅变更（含本页广播与跨标签页 storage 同步）。返回取消订阅函数。
export function onBombStateChange(cb: (s: BombState) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<BombState>).detail);
  const storageHandler = (e: StorageEvent) => {
    if (e.key === KEY) cb(getBombState());
  };
  window.addEventListener(EVT, handler);
  window.addEventListener('storage', storageHandler);
  return () => {
    window.removeEventListener(EVT, handler);
    window.removeEventListener('storage', storageHandler);
  };
}

// ---------- 派生判断 ----------
const VOWELS = /[AEIOU]/i;

export const serialHasVowel = (s: BombState): boolean => VOWELS.test(s.serial);

// 序列号最后一个数字；无数字返回 null
export function serialLastDigit(s: BombState): number | null {
  const digits = s.serial.replace(/\D/g, '');
  return digits ? Number(digits[digits.length - 1]) : null;
}

// 末位数字奇偶：偶=true，奇=false，未知=null
export function serialLastDigitEven(s: BombState): boolean | null {
  const d = serialLastDigit(s);
  return d === null ? null : d % 2 === 0;
}

export const hasPort = (s: BombState, name: string): boolean => s.ports.includes(name);
export const batteryCount = (s: BombState): number => s.batteries;
