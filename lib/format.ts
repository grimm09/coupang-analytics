export const formatKrw = (value: number) => `₩${new Intl.NumberFormat("ko-KR").format(Math.round(value))}`;
export const formatNumber = (value: number) => new Intl.NumberFormat("zh-CN").format(Math.round(value));
export const formatPercent = (value: number, digits = 1) => `${value.toFixed(digits)}%`;
