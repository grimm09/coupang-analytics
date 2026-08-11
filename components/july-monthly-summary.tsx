"use client";

import { CalendarDays, ChevronDown, Download, UserRound } from "lucide-react";

type SummaryMonth = "2026-06" | "2026-07";

type JulyMonthlySummaryProps = {
  onMonthChange: (value: SummaryMonth) => void;
};

const summaryMetrics = [
  { label: "有效订单", value: "2,836" },
  { label: "收入", value: "¥243,902" },
  { label: "毛利润", value: "¥59,020" },
  { label: "毛利率", value: "24.2%" },
  { label: "退损率", value: "8.6%" },
] as const;

const actionGroups = [
  {
    title: "需要保持",
    tone: "keep",
    items: [
      "产品：保留本月已经稳定出单、毛利和退损表现较好的产品。",
      "品类：居家百货仍是主要销售来源，继续稳住库存、价格和排名。",
      "广告：保留跨境329和其他能够稳定出单的有效活动。",
    ],
  },
  {
    title: "需要优化",
    tone: "optimize",
    items: [
      "产品：部分商品订单不少但毛利偏低，后续不能只看出单量。",
      "品类：电子电器和医药保健下滑明显，需要检查价格、库存和流量。",
      "广告：减少预算分散，把费用集中到稳定转化的活动。",
    ],
  },
  {
    title: "需要改进",
    tone: "improve",
    items: [
      "产品：优先处理出单超过10单、同时退损偏高的商品。",
      "品类：美容个护保持增长，可以少量测试，不急于大规模扩充。",
      "广告：清理高点击、低成交活动，避免继续为无效流量付费。",
    ],
  },
] as const;

export default function JulyMonthlySummary({ onMonthChange }: JulyMonthlySummaryProps) {
  return (
    <div className="july-summary-canvas">
      <header className="july-summary-header">
        <div className="july-summary-heading">
          <h1>樊锦栎｜2026年7月经营总结</h1>
          <p>一页纸管理摘要｜明细数据与趋势请结合线上数据网站查看</p>
        </div>

        <div className="july-summary-controls">
          <label className="july-summary-select">
            <CalendarDays size={16} aria-hidden="true" />
            <select
              aria-label="选择月度总结月份"
              value="2026-07"
              onChange={(event) => onMonthChange(event.target.value as SummaryMonth)}
            >
              <option value="2026-06">2026年6月</option>
              <option value="2026-07">2026年7月</option>
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
          <button className="july-summary-scope" type="button" aria-label="当前口径：个人经营">
            <UserRound size={16} aria-hidden="true" />
            个人经营
            <ChevronDown size={15} aria-hidden="true" />
          </button>
          <button className="july-summary-export" type="button" onClick={() => window.print()}>
            <Download size={16} aria-hidden="true" />
            导出报告
          </button>
        </div>
      </header>

      <section className="july-summary-kpis" aria-label="7月核心经营指标">
        {summaryMetrics.map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="july-summary-focus" aria-label="本月经营方向">
        <h2>本月经营方向</h2>
        <div>
          <span>稳住核心品类</span>
          <span>压降退损</span>
          <span>提升广告效率</span>
        </div>
      </section>

      <section className="july-summary-judgement-grid">
        <article className="july-summary-judgement overall">
          <h2>总体判断</h2>
          <p>
            7月整体经营规模比6月有所回落，订单和销售额受到核心品类下滑影响。好的一面是退损率有所改善，部分新品和美容个护开始带来增量。广告带来的曝光和点击增长明显，但投入增长快于成交增长，下一步需要把重点从扩大流量转向筛选有效流量、稳定利润。
          </p>
        </article>
        <article className="july-summary-judgement conclusion">
          <h2>一句话结论</h2>
          <p>8月先稳住居家百货和优质产品，减少高退损、低毛利商品，再把广告预算集中到真正能够稳定出单的活动上。</p>
        </article>
      </section>

      <section className="july-summary-actions" aria-label="7月经营行动建议">
        {actionGroups.map((group) => (
          <article className={group.tone} key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <footer className="july-summary-priority">
        <strong>8月优先级：</strong>
        <span>①稳住核心销售品类　②处理高退损商品　③提升低毛利产品利润　④优化广告预算和转化</span>
      </footer>
    </div>
  );
}
