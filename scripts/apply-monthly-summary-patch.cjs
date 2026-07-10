const fs = require("fs");
const path = require("path");

const dashboardPath = path.join(process.cwd(), "components", "dashboard.tsx");
const cssPath = path.join(process.cwd(), "app", "globals.css");

const replaceOnce = (source, from, to, label) => {
  if (source.includes(to)) return source;
  if (!source.includes(from)) {
    throw new Error(`Monthly summary patch pattern not found (${label}): ${from.slice(0, 140)}`);
  }
  return source.replace(from, to);
};

let dashboard = fs.readFileSync(dashboardPath, "utf8");

dashboard = replaceOnce(dashboard, '["报告中心", FileBarChart],', '["月度总结", FileBarChart],', "nav rename");
dashboard = replaceOnce(dashboard, 'const isReportCenter = activeSection === "报告中心";', 'const isReportCenter = activeSection === "月度总结";', "active section rename");
dashboard = replaceOnce(dashboard, 'isReportCenter ? "报告中心"', 'isReportCenter ? "月度总结"', "header title rename");
dashboard = replaceOnce(
  dashboard,
  'isReportCenter ? "月度经营复盘、模块报告导出与展示资料生成"',
  'isReportCenter ? "2026年6月经营总结一页纸"',
  "header subtitle rename",
);

if (!dashboard.includes('className="content-canvas monthly-summary-canvas"')) {
  const marker = 'function ReportCenterPage({ selectedMonth, monthLabel }: { selectedMonth: MonthKey; monthLabel: string }) {\n';
  const replacement = `function ReportCenterPage({ selectedMonth, monthLabel }: { selectedMonth: MonthKey; monthLabel: string }) {
  const metricCards = [
    { label: "有效订单", value: "3,727" },
    { label: "收入", value: "¥365,229" },
    { label: "毛利润", value: "¥94,622" },
    { label: "毛利率", value: "25.9%" },
    { label: "退损率", value: "9.1%" },
  ];

  return (
    <div className="content-canvas monthly-summary-canvas">
      <section className="summary-paper">
        <header className="summary-paper-header">
          <div>
            <h2><span>樊锦栎</span><em />2026年6月经营总结</h2>
            <p>一页纸管理摘要｜明细数据与趋势请结合线上数据网站查看</p>
          </div>
          <span className="summary-month-pill">2026.06</span>
        </header>

        <div className="summary-metric-grid">
          {metricCards.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>

        <section className="summary-progress-row">
          <h3>7月销售目标进度</h3>
          <div className="summary-progress-copy">已完成 ¥83,494 / 目标 ¥520,000 完成 16.1%</div>
          <div className="summary-progress-track"><span /></div>
        </section>

        <section className="summary-judgement-grid">
          <article className="summary-judgement good">
            <h3>总体判断</h3>
            <p>6月整体经营质量较好：毛利率25.9%，高于平台整体20.7%；但退损率9.1%，高于平台整体7.2%，利润优势仍需通过降低退损来巩固。收入排名约第16名，当前重点不是继续铺开明细，而是集中资源提升有效SKU和投放效率。</p>
          </article>
          <article className="summary-judgement note">
            <h3>一句话结论</h3>
            <p>保持高毛利和高ROAS项目，压降退损与负毛利SKU，把增长从“扩大数量”转向“提高质量”。</p>
          </article>
        </section>

        <section className="summary-action-grid">
          <article className="keep">
            <h3>需要保持</h3>
            <ul>
              <li>跨境329广告ROAS约691%，保持高效活动。</li>
              <li>居家百货收入占比约51%，退损率仅6.0%。</li>
              <li>保持整体毛利率优势，新品继续执行毛利率+退损率双筛选。</li>
            </ul>
          </article>
          <article className="optimize">
            <h3>需要优化</h3>
            <ul>
              <li>本土70优先扩大高毛利清洁类成熟SKU。</li>
              <li>本土88减少预算分散，集中到高转化活动。</li>
              <li>跨境296/295订单量偏低，先做SKU与流量整合。</li>
            </ul>
          </article>
          <article className="improve">
            <h3>需要改进</h3>
            <ul>
              <li>电子电器退损率12.6%，排查质量、包装与售后。</li>
              <li>服饰退损率14.8%，优化尺码表和主图预期管理。</li>
              <li>36个负毛利产品先处理，再决定是否继续扩量。</li>
            </ul>
          </article>
        </section>

        <footer className="summary-paper-footer">7月优先级：①降低退损率 ②清理负毛利SKU ③集中广告预算 ④在验证盈利后再扩大规模。广告数据依据6月广告截图汇总。</footer>
      </section>
    </div>
  );

`;
  dashboard = replaceOnce(dashboard, marker, replacement, "summary page replacement");
}

fs.writeFileSync(dashboardPath, dashboard);

let css = fs.readFileSync(cssPath, "utf8");
if (!css.includes(".monthly-summary-canvas")) {
  css += `

.monthly-summary-canvas { min-height: calc(100vh - 132px); padding: 18px; background: #f7f9fc; border: 1px solid #e8edf6; overflow: auto; }
.summary-paper { max-width: 1440px; min-height: 850px; margin: 0 auto; padding: clamp(34px, 4vw, 58px); background: #ffffff; color: #1f2d3d; border-radius: 18px; box-shadow: 0 16px 45px rgba(31, 45, 61, .08); border: 1px solid #d9e6f2; font-family: var(--font-geist-sans), "Microsoft YaHei", Arial, sans-serif; }
.summary-paper-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; margin-bottom: 28px; }
.summary-paper-header h2 { display: flex; align-items: baseline; gap: 18px; margin: 0; color: #214f7b; font-size: clamp(30px, 3.15vw, 44px); line-height: 1.08; font-weight: 500; letter-spacing: -.035em; }
.summary-paper-header h2 span { font-weight: 600; }
.summary-paper-header h2 em { width: 1px; height: .82em; background: #214f7b; display: inline-block; transform: translateY(5px); }
.summary-paper-header p { margin: 6px 0 0; color: #5e6d82; font-size: clamp(13px, 1.05vw, 16px); font-weight: 600; }
.summary-month-pill { flex: 0 0 auto; padding: 8px 14px; border: 1px solid #aac5dc; border-radius: 999px; color: #214f7b; background: #eef6fd; font-size: 13px; font-weight: 900; }
.summary-metric-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); border: 1.5px solid #214f7b; background: #d7e7f4; margin-bottom: 28px; }
.summary-metric-grid article { min-height: 82px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 1px solid rgba(33, 79, 123, .55); }
.summary-metric-grid article:last-child { border-right: 0; }
.summary-metric-grid span { color: #6a7787; font-size: clamp(13px, 1.05vw, 16px); font-weight: 700; }
.summary-metric-grid strong { margin-top: 8px; color: #214f7b; font-size: clamp(26px, 2.15vw, 36px); line-height: 1; font-weight: 500; letter-spacing: -.03em; }
.summary-progress-row { display: grid; grid-template-columns: 260px 1fr; align-items: center; column-gap: 48px; row-gap: 12px; margin: 0 auto 20px; max-width: 1260px; }
.summary-progress-row h3 { margin: 0; color: #214f7b; font-size: clamp(20px, 1.65vw, 27px); font-weight: 700; }
.summary-progress-copy { color: #1f2d3d; font-size: clamp(14px, 1.16vw, 18px); font-weight: 650; }
.summary-progress-track { grid-column: 1 / -1; height: 36px; margin-left: 40px; border: 1.5px solid #214f7b; background: #e8eef4; }
.summary-progress-track span { display: block; width: 16.1%; min-width: 168px; height: 100%; background: #214f7b; }
.summary-judgement-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1.5px solid #214f7b; margin: 18px auto 22px; max-width: 1260px; }
.summary-judgement { min-height: 122px; padding: 22px 26px; }
.summary-judgement.good { background: #e7f3de; border-right: 1px solid #214f7b; }
.summary-judgement.note { background: #dcecf8; }
.summary-judgement h3, .summary-action-grid h3 { margin: 0 0 10px; color: #395568; font-size: clamp(15px, 1.1vw, 18px); font-weight: 700; }
.summary-judgement p { margin: 0; color: #263644; font-size: clamp(15px, 1.13vw, 18px); line-height: 1.72; font-weight: 650; }
.summary-action-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border: 1.5px solid #214f7b; max-width: 1260px; margin: 0 auto 18px; }
.summary-action-grid article { min-height: 176px; padding: 22px 24px; border-right: 1px solid #214f7b; }
.summary-action-grid article:last-child { border-right: 0; }
.summary-action-grid .keep { background: #e6f2dc; }
.summary-action-grid .optimize { background: #fde7d6; }
.summary-action-grid .improve { background: #f5cdcf; }
.summary-action-grid ul { margin: 0; padding-left: 18px; color: #273541; font-size: clamp(14px, 1.08vw, 17px); line-height: 1.65; font-weight: 700; }
.summary-paper-footer { max-width: 1260px; margin: 0 auto; color: #6a7790; font-size: clamp(12px, .98vw, 15px); font-weight: 650; }
@media (max-width: 980px) {
  .summary-paper { padding: 24px; min-height: auto; }
  .summary-paper-header, .summary-judgement-grid, .summary-action-grid { grid-template-columns: 1fr; flex-direction: column; }
  .summary-metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .summary-metric-grid article { border-bottom: 1px solid rgba(33, 79, 123, .45); }
  .summary-progress-row { grid-template-columns: 1fr; row-gap: 10px; }
  .summary-progress-track { margin-left: 0; }
  .summary-judgement.good, .summary-action-grid article { border-right: 0; border-bottom: 1px solid #214f7b; }
  .summary-action-grid article:last-child { border-bottom: 0; }
}
`;
}

fs.writeFileSync(cssPath, css);
console.log("Applied monthly summary patch");
