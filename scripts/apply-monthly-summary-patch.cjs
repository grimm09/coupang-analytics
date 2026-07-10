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
  const summaryCards = [
    { label: "展示范围", value: "2026年6月", note: "仅保留本月经营总结" },
    { label: "展示形式", value: "一页纸复盘", note: "适合汇报、归档、快速审核" },
    { label: "模块状态", value: "月度总结", note: "已替换原报告中心" },
  ];

  return (
    <div className="content-canvas monthly-summary-canvas">
      <section className="monthly-summary-hero">
        <div>
          <span className="summary-eyebrow">月度总结 · 2026年6月</span>
          <h2>樊锦栎 6月经营总结一页纸</h2>
          <p>当前入口已从“报告中心”调整为“月度总结”；页面只展示 6 月经营总结，不再展示其他月份报告中心内容。</p>
        </div>
        <div className="summary-actions">
          <span>JUNE SUMMARY</span>
        </div>
      </section>

      <section className="monthly-summary-panel">
        <div className="summary-card-grid">
          {summaryCards.map((item) => (
            <article key={item.label} className="summary-status-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
        <div className="summary-paper-placeholder">
          <div className="summary-paper-topline">
            <span>月度总结</span>
            <b>2026.06</b>
          </div>
          <h3>6月经营总结一页纸</h3>
          <p>这里用于承载最终版一页纸总结。当前版本已完成模块替换与导航命名，后续可继续接入 PDF 原稿预览/下载。</p>
          <div className="summary-paper-blocks">
            <div><b>经营表现</b><span>聚焦销售、订单、利润与退损复盘</span></div>
            <div><b>广告表现</b><span>聚焦三店铺广告投入、销售与 ROAS</span></div>
            <div><b>优化方向</b><span>保留高效策略，定位需要调整的投放与产品</span></div>
          </div>
        </div>
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

.monthly-summary-canvas { min-height: calc(100vh - 132px); display: grid; grid-template-rows: auto 1fr; gap: 16px; padding: 16px; background: linear-gradient(135deg, #f8f8ff 0%, #ffffff 48%, #f3f0ff 100%); border: 1px solid #ecebfb; }
.monthly-summary-hero { display: flex; justify-content: space-between; align-items: center; gap: 18px; padding: 22px 24px; border: 1px solid #ded9ff; border-radius: 22px; background: linear-gradient(135deg, #f3efff, #eef8ff); box-shadow: 0 10px 28px rgba(71,65,120,.06); }
.summary-eyebrow { display: inline-flex; margin-bottom: 10px; padding: 6px 12px; border-radius: 999px; background: rgba(118,85,246,.12); color: #5d3cda; font-size: 12px; font-weight: 950; }
.monthly-summary-hero h2 { margin: 0; color: #11162c; font-size: clamp(27px, 2.5vw, 38px); line-height: 1.05; font-weight: 950; letter-spacing: -.055em; }
.monthly-summary-hero p { max-width: 760px; margin: 10px 0 0; color: #676d82; font-size: 14px; line-height: 1.55; font-weight: 750; }
.summary-actions span { display: inline-flex; align-items: center; justify-content: center; height: 42px; padding: 0 15px; border-radius: 12px; color: #fff; background: linear-gradient(135deg, #7655f6, #6044db); font-size: 12px; font-weight: 950; box-shadow: 0 12px 24px rgba(118,85,246,.22); }
.monthly-summary-panel { display: grid; grid-template-rows: auto 1fr; gap: 16px; min-height: 650px; padding: 14px; border: 1px solid #e3e2ee; border-radius: 22px; background: rgba(255,255,255,.92); box-shadow: 0 10px 28px rgba(71,65,120,.055); }
.summary-card-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.summary-status-card { padding: 18px; border: 1px solid #e5e2f5; border-radius: 18px; background: #fff; }
.summary-status-card span { color: #7a7f93; font-size: 12px; font-weight: 850; }
.summary-status-card strong { display: block; margin-top: 8px; color: #171a30; font-size: 24px; font-weight: 950; letter-spacing: -.04em; }
.summary-status-card p { margin: 8px 0 0; color: #74798c; font-size: 13px; font-weight: 750; }
.summary-paper-placeholder { min-height: 520px; padding: clamp(26px, 4vw, 46px); border: 1px solid #e1def5; border-radius: 18px; background: linear-gradient(135deg, #ffffff 0%, #fbfaff 100%); display: flex; flex-direction: column; justify-content: center; }
.summary-paper-topline { display: flex; justify-content: space-between; align-items: center; color: #7655f6; font-size: 13px; font-weight: 950; letter-spacing: .08em; text-transform: uppercase; }
.summary-paper-placeholder h3 { margin: 26px 0 12px; color: #11162c; font-size: clamp(34px, 4vw, 58px); line-height: 1; font-weight: 950; letter-spacing: -.06em; }
.summary-paper-placeholder > p { max-width: 760px; margin: 0; color: #666c82; font-size: clamp(15px, 1.45vw, 18px); line-height: 1.7; font-weight: 750; }
.summary-paper-blocks { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 42px; }
.summary-paper-blocks div { padding: 18px; border-radius: 18px; background: #f4f1ff; border: 1px solid #dfd8ff; }
.summary-paper-blocks b { display: block; color: #4e36c7; font-size: 16px; font-weight: 950; }
.summary-paper-blocks span { display: block; margin-top: 8px; color: #62677b; font-size: 13px; line-height: 1.5; font-weight: 780; }
@media (max-width: 900px) { .monthly-summary-hero { align-items: flex-start; flex-direction: column; } .summary-card-grid, .summary-paper-blocks { grid-template-columns: 1fr; } }
`;
}

fs.writeFileSync(cssPath, css);
console.log("Applied monthly summary patch");
