# Coupang Analytics

Next.js + ECharts 多店铺经营分析网站，Matplotlib 共用同一数据模型生成 PDF 月报。

## 本地启动

```bash
npm install
npm run dev
```

若 Python 不在 PATH，请设置 `PYTHON_BIN` 为 Python 可执行文件路径。报告功能依赖 `matplotlib`。

## 新增店铺

在 `lib/data.ts` 的 `stores` 数组新增店铺配置与月度指标。页面、图表、报告接口会自动识别，无需修改组件。
