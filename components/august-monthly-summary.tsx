"use client";

import { CalendarDays, ChevronDown, Download, UserRound } from "lucide-react";

type SummaryMonth = "2026-06" | "2026-07" | "2026-08";

type AugustMonthlySummaryProps = {
  onMonthChange: (value: SummaryMonth) => void;
};

const summaryMetrics = [
  { label: "有效订单", value: "2,076" },
  { label: "收入", value: "¥223,400" },
  { label: "毛利润", value: "¥62,556" },
  { label: "毛利率", value: "28.0%" },
  { label: "退损率", value: "10.4%" },
] as const;

const actionGroups = [
  {
    title: "需要保持",
    tone: "keep",
    items: [
      "产品：稳住 8 月新放量的 1350593（木工钻头 327 单）与 1339579（护踝套 175 单）两个优质增量。",
      "品类：居家百货仍是销售基本盘，电子电器升至第二大类，继续稳住库存与排名。",
      "广告：保留跨境329和本土70的高效活动，整体 ROAS 提升到 508%。",
    ],
  },
  {
    title: "需要优化",
    tone: "optimize",
    items: [
      "产品：部分商品订单多但毛利偏低（木工钻头、除草机），后续不能只看出单量。",
      "品类：服饰 8 月缩量明显（收入 -74%），需检查价格、流量与库存。",
      "广告：8月27-28日ROAS出现异常尖峰，需排查是否为个别活动集中成交导致。",
    ],
  },
  {
    title: "需要改进",
    tone: "improve",
    items: [
      "产品：优先处理订单超 10 单且退损偏高的商品（如 1329536 摄像头退损17.65%）。",
      "品类：医药保健增速快但基数小，可以小幅放量测试。",
      "广告：清理高点击、低成交活动，避免为无效流量持续付费。",
    ],
  },
] as const;

export default function AugustMonthlySummary({ onMonthChange }: AugustMonthlySummaryProps) {
  return (
    <div className="july-summary-canvas">
      <header className="july-summary-header">
        <div className="july-summary-heading">
          <h1>樊锦栎｜2026年8月经营总结</h1>
          <p>一页纸管理摘要｜明细数据与趋势请结合线上数据网站查看</p>
        </div>

        <div className="july-summary-controls">
          <label className="july-summary-select">
            <CalendarDays size={16} aria-hidden="true" />
            <select
              aria-label="选择月度总结月份"
              value="2026-08"
              onChange={(event) => onMonthChange(event.target.value as SummaryMonth)}
            >
              <option value="2026-06">2026年6月</option>
              <option value="2026-07">2026年7月</option>
              <option value="2026-08">2026年8月</option>
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

      <section className="july-summary-kpis" aria-label="8月核心经营指标">
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
          <span>保住利润质量</span>
          <span>压降退损</span>
          <span>放大高效活动</span>
        </div>
      </section>

      <section className="july-summary-judgement-grid">
        <article className="july-summary-judgement overall">
          <h2>总体判断</h2>
          <p>
            8月订单和销量较7月明显回落（订单-26.8%、销量-32.2%），但毛利率逆势升至28.0%（+3.8pp），毛利润实现正增长（¥62,556，+6.0%），经营质量优于规模。退损率10.4%（+1.8pp）为主要隐忧，电子电器退损走高拉高了整体水平。广告效率显著提升（ROAS 508%，+43pp），广告费+13.3%换来转化销售额+28.8%，投放结构比7月更健康。
          </p>
        </article>
        <article className="july-summary-judgement conclusion">
          <h2>一句话结论</h2>
          <p>9月先压降退损（重点电子电器和高退损单品），稳住居家百货基本盘，把广告预算进一步集中到ROAS最高的跨境329活动上。</p>
        </article>
      </section>

      <section className="july-summary-actions" aria-label="8月经营行动建议">
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
        <strong>9月优先级：</strong>
        <span>①压降退损率至个位数　②稳住居家百货与电子电器　③控制低毛利商品放量　④广告预算向跨境329集中</span>
      </footer>
    </div>
  );
}
