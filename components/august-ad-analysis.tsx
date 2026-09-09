"use client";

import { useMemo } from "react";
import type { EChartsOption } from "echarts";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Eye,
  Megaphone,
  MousePointerClick,
  PackageCheck,
  Percent,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import EChart from "./echart";
import { formatKrw, formatNumber, formatPercent } from "@/lib/format";
import {
  augustAdContribution,
  augustAdInsights,
  augustAdStoreColors,
  augustAdStoreOrder,
  augustAdStores,
  type AugustAdStoreKey,
} from "@/lib/ad-analysis-august";

type AugustAdShopKey = (typeof augustAdStoreOrder)[number];

type KpiDefinition = {
  label: string;
  value: string;
  note: string;
  tone: string;
  Icon: LucideIcon;
  money?: boolean;
};

const shopLabels: Record<AugustAdShopKey, string> = {
  "88": "本土88",
  "70": "本土70",
  "329": "跨境329",
};

const contributionRows = [
  { label: "广告订单", values: augustAdContribution.orders },
  { label: "广告费", values: augustAdContribution.spend },
  { label: "广告转化销售额", values: augustAdContribution.adSales },
] as const;

const trendDefinitions = [
  { title: "曝光量趋势", metric: "impressions" },
  { title: "点击量趋势", metric: "clicks" },
  { title: "转化销量趋势", metric: "conversionSalesCount" },
  { title: "ROAS趋势", metric: "roas" },
] as const;

function makeTrendOption(metric: string, selectedStore: AugustAdStoreKey): EChartsOption {
  const visibleStores: AugustAdShopKey[] = selectedStore === "all" ? [...augustAdStoreOrder] : [selectedStore];
  const data = augustAdStores[selectedStore].periodRows;
  const metricData = data.map((row) => {
    if (metric === "impressions") return row.impressions;
    if (metric === "clicks") return row.clicks;
    if (metric === "conversionSalesCount") return row.conversionSalesCount;
    return row.roas * 100;
  });
  return {
    animationDuration: 650,
    color: ["#7655f6", "#13b9c4", "#f49a18"],
    tooltip: { show: false },
    legend: { show: false },
    grid: { left: 5, right: 5, top: 7, bottom: 5 },
    xAxis: { type: "category" as const, show: false, boundaryGap: false, data: MetricLabels },
    yAxis: { type: "value" as const, show: false, min: 0 },
    series: [{
      name: shopLabels[selectedStore as AugustAdShopKey] ?? "三店整体",
      type: "line" as const,
      smooth: 0.35,
      showSymbol: false,
      lineStyle: { width: 3 },
      data: metricData,
    }],
  };
}

const MetricLabels = ["W1", "W2", "W3", "W4", "W5", "W6"];

function roasStatus(roas: number) {
  if (roas >= 5) return "good";
  if (roas >= 3) return "warn";
  return "danger";
}

function formatFullAxisWon(value: unknown) {
  const scalar = Array.isArray(value) ? value[0] : value;
  return formatKrw(Number(scalar ?? 0));
}

export default function AugustAdAnalysisPage({ selectedStore }: { selectedStore: AugustAdStoreKey }) {
  const data = augustAdStores[selectedStore];
  const summary = data.summary;
  const periods = data.periodRows;

  const kpis: KpiDefinition[] = [
    { label: "曝光量", value: formatNumber(summary.impressions), note: "广告被展示次数", Icon: Eye, tone: "cyan" },
    { label: "点击量", value: formatNumber(summary.clicks), note: "用户点击广告次数", Icon: MousePointerClick, tone: "violet" },
    { label: "广告订单", value: formatNumber(summary.adOrders), note: "广告带来的订单", Icon: ShoppingCart, tone: "orange" },
    { label: "转化销量", value: formatNumber(summary.conversionSalesCount), note: "广告转化商品件数", Icon: PackageCheck, tone: "blue" },
    { label: "广告费", value: formatKrw(summary.adSpend), note: "实际广告支出", Icon: WalletCards, tone: "lime", money: true },
    { label: "ROAS", value: formatPercent(summary.roas * 100, 2), note: "广告销售额 ÷ 广告费", Icon: TrendingUp, tone: "coral" },
    { label: "CTR", value: formatPercent(summary.ctr * 100, 2), note: "点击量 ÷ 曝光量", Icon: Percent, tone: "lime" },
    { label: "CPC", value: formatKrw(summary.cpc), note: "平均每次点击成本", Icon: Target, tone: "cyan", money: true },
    { label: "CVR", value: formatPercent(summary.cvr * 100, 2), note: "广告订单 ÷ 点击量", Icon: Target, tone: "violet" },
    { label: "广告转化销售额", value: formatKrw(summary.adSales), note: "广告直接归因销售额", Icon: Megaphone, tone: "orange", money: true },
    { label: "总销售额", value: formatKrw(summary.totalSales), note: "广告后台店铺销售额", Icon: BarChart3, tone: "blue", money: true },
    { label: "广告销售占比", value: formatPercent(summary.adSalesRatio * 100, 2), note: "广告销售额 ÷ 总销售额", Icon: Sparkles, tone: "coral" },
  ];

  const trendOptions = useMemo(
    () => trendDefinitions.map(({ metric }) => makeTrendOption(metric, selectedStore)),
    [selectedStore],
  );

  const contributionOption = useMemo<EChartsOption>(() => ({
    animationDuration: 700,
    color: augustAdStoreOrder.map((store) => augustAdStoreColors[store]),
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (value) => `${Number(value).toFixed(1)}%` },
    legend: { bottom: 0, left: "center", itemWidth: 10, itemHeight: 10, textStyle: { color: "#72768a", fontSize: 11 } },
    grid: { left: 22, right: 16, top: 6, bottom: 34, containLabel: true },
    xAxis: { type: "value", max: 100, axisLabel: { color: "#8c90a3", fontSize: 10, formatter: "{value}%" }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
    yAxis: { type: "category", inverse: true, data: contributionRows.map((row) => row.label), axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: "#44495f", fontSize: 11, fontWeight: 700 } },
    series: augustAdStoreOrder.map((store) => ({
      name: shopLabels[store],
      type: "bar" as const,
      stack: "contribution",
      barWidth: 21,
      itemStyle: { opacity: selectedStore === "all" || selectedStore === store ? 1 : 0.38, borderRadius: store === "88" ? [7, 0, 0, 7] : store === "329" ? [0, 7, 7, 0] : 0 },
      label: { show: true, position: "inside", color: "#fff", fontSize: 10, fontWeight: 800, formatter: (params: { value: unknown }) => `${Number(params.value).toFixed(1)}%` },
      data: contributionRows.map((row) => row.values[store]),
    })),
  }), [selectedStore]);

  const roasOption = useMemo<EChartsOption>(() => ({
    animationDuration: 700,
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (value) => `${Number(value).toFixed(2)}%` },
    grid: { left: 12, right: 68, top: 7, bottom: 25, containLabel: true },
    xAxis: { type: "value", max: 600, axisLabel: { color: "#8c90a3", fontSize: 10, formatter: "{value}%" }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
    yAxis: { type: "category", inverse: true, data: augustAdStoreOrder.map((store) => shopLabels[store]), axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: "#44495f", fontSize: 11, fontWeight: 700 } },
    series: [{
      type: "bar",
      barWidth: 21,
      label: { show: true, position: "right", color: "#353a50", fontSize: 11, formatter: (params: { value: unknown }) => `${Number(params.value).toFixed(2)}%` },
      data: augustAdStoreOrder.map((store) => ({
        value: augustAdStores[store].summary.roas * 100,
        itemStyle: { color: augustAdStoreColors[store], opacity: selectedStore === "all" || selectedStore === store ? 1 : 0.34, borderRadius: 8 },
      })),
    }],
  }), [selectedStore]);

  const salesTrendOption = useMemo<EChartsOption>(() => ({
    animationDuration: 750,
    color: ["#7655f6", "#13b9c4", "#f49a18"],
    tooltip: { trigger: "axis", valueFormatter: formatFullAxisWon },
    legend: { top: 0, left: "center", itemWidth: 11, itemHeight: 4, textStyle: { color: "#73778b", fontSize: 10 } },
    grid: { left: 18, right: 12, top: 36, bottom: 22, containLabel: true },
    xAxis: { type: "category", boundaryGap: false, data: periods.map((row) => row.period), axisTick: { show: false }, axisLabel: { color: "#85899e", fontSize: 10 } },
    yAxis: { type: "value", axisLabel: { color: "#8f93a7", fontSize: 9, formatter: formatFullAxisWon }, splitLine: { lineStyle: { color: "#ebeaf4", type: "dashed" } } },
    series: [
      { name: "总销售额", type: "line", smooth: 0.25, symbolSize: 6, lineStyle: { width: 2.5 }, data: periods.map((row) => row.totalSales) },
      { name: "广告转化销售额", type: "line", smooth: 0.25, symbolSize: 6, lineStyle: { width: 2.5 }, data: periods.map((row) => row.adSales) },
      { name: "广告费", type: "line", smooth: 0.25, symbolSize: 6, lineStyle: { width: 2.5 }, data: periods.map((row) => row.adSpend) },
    ],
  }), [periods]);

  const weeklyBarOption = useMemo<EChartsOption>(() => ({
    animationDuration: 750,
    color: ["#7655f6", "#13b9c4", "#f49a18"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: formatFullAxisWon },
    legend: { top: 0, left: "center", itemWidth: 10, itemHeight: 10, textStyle: { color: "#73778b", fontSize: 10 } },
    grid: { left: 18, right: 12, top: 36, bottom: 22, containLabel: true },
    xAxis: { type: "category", data: periods.map((row) => row.period), axisTick: { show: false }, axisLabel: { color: "#85899e", fontSize: 10 } },
    yAxis: { type: "value", axisLabel: { color: "#8f93a7", fontSize: 9, formatter: formatFullAxisWon }, splitLine: { lineStyle: { color: "#ebeaf4", type: "dashed" } } },
    series: [
      { name: "总销售额", type: "bar", barWidth: 11, itemStyle: { borderRadius: [6, 6, 0, 0] }, data: periods.map((row) => row.totalSales) },
      { name: "广告转化销售额", type: "bar", barWidth: 11, itemStyle: { borderRadius: [6, 6, 0, 0] }, data: periods.map((row) => row.adSales) },
      { name: "广告费", type: "bar", barWidth: 11, itemStyle: { borderRadius: [6, 6, 0, 0] }, data: periods.map((row) => row.adSpend) },
    ],
  }), [periods]);

  return (
    <div className="content-canvas july-ad-canvas">
      <section className="july-ad-kpi-grid" aria-label={`${data.label}广告核心指标`}>
        {kpis.map(({ label, value, note, tone, Icon, money }) => (
          <article className="kpi-card july-ad-kpi" key={label}>
            <span className={`kpi-icon ${tone}`}><Icon size={21} /></span>
            <div>
              <span>{label}</span>
              <strong className={money ? "july-ad-money" : undefined}>{value}</strong>
              <small>{note}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="july-ad-trend-grid">
        {trendDefinitions.map(({ title }, index) => (
          <article className="panel july-ad-mini-card" key={title}>
            <div className="july-ad-mini-heading">
              <div><h3>{title}</h3><p>周度真实数据，仅展示波动</p></div>
            </div>
            <EChart option={trendOptions[index]} height={88} />
          </article>
        ))}
      </section>

      <section className="july-ad-chart-grid july-ad-comparison-grid">
        <article className="panel july-ad-chart-card">
          <div className="panel-heading july-ad-panel-heading"><div><h2>三店广告贡献对比</h2><p>广告订单、广告费和广告转化销售额占比</p></div><span className="data-source">月度真实合计</span></div>
          <EChart option={contributionOption} height={208} />
        </article>
        <article className="panel july-ad-chart-card">
          <div className="panel-heading july-ad-panel-heading"><div><h2>三店投产效率对比</h2><p>广告转化销售额 ÷ 广告费</p></div><span className="data-source">ROAS</span></div>
          <EChart option={roasOption} height={208} />
        </article>
      </section>

      <section className="july-ad-chart-grid july-ad-weekly-grid">
        <article className="panel july-ad-chart-card">
          <div className="panel-heading july-ad-panel-heading"><div><h2>销售与广告投入趋势</h2><p>{data.label} · 总销售额 / 广告转化销售额 / 广告费</p></div><span className="data-source">六周精确数据</span></div>
          <EChart option={salesTrendOption} height={224} />
        </article>
        <article className="panel july-ad-chart-card">
          <div className="panel-heading july-ad-panel-heading"><div><h2>周度业绩对比</h2><p>{data.label} · 8月六个时间段</p></div><span className="data-source">后台周表</span></div>
          <EChart option={weeklyBarOption} height={224} />
        </article>
      </section>

      <section className="panel july-ad-table-panel">
        <div className="panel-heading july-ad-panel-heading"><div><h2>时间段明细表</h2><p>{data.label} · 月度合计与六周明细完全对齐</p></div><span className="data-source">韩元原始口径</span></div>
        <div className="july-ad-table-scroll" tabIndex={0} aria-label="广告时间段明细，可横向滚动">
          <table className="july-ad-table">
            <thead><tr><th>查询时间</th><th>曝光量</th><th>点击量</th><th>CTR</th><th>CPC</th><th>广告订单</th><th>转化销量</th><th>CVR</th><th>广告费</th><th>广告转化销售额</th><th>总销售额</th><th>ROAS</th></tr></thead>
            <tbody>
              {periods.map((row) => (
                <tr key={row.period}>
                  <td>{row.period}</td>
                  <td>{formatNumber(row.impressions)}</td>
                  <td>{formatNumber(row.clicks)}</td>
                  <td>{formatPercent(row.ctr * 100, 2)}</td>
                  <td>{formatKrw(row.cpc)}</td>
                  <td>{formatNumber(row.adOrders)}</td>
                  <td>{formatNumber(row.conversionSalesCount)}</td>
                  <td>{formatPercent(row.cvr * 100, 2)}</td>
                  <td>{formatKrw(row.adSpend)}</td>
                  <td>{formatKrw(row.adSales)}</td>
                  <td>{formatKrw(row.totalSales)}</td>
                  <td><span className={`status-pill ${roasStatus(row.roas)}`}>{formatPercent(row.roas * 100, 2)}</span></td>
                </tr>
              ))}
              <tr className="july-ad-total-row">
                <td>{selectedStore === "all" ? "三店合计" : `${data.label}合计`}</td>
                <td>{formatNumber(summary.impressions)}</td>
                <td>{formatNumber(summary.clicks)}</td>
                <td>{formatPercent(summary.ctr * 100, 2)}</td>
                <td>{formatKrw(summary.cpc)}</td>
                <td>{formatNumber(summary.adOrders)}</td>
                <td>{formatNumber(summary.conversionSalesCount)}</td>
                <td>{formatPercent(summary.cvr * 100, 2)}</td>
                <td>{formatKrw(summary.adSpend)}</td>
                <td>{formatKrw(summary.adSales)}</td>
                <td>{formatKrw(summary.totalSales)}</td>
                <td><span className={`status-pill ${roasStatus(summary.roas)}`}>{formatPercent(summary.roas * 100, 2)}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel july-ad-insight-panel">
        <div className="panel-heading july-ad-panel-heading"><div><h2>自动诊断结论</h2><p>三店月度表现简洁总结</p></div></div>
        <div className="july-ad-insight-grid">
          {augustAdInsights.map((insight, index) => {
            const Icon = index === 0 ? Sparkles : index === 1 ? TrendingUp : index === 2 ? Target : Megaphone;
            return (
              <article className={`july-ad-insight ${insight.level}${selectedStore === insight.key ? " selected" : ""}`} key={insight.key}>
                <span><Icon size={22} /></span>
                <div><small>{insight.title}</small><strong>{insight.value}</strong><p>{insight.note}</p></div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
