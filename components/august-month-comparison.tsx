"use client";

import { useMemo, useState } from "react";
import type { EChartsOption } from "echarts";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Download,
  Megaphone,
  PackageCheck,
  Percent,
  ShieldCheck,
  ShoppingBag,
  Store,
  Target,
} from "lucide-react";
import EChart from "@/components/echart";
import { augustMonthComparison, type AugustCompareMetric } from "@/lib/month-compare-august";

type DimensionKey = "overview" | "product" | "category" | "advertising" | "store";

const dimensions: { key: DimensionKey; label: string; target: string }[] = [
  { key: "overview", label: "整体概览", target: "august-compare-overview" },
  { key: "product", label: "产品维度", target: "august-compare-product" },
  { key: "category", label: "品类维度", target: "august-compare-category" },
  { key: "advertising", label: "广告维度", target: "august-compare-advertising" },
  { key: "store", label: "店铺维度", target: "august-compare-store" },
];

const numberFormatter = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 });
const currencyFormatter = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 });

const formatNumber = (value: number) => numberFormatter.format(value);
const formatCny = (value: number) => `¥${currencyFormatter.format(value)}`;
const formatCompactCny = (value: number) => value >= 10_000 ? `¥${(value / 10_000).toFixed(1)}万` : formatCny(value);
const formatKrw = (value: number) => `₩${currencyFormatter.format(value)}`;
const formatPercent = (value: number, digits = 2) => `${(value * 100).toFixed(digits)}%`;
const formatPp = (value: number) => `${value >= 0 ? "+" : ""}${(value * 100).toFixed(2)}pp`;
const relativeChange = (july: number, august: number) => july === 0 ? null : (august - july) / july;
const formatRelativeChange = (july: number, august: number) => {
  const change = relativeChange(july, august);
  return change === null ? "新增" : `${change >= 0 ? "+" : ""}${(change * 100).toFixed(2)}%`;
};

const metricValue = (metric: AugustCompareMetric, value: number) => {
  if (metric.kind === "money") return formatCompactCny(value);
  if (metric.kind === "percent" || metric.kind === "loss") return formatPercent(value);
  return formatNumber(value);
};

const metricChange = (metric: AugustCompareMetric) => {
  if (metric.kind === "percent" || metric.kind === "loss") return formatPp(metric.august - metric.july);
  return formatRelativeChange(metric.july, metric.august);
};

const isMetricImprovement = (metric: AugustCompareMetric) =>
  metric.kind === "loss" ? metric.august < metric.july : metric.august > metric.july;

const adValue = (metric: (typeof augustMonthComparison.advertising)[number], value: number) => {
  if (metric.kind === "krw") return formatKrw(value);
  if (metric.kind === "roas") return formatPercent(value);
  return formatNumber(value);
};

const adChange = (metric: (typeof augustMonthComparison.advertising)[number]) =>
  metric.kind === "roas" ? formatPp(metric.august - metric.july) : formatRelativeChange(metric.july, metric.august);

export default function AugustMonthComparison({ onCompareMonthChange }: { onCompareMonthChange: (month: string) => void }) {
  const [activeDimension, setActiveDimension] = useState<DimensionKey>("overview");
  const data = augustMonthComparison;
  const metricIcons = [PackageCheck, CircleDollarSign, Boxes, ShoppingBag, Percent, ShieldCheck] as const;
  const totalJulyOrders = data.stores.reduce((sum, item) => sum + item.julyOrders, 0);
  const totalAugustOrders = data.stores.reduce((sum, item) => sum + item.augustOrders, 0);
  const maxRevenue = Math.max(...data.stores.map((item) => item.augustRevenue));

  const categoryOption = useMemo<EChartsOption>(() => ({
    animationDuration: 650,
    color: ["#d8d8f4", "#6c4cf6"],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      valueFormatter: (value: unknown) => formatCny(Number(value)),
    },
    legend: {
      right: 2,
      top: 0,
      itemWidth: 11,
      itemHeight: 8,
      textStyle: { color: "#656980", fontSize: 12 },
    },
    grid: { left: 14, right: 22, top: 38, bottom: 10, containLabel: true },
    xAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999caf", formatter: (value: number) => value >= 10_000 ? `${Math.round(value / 10_000)}万` : value },
      splitLine: { lineStyle: { color: "#ececf5", type: "dashed" } },
    },
    yAxis: {
      type: "category",
      data: data.categories.map((item) => item.name),
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#45495f", fontSize: 13, fontWeight: 700 },
    },
    series: [
      {
        name: "7月",
        type: "bar",
        barWidth: 10,
        itemStyle: { borderRadius: 8 },
        label: { show: true, position: "right", color: "#888ca0", fontSize: 10, formatter: (params: { value?: unknown }) => formatCompactCny(Number(params.value ?? 0)) },
        data: data.categories.map((item) => item.july),
      },
      {
        name: "8月",
        type: "bar",
        barWidth: 10,
        itemStyle: { borderRadius: 8 },
        label: { show: true, position: "right", color: "#5d46df", fontSize: 10, fontWeight: 700, formatter: (params: { value?: unknown }) => formatCompactCny(Number(params.value ?? 0)) },
        data: data.categories.map((item) => item.august),
      },
    ],
  }), [data.categories]);

  const advertisingOption = useMemo<EChartsOption>(() => ({
    animationDuration: 650,
    color: ["#d8d8f4", "#6c4cf6"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      left: "center",
      top: 0,
      itemWidth: 11,
      itemHeight: 8,
      textStyle: { color: "#656980", fontSize: 12 },
    },
    grid: { left: 20, right: 16, top: 34, bottom: 28, containLabel: true },
    xAxis: {
      type: "category",
      data: data.advertising.map((item) => item.label),
      axisLine: { lineStyle: { color: "#dedfea" } },
      axisTick: { show: false },
      axisLabel: { color: "#5f6378", fontSize: 11, interval: 0 },
    },
    yAxis: {
      type: "value",
      min: 0,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#999caf", formatter: "{value}%" },
      splitLine: { lineStyle: { color: "#ececf5", type: "dashed" } },
    },
    series: [
      {
        name: "7月",
        type: "bar",
        barWidth: 18,
        itemStyle: { borderRadius: [7, 7, 0, 0] },
        data: data.advertising.map(() => 100),
      },
      {
        name: "8月",
        type: "bar",
        barWidth: 18,
        itemStyle: { borderRadius: [7, 7, 0, 0] },
        data: data.advertising.map((item) => (item.august / item.july) * 100),
      },
    ],
  }), [data.advertising]);

  const jumpTo = (dimension: (typeof dimensions)[number]) => {
    setActiveDimension(dimension.key);
    document.getElementById(dimension.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="july-compare-canvas" id="august-compare-overview">
      <section className="july-compare-hero">
        <div className="july-compare-title">
          <h1>月度对比：2026年7月 vs 2026年8月</h1>
          <p>{data.sourceNote}</p>
        </div>
        <div className="july-compare-controls">
          <label>
            <span>对比月份A</span>
            <span className="july-compare-static-select"><CalendarDays size={15} />2026年7月<ChevronDown size={14} /></span>
          </label>
          <label>
            <span>对比月份B</span>
            <span className="july-compare-select"><CalendarDays size={15} /><select value="2026-08" onChange={(event) => onCompareMonthChange(event.target.value)} aria-label="选择对比月份B"><option value="2026-03">2026年3月</option><option value="2026-04">2026年4月</option><option value="2026-05">2026年5月</option><option value="2026-06">2026年6月</option><option value="2026-07">2026年7月</option><option value="2026-08">2026年8月</option></select><ChevronDown size={14} /></span>
          </label>
          <button className="july-compare-scope" type="button"><Target size={16} />个人经营<ChevronDown size={14} /></button>
          <button className="july-compare-export" type="button" onClick={() => window.print()}><Download size={16} />导出报告</button>
        </div>
      </section>

      <nav className="july-compare-tabs" aria-label="月度对比维度">
        {dimensions.map((item) => <button key={item.key} className={activeDimension === item.key ? "selected" : ""} type="button" onClick={() => jumpTo(item)} aria-pressed={activeDimension === item.key}>{item.label}</button>)}
      </nav>

      <section className="july-compare-kpis" aria-label="7月与8月核心指标对比">
        {data.metrics.map((metric, index) => {
          const Icon = metricIcons[index] ?? BarChart3;
          const improved = isMetricImprovement(metric);
          return <article className="july-compare-kpi" key={metric.label}>
            <span className={`july-compare-kpi-icon tone-${index}`}><Icon size={21} /></span>
            <div>
              <h2>{metric.label}</h2>
              <div className="july-compare-kpi-values"><span><small>7月</small><b>{metricValue(metric, metric.july)}</b></span><ArrowRight size={16} /><span><small>8月</small><b>{metricValue(metric, metric.august)}</b></span></div>
              <strong className={improved ? "good" : "bad"}>{metricChange(metric)}</strong>
            </div>
          </article>;
        })}
      </section>

      <section className="july-compare-top-grid">
        <article className="july-compare-panel july-compare-product" id="august-compare-product">
          <div className="july-compare-panel-heading"><div><h2>产品维度｜订单变化与经营质量</h2><p>真实产品ID · 多店铺合并统计 · 8月质量指标</p></div><PackageCheck size={20} /></div>
          <div className="july-compare-table-scroll" aria-label="产品月度对比明细，可横向滚动">
            <table>
              <thead><tr><th>产品ID</th><th>产品名称</th><th>店铺</th><th>7月订单</th><th>8月订单</th><th>变化</th><th>毛利率</th><th>退损率</th><th>诊断</th></tr></thead>
              <tbody>{data.products.map((item) => {
                const diff = item.augustOrders - item.julyOrders;
                return <tr key={item.id}><td className="product-id">{item.id}</td><td title={item.name}><span className="july-compare-product-name">{item.name}</span></td><td><span className="july-compare-store-tag">{item.stores}</span></td><td>{formatNumber(item.julyOrders)}</td><td>{formatNumber(item.augustOrders)}</td><td className={diff >= 0 ? "positive" : "negative"}>{diff >= 0 ? "+" : ""}{formatNumber(diff)}</td><td>{formatPercent(item.grossMargin)}</td><td className={item.lossRate >= .12 ? "negative" : ""}>{formatPercent(item.lossRate)}</td><td><span className={`july-compare-diagnosis ${item.tone}`}>{item.diagnosis}</span></td></tr>;
              })}</tbody>
            </table>
          </div>
        </article>

        <article className="july-compare-panel july-compare-category" id="august-compare-category">
          <div className="july-compare-panel-heading"><div><h2>品类维度｜销售额变化</h2><p>7月灰紫 / 8月紫色 · 人民币口径</p></div><Boxes size={20} /></div>
          <EChart option={categoryOption} height={245} />
          <div className="july-compare-category-deltas">{data.categories.map((item) => { const change = relativeChange(item.july, item.august) ?? 0; return <span key={item.name}><b>{item.name}</b><em className={change >= 0 ? "positive" : "negative"}>{formatRelativeChange(item.july, item.august)}</em></span>; })}</div>
        </article>
      </section>

      <section className="july-compare-bottom-grid">
        <article className="july-compare-panel july-compare-ad" id="august-compare-advertising">
          <div className="july-compare-panel-heading"><div><h2>广告维度｜投放规模与效率</h2><p>三店整体 · 韩元原始口径 · 图表按7月=100归一化</p></div><Megaphone size={20} /></div>
          <div className="july-compare-ad-metrics">{data.advertising.map((item, index) => { const change = adChange(item); const good = item.august >= item.july; return <div key={item.label}><span className={`ad-tone-${index}`}>{item.label}</span><p><small>7月</small>{adValue(item, item.july)}<ArrowRight size={13} /><small>8月</small>{adValue(item, item.august)}</p><b className={good ? "positive" : "negative"}>{change}</b></div>; })}</div>
          <EChart option={advertisingOption} height={220} />
        </article>

        <article className="july-compare-panel july-compare-store" id="august-compare-store">
          <div className="july-compare-panel-heading"><div><h2>店铺维度｜贡献与经营质量</h2><p>8月数据与相对7月变化并列展示</p></div><Store size={20} /></div>
          <div className="july-compare-store-table">
            <div className="store-head"><span>店铺</span><span>订单贡献</span><span>销售额</span><span>毛利率</span><span>退损率</span></div>
            {data.stores.map((item) => {
              const julyShare = item.julyOrders / totalJulyOrders;
              const augustShare = item.augustOrders / totalAugustOrders;
              const shareDiff = augustShare - julyShare;
              const revenueChange = relativeChange(item.julyRevenue, item.augustRevenue) ?? 0;
              const marginDiff = item.augustGrossMargin - item.julyGrossMargin;
              const lossDiff = item.augustLossRate - item.julyLossRate;
              return <div className="store-row" key={item.store}>
                <strong>{item.store}</strong>
                <StoreMetric value={formatPercent(augustShare)} diff={formatPp(shareDiff)} good={shareDiff >= 0} direction={shareDiff >= 0 ? "up" : "down"} progress={Math.min(100, (augustShare / .55) * 100)} />
                <StoreMetric value={formatCny(item.augustRevenue)} diff={formatRelativeChange(item.julyRevenue, item.augustRevenue)} good={revenueChange >= 0} direction={revenueChange >= 0 ? "up" : "down"} progress={(item.augustRevenue / maxRevenue) * 100} />
                <StoreMetric value={formatPercent(item.augustGrossMargin)} diff={formatPp(marginDiff)} good={marginDiff >= 0} direction={marginDiff >= 0 ? "up" : "down"} progress={Math.min(100, (item.augustGrossMargin / .45) * 100)} />
                <StoreMetric value={formatPercent(item.augustLossRate)} diff={formatPp(lossDiff)} good={lossDiff <= 0} direction={lossDiff >= 0 ? "up" : "down"} progress={Math.min(100, (item.augustLossRate / .2) * 100)} />
              </div>;
            })}
          </div>
        </article>
      </section>

      <section className="july-compare-insights">
        <div className="july-compare-insights-title"><BarChart3 size={20} /><div><h2>综合结论</h2><p>7月与8月经营变化的四项重点</p></div></div>
        <div className="july-compare-insight-grid">{data.insights.map((item, index) => {
          const InsightIcon = [ArrowDownRight, Boxes, Megaphone, Target][index] ?? ArrowUpRight;
          return <article className={item.tone} key={item.title}><span><InsightIcon size={23} /></span><div><h3>{item.title}</h3><p>{item.note}</p></div></article>;
        })}</div>
      </section>
    </div>
  );
}

function StoreMetric({ value, diff, good, direction, progress }: { value: string; diff: string; good: boolean; direction: "up" | "down"; progress: number }) {
  return <span className="july-compare-store-metric"><b>{value}</b><small className={good ? "positive" : "negative"}>{direction === "up" ? "▲" : "▼"} {diff}</small><i><em style={{ width: `${progress}%` }} /></i></span>;
}
