"use client";

import { useMemo, useState } from "react";
import type { EChartsOption } from "echarts";
import {
  BarChart3,
  Bell,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ChartNoAxesCombined,
  ChevronDown,
  Download,
  Eye,
  FileBarChart,
  FileText,
  Layers2,
  LogOut,
  Megaphone,
  MousePointerClick,
  PackageSearch,
  PackageCheck,
  Percent,
  Search,
  ShieldAlert,
  ShoppingCart,
  Sparkles,
  Table2,
  Target,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import EChart from "./echart";
import { formatKrw, formatNumber, formatPercent } from "@/lib/format";
import { januaryCustomerPriceCny, januaryOverview } from "@/lib/january";
import { februaryCustomerPriceCny, februaryOverview } from "@/lib/february";
import { marchCustomerPriceCny, marchOverview } from "@/lib/march";
import { aprilCustomerPriceCny, aprilOverview } from "@/lib/april";
import { mayCustomerPriceCny, mayOverview } from "@/lib/may";
import { aprilProductAnalysis, februaryProductAnalysis, januaryProductAnalysis, marchProductAnalysis, mayProductAnalysis, type ProductAnalysisItem } from "@/lib/product-analysis";
import { categoryPalette, januaryCategoryAnalysis, type CategoryAnalysisItem } from "@/lib/category-analysis";
import { februaryCategoryAnalysis } from "@/lib/category-analysis-february";
import { marchCategoryAnalysis } from "@/lib/category-analysis-march";
import { aprilCategoryAnalysis } from "@/lib/category-analysis-april";
import { mayCategoryAnalysis } from "@/lib/category-analysis-may";
import { adInsightCards, februaryAdAnalysis, januaryAdAnalysis, marchAdAnalysis } from "@/lib/ad-analysis";
import { aprilAdAnalysis } from "@/lib/ad-analysis-april";
import { mayAdAnalysis } from "@/lib/ad-analysis-may";
import { monthCompare, monthCompareFebruary, monthCompareMarch, type MonthMetric } from "@/lib/month-compare";
import { monthCompareApril } from "@/lib/month-compare-april";
import { monthCompareMay } from "@/lib/month-compare-may";

const navItems = [
  ["经营总览", ChartNoAxesCombined],
  ["产品分析", PackageCheck],
  ["品类分析", Layers2],
  ["广告分析", Megaphone],
  ["月度对比", BarChart3],
  ["报告中心", FileBarChart],
] as const;

type MonthKey = "2026-01" | "2026-02" | "2026-03" | "2026-04" | "2026-05";

const monthOptions: { key: MonthKey; label: string; shortLabel: string }[] = [
  { key: "2026-01", label: "2026年1月", shortLabel: "1月" },
  { key: "2026-02", label: "2026年2月", shortLabel: "2月" },
  { key: "2026-03", label: "2026年3月", shortLabel: "3月" },
  { key: "2026-04", label: "2026年4月", shortLabel: "4月" },
  { key: "2026-05", label: "2026年5月", shortLabel: "5月" },
];

const januaryCategoryComparisonRows = [
  ["居家百货", 1086, 0.1743835139164444, 18560, 0.18283582738455506],
  ["服饰", 307, 0.033333171656342836, 3197, 0.14485303654641002],
  ["美容个护", 337, 0.20753322388211523, 6289, 0.20797166880084017],
  ["电子电器", 154, 0.18630100339840353, 4012, 0.17516105821451838],
  ["医药保健", 112, 0.16186384783104665, 6775, 0.09792012263677327],
  ["鞋类", 79, 0.08522378457101526, 996, 0.10558217144355644],
  ["包类", 89, 0.2843544906579889, 224, 0.10875151083600106],
] as const;

const februaryCategoryComparisonRows = [
  ["居家百货", 548, 0.2653517350268507, 14098, 0.1889990709020308],
  ["包类", 183, 0.2699373755000949, 1522, 0.1860065695864563],
  ["服饰", 178, 0.241471408854523, 2049, 0.1604885330785162],
  ["电子电器", 148, 0.1531265476892076, 3844, 0.1937526010906242],
  ["美容个护", 207, 0.2194468297337447, 5342, 0.1944397215582387],
  ["鞋类", 35, 0.2580664891759366, 661, 0.1621728611192575],
  ["医药保健", 14, 0.2421708284235505, 3156, 0.1230597568390015],
  ["母婴玩具", 5, 0.3322581292480361, 41, 0.1742782811055924],
  ["钟表珠宝", 3, 0.3581094059791958, 85, 0.3007535370320319],
] as const;

const marchCategoryComparisonRows = [
  ["居家百货", 1915, 0.21356134403592955, 15772, 0.17925021694776647],
  ["服饰", 365, 0.2004713486201005, 4486, 0.14552085447739208],
  ["电子电器", 263, 0.1557324574959454, 5684, 0.1236076991109006],
  ["美容个护", 206, 0.15860567042219173, 6576, 0.17404577217909165],
  ["医药保健", 73, 0.14304185488636384, 2765, 0.14110760410815187],
  ["包类", 27, 0.15116053091459122, 2910, 0.05731648731520908],
  ["鞋类", 23, 0.16651995642651884, 2813, 0.1608402652387427],
  ["钟表珠宝", 7, 0.25109056640933425, 244, 0.23420512784895609],
] as const;

const aprilCategoryComparisonRows = [
  ["居家百货", 1299, 0.22154389970331573, 22822, 0.20197645352766339],
  ["服饰", 460, 0.1883519127743348, 6409, 0.15314662282644145],
  ["美容个护", 191, 0.1049065794336077, 3215, 0.23383455596243358],
  ["电子电器", 97, 0.20295277858850613, 6846, 0.18307924833206168],
  ["医药保健", 78, 0.18445622288108973, 1761, 0.1621953689975366],
  ["鞋类", 30, 0.15320922934063796, 3921, 0.16721005956093163],
  ["钟表珠宝", 17, 0.28811703321241783, 406, 0.3211350291072268],
  ["包类", 12, 0.06719413893301737, 3539, 0.1462342857244417],
  ["母婴玩具", 3, -0.031787090678590625, 167, 0.16971825468858642],
] as const;

const mayCategoryComparisonRows = [
  ["居家百货", 3128, 0.19454095848060344, 42066, 0.17769357662928243],
  ["服饰", 651, 0.05500389785880904, 10744, 0.07024115853676183],
  ["电子电器", 210, 0.17938848676835234, 14493, 0.17697309993255524],
  ["医药保健", 79, 0.20175233932781062, 1733, 0.1986724981488789],
  ["鞋类", 58, 0.1365089252168892, 6871, 0.17510071043807032],
  ["美容个护", 52, 0.2195342971184272, 2085, 0.2338441387615506],
  ["钟表珠宝", 21, 0.25131440872531986, 401, 0.29065227013535495],
  ["包类", 7, 0.2204024058455639, 3203, 0.20925692430288415],
  ["母婴玩具", 2, 0.1676034938316405, 506, 0.14333256176932708],
] as const;

const categoryComparisonRowsByMonth = {
  "2026-01": januaryCategoryComparisonRows,
  "2026-02": februaryCategoryComparisonRows,
  "2026-03": marchCategoryComparisonRows,
  "2026-04": aprilCategoryComparisonRows,
  "2026-05": mayCategoryComparisonRows,
} as const;

const formatCny = (value: number) => `¥${new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 }).format(value)}`;
const formatSignedCny = (value: number) => `${value >= 0 ? "+" : "-"}¥${new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 }).format(Math.abs(value))}`;
const formatMonthKeyLabel = (value: string) => {
  if (!value.includes("-")) return value;
  const [year, month] = value.split("-");
  return `${year}年${Number(month)}月`;
};

const reportTrendHistory = [
  { key: "2025-12", label: "12月", sales: 226_237, orders: 2_495 },
  { key: "2026-01", label: "1月", sales: 183_569.793903, orders: 2_186 },
  { key: "2026-02", label: "2月", sales: 121_012.630312, orders: 1_321 },
  { key: "2026-03", label: "3月", sales: 227_890.716977, orders: 2_879 },
  { key: "2026-04", label: "4月", sales: 194_562.604428, orders: 2_187 },
  { key: "2026-05", label: "5月", sales: 315_632.150955, orders: 4_208 },
] as const;
const latestReportTrend = reportTrendHistory.slice(-6);

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<(typeof navItems)[number][0]>("经营总览");
  const [siteUnlocked, setSiteUnlocked] = useState(true);
  const [sitePassword, setSitePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<MonthKey>("2026-05");
  const monthMeta = monthOptions.find((item) => item.key === selectedMonth) ?? monthOptions[4];
  const overviewData = selectedMonth === "2026-05" ? mayOverview : selectedMonth === "2026-04" ? aprilOverview : selectedMonth === "2026-03" ? marchOverview : selectedMonth === "2026-02" ? februaryOverview : januaryOverview;
  const overviewCustomerPriceCny = selectedMonth === "2026-05" ? mayCustomerPriceCny : selectedMonth === "2026-04" ? aprilCustomerPriceCny : selectedMonth === "2026-03" ? marchCustomerPriceCny : selectedMonth === "2026-02" ? februaryCustomerPriceCny : januaryCustomerPriceCny;
  const selectedAdAnalysis = selectedMonth === "2026-05" ? { store: mayOverview.advertising.store, dateRange: mayOverview.advertising.period, sourceNote: mayOverview.advertising.source } : selectedMonth === "2026-04" ? { store: aprilOverview.advertising.store, dateRange: aprilOverview.advertising.period, sourceNote: aprilOverview.advertising.source } : selectedMonth === "2026-03" ? marchAdAnalysis : selectedMonth === "2026-02" ? februaryAdAnalysis : januaryAdAnalysis;
  const categoryComparisonRows = categoryComparisonRowsByMonth[selectedMonth];
  const { personal, platform, advertising } = overviewData;
  const isReportCenter = activeSection === "报告中心";

  const structureOption = useMemo<EChartsOption>(() => ({
    animationDuration: 700,
    color: ["#7655f6", "#18b9c4"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (value) => formatPercent(Number(value), 1) },
    legend: { top: 0, left: 0, itemWidth: 9, itemHeight: 9, textStyle: { color: "#777a92", fontSize: 11 } },
    grid: { left: 12, right: 16, top: 42, bottom: 12, containLabel: true },
    xAxis: { type: "value", max: 40, axisLabel: { color: "#9a9daf", formatter: "{value}%" }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
    yAxis: { type: "category", data: ["毛利率", "广告占比", "采购成本占比", "物流成本占比", "退损率"], axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: "#55596d" } },
    series: [
      { name: "个人", type: "bar", barWidth: 10, itemStyle: { borderRadius: 6 }, data: [personal.grossMargin, personal.advertisingShare, personal.purchaseShare, personal.logisticsShare, personal.lossRate].map((v) => v * 100) },
      { name: "平台", type: "bar", barWidth: 10, itemStyle: { borderRadius: 6 }, data: [platform.grossMargin, platform.advertisingShare, platform.purchaseShare, platform.logisticsShare, platform.lossRate].map((v) => v * 100) },
    ],
  }), [personal, platform]);

  const categoryOption = useMemo<EChartsOption>(() => ({
    color: ["#7655f6", "#18b9c4", "#ff7186", "#f5b746", "#91d36f", "#8fa9ff", "#c5a5ef", "#d6d8e8"],
    tooltip: { trigger: "item", formatter: "{b}<br/>{d}%" },
    legend: { bottom: 0, left: "center", itemWidth: 8, itemHeight: 8, textStyle: { fontSize: 8, color: "#777a92" } },
    series: [
      { name: "个人品类", type: "pie", radius: ["42%", "64%"], center: ["25%", "43%"], label: { show: false }, data: [...overviewData.personalCategories] },
      { name: "平台品类", type: "pie", radius: ["42%", "64%"], center: ["75%", "43%"], label: { show: false }, data: [...overviewData.platformCategories] },
    ],
    graphic: [
      { type: "text", left: "21%", top: "39.5%", style: { text: "个人品类", fill: "#575b6f", fontSize: 10, fontWeight: 700 } },
      { type: "text", left: "71%", top: "39.5%", style: { text: "平台品类", fill: "#575b6f", fontSize: 10, fontWeight: 700 } },
    ],
  }), [overviewData.personalCategories, overviewData.platformCategories]);

  const kpis = [
    ["有效订单量", formatNumber(personal.orders), ShoppingCart, "violet", "Excel · 个人品类"],
    ["销售额", formatCny(personal.revenueCny), Boxes, "cyan", "Excel · 收入合计"],
    ["客单价", formatCny(overviewCustomerPriceCny), WalletCards, "cyan", "销售额 ÷ 订单量"],
    ["退损率", formatPercent(personal.lossRate * 100, 2), TrendingDown, "coral", `平台 ${formatPercent(platform.lossRate * 100, 2)}`],
    ["毛利率", formatPercent(personal.grossMargin * 100, 2), TrendingUp, "violet", `毛利润 ${formatCny(personal.grossProfit)}`],
  ] as const;

  const costMetrics = [
    ["物流成本占比", personal.logisticsShare],
    ["采购成本占比", personal.purchaseShare],
    ["广告花费占比", personal.advertisingShare],
    ["平台佣金占比", personal.commissionShare],
    ["VAT金额占比", personal.vatShare],
    ["毛利率", personal.grossMargin],
  ] as const;

  const adMetrics = [
    ["总销售额", formatKrw(advertising.totalSalesKrw), "广告后台总销售额"],
    ["广告转化销售额", formatKrw(advertising.adSalesKrw), `占总销售额 ${formatPercent(advertising.adSalesRatio * 100, 1)}`],
    ["广告费", formatKrw(advertising.adSpendKrw), "图片识别 · 广告消耗"],
    ["ROAS", formatPercent(advertising.roas, 2), "广告支出回报率"],
    ["曝光量", `${formatNumber(advertising.impressions)} 次`, `CTR ${formatPercent(advertising.ctr * 100, 2)}`],
    ["点击量", `${formatNumber(advertising.clicks)} 次`, `CPC ${formatKrw(advertising.cpcKrw)}`],
    ["广告转化订单", `${formatNumber(advertising.adOrders)} 次`, `CVR ${formatPercent(advertising.cvr * 100, 1)}`],
    ["转化销量", `${formatNumber(advertising.conversions)} 次`, advertising.store],
  ];

  if (!siteUnlocked) {
    return (
      <div className="password-page">
        <form
          className="password-card"
          onSubmit={(event) => {
            event.preventDefault();
            if (sitePassword === "527205109") {
              window.sessionStorage.setItem("coupang-site-unlocked", "yes");
              setSiteUnlocked(true);
              setPasswordError("");
            } else {
              setPasswordError("密码不正确，请重新输入");
            }
          }}
        >
          <div className="password-logo">JY</div>
          <h1>Coupang.JY 经营分析</h1>
          <p>请输入访问密码后查看经营数据看板</p>
          <input
            type="password"
            value={sitePassword}
            onChange={(event) => setSitePassword(event.target.value)}
            placeholder="请输入密码"
            autoFocus
          />
          {passwordError ? <span>{passwordError}</span> : null}
          <button type="submit">进入网站</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img className="brand-logo-image" src="/coupang-header-logo.svg" alt="coupang" />
          <span className="brand-suffix">.JY</span>
        </div>
        <nav>{navItems.map(([label, Icon]) => <button key={label} onClick={() => setActiveSection(label)} className={activeSection === label ? "nav-active" : ""}><Icon size={18} /><span>{label}</span></button>)}</nav>
        <button className="logout"><LogOut size={18} />退出登录</button>
      </aside>

      <main>
        <header className={isReportCenter ? "topbar report-topbar" : "topbar"}>
        <div className="greeting"><h1>{activeSection === "产品分析" ? `${monthMeta.shortLabel}产品分析` : activeSection === "品类分析" ? `${monthMeta.shortLabel}品类分析` : activeSection === "广告分析" ? `${monthMeta.shortLabel}广告整体分析` : activeSection === "月度对比" ? selectedMonth === "2026-05" ? "月度对比：2026年4月 vs 2026年5月" : selectedMonth === "2026-04" ? "月度对比：2026年3月 vs 2026年4月" : selectedMonth === "2026-03" ? "月度对比：2026年2月 vs 2026年3月" : selectedMonth === "2026-02" ? "月度对比：2026年1月 vs 2026年2月" : "月度对比：2025年12月 vs 2026年1月" : isReportCenter ? "报告中心" : `${monthMeta.shortLabel}经营总览`}</h1><p>{activeSection === "产品分析" ? "产品销售、店铺出单、毛利与异常预警" : activeSection === "品类分析" ? "个人品类经营与平台大盘对照" : activeSection === "广告分析" ? `${selectedAdAnalysis.store} · ${selectedAdAnalysis.dateRange} · ${selectedAdAnalysis.sourceNote}` : activeSection === "月度对比" ? "个人产品口径 · 销售额与利润统一显示人民币符号" : isReportCenter ? "月度经营复盘、模块报告导出与展示资料生成" : "个人经营数据与平台整体数据对照"}</p></div>
          <button className="scope-button">个人经营 <ChevronDown size={15} /></button>
          <label className="date-button month-select"><CalendarDays size={15} /><select value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value as MonthKey)} aria-label="选择月份">{monthOptions.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select><ChevronDown size={15} /></label>
          <label className="search-box"><Search size={16} /><input aria-label="搜索" placeholder={activeSection === "产品分析" ? "搜索产品名称、产品ID、店铺" : activeSection === "广告分析" ? "搜索时间段、指标" : "搜索商品、品类、SKU"} /></label>
          <button className="icon-button" aria-label="通知"><Bell size={18} /></button>
          <span className="avatar">JY</span>
        </header>

      {activeSection === "产品分析" ? <ProductAnalysisPage selectedMonth={selectedMonth} monthLabel={monthMeta.shortLabel} /> : activeSection === "品类分析" ? <CategoryAnalysisPage selectedMonth={selectedMonth} monthLabel={monthMeta.shortLabel} /> : activeSection === "广告分析" ? <AdAnalysisPage selectedMonth={selectedMonth} monthLabel={monthMeta.shortLabel} /> : activeSection === "月度对比" ? <MonthCompareVisualPage selectedMonth={selectedMonth} /> : isReportCenter ? <ReportCenterPage selectedMonth={selectedMonth} monthLabel={monthMeta.shortLabel} /> : <div className="content-canvas overview-canvas">
          <section className="kpi-row">{kpis.map(([label, value, Icon, tone, note]) => <article className="kpi-card" key={label}><span className={`kpi-icon ${tone}`}><Icon size={21} /></span><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></article>)}</section>

          <section className="analytics-row">
            <article className="panel chart-panel"><div className="panel-heading"><div><h2>{monthMeta.shortLabel}经营结构</h2><p>个人与平台成本、退损和毛利结构对比</p></div><span className="data-source">Excel真实数据</span></div><EChart option={structureOption} height={290} /></article>
            <article className="panel category-panel"><div className="panel-heading"><div><h2>个人品类 / 平台品类</h2><p>按收入合计计算品类占比</p></div></div><EChart option={categoryOption} height={292} /></article>
          </section>

          <section className="panel advertising-panel"><div className="panel-heading"><div><h2>成本与毛利指标</h2><p>个人{monthMeta.shortLabel}经营成本结构</p></div></div><div className="metric-rail">{costMetrics.map(([label, value], index) => <div key={label}><span className={`metric-icon tone-${index % 3}`}>{index === 5 ? <TrendingUp size={17} /> : <Sparkles size={17} />}</span><div><span>{label}</span><strong>{formatPercent(value * 100, 2)}</strong><small>{index < 3 ? `平台 ${formatPercent([platform.logisticsShare, platform.purchaseShare, platform.advertisingShare][index] * 100, 2)}` : "个人Excel口径"}</small></div></div>)}</div></section>

          <section className="panel advertising-panel"><div className="panel-heading"><div><h2>{monthMeta.shortLabel}广告后台表现</h2><p>{advertising.store} · {advertising.period} · 图片识别数据</p></div></div><div className="metric-rail">{adMetrics.map(([label, value, helper], index) => <div key={label}><span className={`metric-icon tone-${index % 3}`}>{index % 2 ? <Megaphone size={17} /> : <Sparkles size={17} />}</span><div><span>{label}</span><strong>{value}</strong><small>{helper}</small></div></div>)}</div></section>

          <section className="panel category-table"><div className="panel-heading"><div><h2>品类对比明细</h2><p>个人与平台品类订单及毛利率</p></div></div><div className="table-wrap"><table><thead><tr><th>品类</th><th>个人订单量</th><th>个人毛利率</th><th>平台订单量</th><th>平台毛利率</th></tr></thead><tbody>{categoryComparisonRows.map(([name, personalOrders, personalMargin, platformOrders, platformMargin]) => <tr key={name}><td>{name}</td><td>{formatNumber(personalOrders)}</td><td>{formatPercent(personalMargin * 100, 2)}</td><td>{formatNumber(platformOrders)}</td><td>{formatPercent(platformMargin * 100, 2)}</td></tr>)}</tbody></table></div></section>
        </div>}
      </main>
    </div>
  );
}

function ReportCenterPage({ selectedMonth, monthLabel }: { selectedMonth: MonthKey; monthLabel: string }) {
  const overview = selectedMonth === "2026-05" ? mayOverview : selectedMonth === "2026-04" ? aprilOverview : selectedMonth === "2026-03" ? marchOverview : selectedMonth === "2026-02" ? februaryOverview : januaryOverview;
  const customerPriceCny = selectedMonth === "2026-05" ? mayCustomerPriceCny : selectedMonth === "2026-04" ? aprilCustomerPriceCny : selectedMonth === "2026-03" ? marchCustomerPriceCny : selectedMonth === "2026-02" ? februaryCustomerPriceCny : januaryCustomerPriceCny;
  const compareData = selectedMonth === "2026-05" ? monthCompareMay : selectedMonth === "2026-04" ? monthCompareApril : selectedMonth === "2026-03" ? monthCompareMarch : selectedMonth === "2026-02" ? monthCompareFebruary : monthCompare;
  const { personal } = overview;
  const reportMonthLabel = overview.month;
  const previousMonthLabel = selectedMonth === "2026-05" ? "2026年4月" : selectedMonth === "2026-04" ? "2026年3月" : selectedMonth === "2026-03" ? "2026年2月" : selectedMonth === "2026-02" ? "2026年1月" : "2025年12月";
  const salesMom = compareData.personalKpis.find((item) => item.label === "收入合计")?.mom ?? 0;
  const orderMom = compareData.personalKpis.find((item) => item.label === "有效订单量")?.mom ?? 0;
  const marginDiff = compareData.personalKpis.find((item) => item.label === "毛利率")?.diff ?? 0;
  const riskItems = selectedMonth === "2026-03" ? 6 : selectedMonth === "2026-02" ? 5 : 8;
  const formatCnyCompact = (value: number) => `¥${(value / 10000).toFixed(1)}万`;
  const reportKpis = [
    ["可生成报告", "5份", FileBarChart, "violet", "已接入模块报告"],
    ["当前月份", reportMonthLabel, CalendarDays, "blue", "数据已更新"],
    ["销售额", formatCnyCompact(personal.revenueCny), WalletCards, "cyan", `较上月 ${salesMom >= 0 ? "+" : ""}${formatPercent(salesMom * 100, 2)} ${salesMom >= 0 ? "↑" : "↓"}`],
    ["订单量", formatNumber(personal.orders), ShoppingCart, "orange", `较上月 ${orderMom >= 0 ? "+" : ""}${formatPercent(orderMom * 100, 2)} ${orderMom >= 0 ? "↑" : "↓"}`],
    ["毛利率", formatPercent(personal.grossMargin * 100, 2), Percent, "green", `较上月 ${marginDiff >= 0 ? "+" : ""}${(marginDiff * 100).toFixed(2)}pp ${marginDiff >= 0 ? "↑" : "↓"}`],
    ["风险项", `${riskItems}项`, ShieldAlert, "red", selectedMonth === "2026-03" ? "收入回升，关注成本占比" : selectedMonth === "2026-02" ? "退损改善，关注下滑品" : "较上月 +2项 ↗"],
  ] as const;

  const reportTypes = [
    ["月度经营报告", "经营总览、成本结构、品类 & 平台对比等", FileText, "violet"],
    ["产品分析报告", "产品销售、利润、退损、排名与异常分析", Boxes, "purple"],
    ["品类分析报告", "品类销售、毛利、退损、成本与出单对比", PieReportIcon, "cyan"],
    ["广告分析报告", "广告投放表现、ROAS、转化与异常分析", Megaphone, "blue"],
    ["月度对比报告", "双月对比、环比变化、成本结构对比等", TrendingUp, "coral"],
  ] as const;

  const previewKpis = [
    ["订单量", formatNumber(personal.orders), ShoppingCart, "orange"],
    ["销售额", formatCnyCompact(personal.revenueCny), WalletCards, "cyan"],
    ["商品数", formatNumber(personal.units), Boxes, "violet"],
    ["客单价", formatCny(customerPriceCny), FileBarChart, "purple"],
    ["退损率", formatPercent(personal.lossRate * 100, 2), TrendingDown, "coral"],
    ["毛利率", formatPercent(personal.grossMargin * 100, 2), Percent, "green"],
  ] as const;

  const previewTrend = useMemo<EChartsOption>(() => ({
    color: ["#7058f5", "#13b9c7"],
    tooltip: { trigger: "axis" },
    legend: { top: 0, left: "center", itemWidth: 9, itemHeight: 9, textStyle: { color: "#6f7285", fontSize: 11 } },
    grid: { left: 30, right: 12, top: 34, bottom: 24, containLabel: true },
    xAxis: { type: "category", data: latestReportTrend.map((item) => item.label), axisTick: { show: false }, axisLine: { lineStyle: { color: "#e3e5f2" } }, axisLabel: { color: "#73778a", fontSize: 11 } },
    yAxis: { type: "value", axisLabel: { color: "#9a9daf", formatter: (value) => `¥${Math.round(Number(value) / 10000)}万` }, splitLine: { lineStyle: { color: "#edf0f8", type: "dashed" } } },
    series: [
      { name: "销售额（¥）", type: "bar", barWidth: 14, itemStyle: { borderRadius: [8, 8, 0, 0] }, data: latestReportTrend.map((item) => item.sales) },
      { name: "订单量", type: "line", smooth: true, symbolSize: 6, yAxisIndex: 0, lineStyle: { width: 2 }, data: latestReportTrend.map((item) => item.orders) },
    ],
  }), [latestReportTrend]);

  const previewCategory = useMemo<EChartsOption>(() => ({
    color: ["#7655f6", "#18b9c4"],
    tooltip: { trigger: "item", formatter: "{b}<br/>{d}%" },
    legend: { bottom: 0, left: "center", itemWidth: 8, itemHeight: 8, textStyle: { color: "#74778d", fontSize: 11 } },
    series: [
      { type: "pie", radius: ["54%", "76%"], center: ["50%", "43%"], label: { show: false }, data: [
        { name: "个人产品", value: selectedMonth === "2026-03" ? 63.2 : selectedMonth === "2026-02" ? 39.5 : 56.8 },
        { name: "平台整体", value: selectedMonth === "2026-03" ? 36.8 : selectedMonth === "2026-02" ? 60.5 : 43.2 },
      ] },
    ],
    graphic: [
      { type: "text", left: "center", top: "36%", style: { text: selectedMonth === "2026-03" ? "63.2%" : selectedMonth === "2026-02" ? "39.5%" : "56.8%", fill: "#1f2238", fontSize: 18, fontWeight: 900 } },
      { type: "text", left: "center", top: "48%", style: { text: "个人产品", fill: "#777b91", fontSize: 11, fontWeight: 700 } },
    ],
  }), [selectedMonth]);

  const exportChecks = ["封面", "核心KPI", "经营总览", "产品分析", "品类分析", "广告分析", "月度对比", "自动结论"];
  const historyRows = [
    [`${reportMonthLabel}经营复盘报告`, reportMonthLabel, "月度经营报告", "个人产品", "全部店铺", selectedMonth === "2026-02" ? "2026-06-29 16:20" : "2026-06-26 10:35"],
    [`${reportMonthLabel}产品分析报告`, reportMonthLabel, "产品分析报告", "个人产品", "全部店铺", selectedMonth === "2026-02" ? "2026-06-29 16:12" : "2026-06-26 10:28"],
    [`${reportMonthLabel}广告分析报告`, reportMonthLabel, "广告分析报告", "个人产品", "全部店铺", selectedMonth === "2026-02" ? "2026-06-29 16:05" : "2026-06-26 10:20"],
  ] as const;

  return (
    <div className="content-canvas report-center-canvas">
      <section className="report-filter-bar">
        <label><span>报告月份</span><button><CalendarDays size={16} />{reportMonthLabel}<ChevronDown size={15} /></button></label>
        <label><span>店铺</span><button>全部店铺<ChevronDown size={15} /></button></label>
        <label><span>数据口径</span><button>个人产品<ChevronDown size={15} /></button></label>
        <label><span>报告类型</span><button>月度经营报告<ChevronDown size={15} /></button></label>
        <button className="report-generate"><FileBarChart size={18} />生成报告</button>
      </section>

      <section className="report-kpi-grid">
        {reportKpis.map(([label, value, Icon, tone, note]) => (
          <article className="report-kpi-card" key={label}>
            <span className={`report-kpi-icon ${tone}`}><Icon size={24} /></span>
            <div><p>{label}</p><strong>{value}</strong><small className={note.includes("-") || note.includes("+") ? "risk-note" : ""}>{note}</small></div>
          </article>
        ))}
      </section>

      <section className="report-type-grid">
        {reportTypes.map(([title, desc, Icon, tone]) => (
          <article className="report-type-card" key={title}>
            <span className={`report-type-icon ${tone}`}><Icon size={25} /></span>
            <div><h3>{title}</h3><p>{desc}</p><em><CheckCircle2 size={13} />已接入</em></div>
          </article>
        ))}
      </section>

      <section className="report-main-grid">
        <article className="panel report-preview-panel">
          <div className="report-preview-head">
            <div><h2>{reportMonthLabel} Coupang.JY 经营复盘报告</h2></div>
            <div className="report-preview-tags"><span>个人产品</span><span>全部店铺</span><span><CalendarDays size={13} />{reportMonthLabel}</span></div>
          </div>
          <div className="report-preview-kpis">
            {previewKpis.map(([label, value, Icon, tone]) => (
              <div key={label}><span className={`mini-report-icon ${tone}`}><Icon size={16} /></span><p>{label}</p><strong>{value}</strong></div>
            ))}
          </div>
          <div className="report-preview-content">
            <div className="preview-chart-card"><h3>销售额趋势（近6个月）</h3><EChart option={previewTrend} height={184} /></div>
            <div className="preview-chart-card"><h3>品类销售额占比（个人 vs 平台）</h3><EChart option={previewCategory} height={184} /></div>
            <div className="preview-conclusion-card">
              <h3>自动结论（本月重点）</h3>
              <ol>
                <li><b>1</b><span>{monthLabel}销售额为 {formatCnyCompact(personal.revenueCny)}，订单量 {formatNumber(personal.orders)}。</span></li>
                <li><b>2</b><span>毛利率为 {formatPercent(personal.grossMargin * 100, 2)}，较{previousMonthLabel} {marginDiff >= 0 ? "提升" : "下降"} {Math.abs(marginDiff * 100).toFixed(2)}pp。</span></li>
                <li><b>3</b><span>退损率为 {formatPercent(personal.lossRate * 100, 2)}，{selectedMonth === "2026-03" ? "退损继续改善，但物流和广告占比需关注。" : selectedMonth === "2026-02" ? "退损已有明显改善。" : "退损复盘为重点。"}</span></li>
                <li><b>4</b><span>广告占比为 {formatPercent(personal.advertisingShare * 100, 2)}，广告效率需持续优化。</span></li>
              </ol>
            </div>
          </div>
        </article>

        <aside className="report-side-stack">
          <article className="panel export-panel">
            <h2>导出设置</h2>
            <div className="export-check-grid">{exportChecks.map((item) => <label key={item}><input type="checkbox" checked readOnly />{item}</label>)}</div>
            <div className="export-actions">
              <button><Download size={17} />导出 PDF</button>
              <button className="png"><FileText size={17} />导出 PNG</button>
              <button className="sheet"><Table2 size={17} />导出数据表</button>
            </div>
          </article>
          <article className="panel matplotlib-card">
            <div>
              <h2>Matplotlib 月报预留</h2>
              <p>生成更适合展示的静态图表，用于月度展示与汇报资料。</p>
              <button>生成 Matplotlib 图表</button>
            </div>
            <div className="matplotlib-preview">
              <span className="line" />
              <span className="donut" />
              <span className="bars"><i /><i /><i /><i /></span>
            </div>
          </article>
        </aside>
      </section>

      <section className="panel history-panel">
        <div className="panel-heading"><div><h2>历史报告</h2></div></div>
        <div className="table-wrap">
          <table className="report-history-table">
            <thead><tr><th>报告名称</th><th>报告月份</th><th>报告类型</th><th>数据口径</th><th>店铺</th><th>生成时间</th><th>状态</th><th>操作</th></tr></thead>
            <tbody>{historyRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => <td key={cell}>{cell}</td>)}
                <td><span className="generated-status">已生成</span></td>
                <td><button className="preview-link">预览</button><button className="download-link">下载</button><button className="more-link">•••</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <button className="more-history">查看更多历史报告 <ChevronDown size={14} /></button>
      </section>
    </div>
  );
}

function PieReportIcon({ size = 24 }: { size?: number }) {
  return <BarChart3 size={size} />;
}

function MonthCompareVisualPage({ selectedMonth }: { selectedMonth: MonthKey }) {
  const data = selectedMonth === "2026-05" ? monthCompareMay : selectedMonth === "2026-04" ? monthCompareApril : selectedMonth === "2026-03" ? monthCompareMarch : selectedMonth === "2026-02" ? monthCompareFebruary : monthCompare;
  const kpis = data.personalKpis;
  const moneyMetrics = kpis.filter((item) => item.kind === "money");
  const barMetrics = kpis.filter((item) => ["money", "count"].includes(item.kind)).slice(0, 4);
  const kpiIcons = [Boxes, ShoppingCart, PackageSearch, WalletCards, Percent, TrendingUp] as const;

  const formatMetricValue = (metric: MonthMetric, value: number) => {
    if (metric.kind === "money") return formatCny(value);
    if (metric.kind === "percent" || metric.kind === "loss") return formatPercent(value * 100, 2);
    return formatNumber(value);
  };

  const formatMetricDiff = (metric: MonthMetric) => {
    if (metric.kind === "percent" || metric.kind === "loss") return `${metric.diff >= 0 ? "+" : ""}${(metric.diff * 100).toFixed(2)}pp`;
    return `${metric.mom >= 0 ? "+" : ""}${formatPercent(metric.mom * 100, 2)}`;
  };

  const isGoodChange = (metric: MonthMetric) => metric.kind === "loss" ? metric.diff < 0 : metric.diff > 0;

  const groupedBar = useMemo<EChartsOption>(() => ({
    color: ["#B7BCCB", "#6554F5"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { top: 0, left: "center", itemWidth: 10, itemHeight: 10, textStyle: { color: "#6d7083", fontSize: 12 } },
    grid: { left: 42, right: 40, top: 44, bottom: 28, containLabel: true },
    xAxis: { type: "category", data: barMetrics.map((item) => item.label), axisTick: { show: false }, axisLine: { lineStyle: { color: "#DDE1EE" } }, axisLabel: { color: "#666a7d", fontSize: 12 } },
    yAxis: { type: "value", axisLabel: { color: "#8f91a6", formatter: (value) => Number(value) >= 10000 ? `${Math.round(Number(value) / 10000)}万` : formatNumber(Number(value)) }, splitLine: { lineStyle: { color: "#ECEEF7", type: "dashed" } } },
    series: [
      { name: data.monthALabel, type: "bar", barWidth: 28, itemStyle: { borderRadius: [9, 9, 0, 0] }, label: { show: true, position: "top", color: "#20233a", fontSize: 11, formatter: (params: any) => formatNumber(Number(params.value)) }, data: barMetrics.map((item) => item.december) },
      { name: data.monthBLabel, type: "bar", barWidth: 28, itemStyle: { borderRadius: [9, 9, 0, 0] }, label: { show: true, position: "top", color: "#20233a", fontSize: 11, formatter: (params: any) => formatNumber(Number(params.value)) }, data: barMetrics.map((item) => item.january) },
    ],
  }), [barMetrics, data.monthALabel, data.monthBLabel]);

  const waterfall = useMemo<EChartsOption>(() => {
    const income = moneyMetrics[0];
    return {
      color: ["#6554F5", "#EF334E", "#6F5CF6"],
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (value) => formatCny(Number(value)) },
      grid: { left: 52, right: 20, top: 32, bottom: 32, containLabel: true },
      xAxis: { type: "category", data: [`${data.monthALabel}收入`, "差额", `${data.monthBLabel}收入`], axisTick: { show: false }, axisLine: { lineStyle: { color: "#DDE1EE" } }, axisLabel: { color: "#565b72", fontSize: 12 } },
      yAxis: { type: "value", axisLabel: { color: "#8f91a6", formatter: (value) => `${Math.round(Number(value) / 10000)}万` }, splitLine: { lineStyle: { color: "#ECEEF7", type: "dashed" } } },
      series: [
        { name: "辅助", type: "bar", stack: "total", itemStyle: { color: "transparent" }, emphasis: { disabled: true }, data: [0, income.january, 0] },
        { name: "收入变化", type: "bar", stack: "total", barWidth: 56, itemStyle: { borderRadius: [9, 9, 0, 0], color: (params: any) => params.dataIndex === 1 ? "#EF334E" : "#6554F5" }, label: { show: true, position: "top", color: "#20233a", fontWeight: 700, fontSize: 12, formatter: (params: any) => params.dataIndex === 1 ? formatSignedCny(income.diff) : formatCny(Number(params.value)) }, data: [income.december, Math.abs(income.diff), income.january] },
      ],
    };
  }, [moneyMetrics, data.monthALabel, data.monthBLabel]);

  const costOption = useMemo<EChartsOption>(() => ({
    color: ["#AEB5C7", "#8B5CF6"],
    tooltip: { trigger: "item", valueFormatter: (value) => formatPercent(Number(value), 2) },
    legend: { left: 0, top: 0, itemWidth: 9, itemHeight: 9, textStyle: { color: "#777a92", fontSize: 12 } },
    radar: {
      center: ["33%", "57%"],
      radius: "64%",
      indicator: data.personalCost.map((item) => ({ name: item.label, max: Math.max(item.december, item.january, 20) + 5 })),
      axisName: { color: "#5d6277", fontSize: 11 },
      splitLine: { lineStyle: { color: "#E3E5F0" } },
      splitArea: { areaStyle: { color: ["#FFFFFF", "#FAF9FF"] } },
      axisLine: { lineStyle: { color: "#E3E5F0" } },
    },
    series: [
      { name: "个人成本结构", type: "radar", symbolSize: 4, areaStyle: { opacity: 0.12 }, lineStyle: { width: 2 }, data: [
        { name: data.monthALabel, value: data.personalCost.map((item) => item.december) },
        { name: data.monthBLabel, value: data.personalCost.map((item) => item.january) },
      ] },
    ],
  }), [data.personalCost, data.monthALabel, data.monthBLabel]);

  const categoryBars = (rows: readonly { name: string; december: number; january: number; mom: number }[], scope: string) => {
    const max = Math.max(...rows.map((item) => Math.max(item.december, item.january)), 1);
    return (
      <div className="compare-category-list">
        {rows.map((item) => (
          <div className="compare-category-row" key={`${scope}-${item.name}`}>
            <span>{item.name}</span>
            <div className="category-track"><i className={item.mom >= 0 ? "positive" : "negative"} style={{ width: `${Math.max(9, (item.january / max) * 100)}%` }} /></div>
            <b className={item.mom >= 0 ? "positive-text" : "negative-text"}>{item.mom >= 0 ? "+" : ""}{formatPercent(item.mom * 100, 2)}</b>
          </div>
        ))}
      </div>
    );
  };

  const productRows = (rows: readonly { id: string; name: string; site: string; december: number; january: number; diff: number; status: string }[], mode: "growth" | "decline") => (
    <div className="table-wrap compare-table-wrap">
      <table className="compare-product-table">
        <thead><tr><th>排名</th><th>产品ID</th><th>产品名称</th><th>站点</th><th>{data.monthALabel}收入</th><th>{data.monthBLabel}收入</th><th>变化额</th><th>状态</th></tr></thead>
        <tbody>{rows.map((item, index) => (
          <tr key={`${item.id}-${item.site}-${item.status}`}>
            <td>{index + 1}</td>
            <td className="product-id">{item.id}</td>
            <td><span className="product-name-ellipsis">{item.name}</span></td>
            <td>{item.site}</td>
            <td>{formatCny(item.december)}</td>
            <td>{formatCny(item.january)}</td>
            <td className={mode === "growth" ? "positive-text" : "negative-text"}>{formatSignedCny(item.diff)}</td>
            <td><span className={`status-pill ${mode === "decline" || item.status.includes("亏损") ? "danger" : "good"}`}>{item.status}</span></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );

  return (
    <div className="content-canvas compare-canvas">
      <section className="compare-hero">
        <div>
          <h2>月度对比：{formatMonthKeyLabel(data.monthA)} vs {formatMonthKeyLabel(data.monthB)}</h2>
          <p>个人产品口径 · 销售额、毛利润与变化额统一显示 ¥</p>
        </div>
        <div className="compare-controls">
          <span>对比月份A</span><button><b>{data.monthA}</b><ChevronDown size={14} /></button>
          <span>对比月份B</span><button><b>{data.monthB}</b><ChevronDown size={14} /></button>
          <span>口径切换</span><button className="selected">个人产品</button><button>平台整体</button>
          <button className="export-btn">导出报告</button>
        </div>
      </section>
      <div className="compare-warning"><Sparkles size={15} /> 数据口径提示：{data.warning}</div>

      <section className="compare-kpi-grid">
        {kpis.map((metric, index) => {
          const Icon = kpiIcons[index] ?? Boxes;
          return (
            <article className="compare-kpi" key={metric.label}>
              <span className={`compare-kpi-icon tone-${index}`}><Icon size={21} /></span>
              <div className="compare-kpi-main">
                <h3>{metric.label}</h3>
                <div className="compare-month-values">
                  <em><small>{data.monthALabel}</small>{formatMetricValue(metric, metric.december)}</em>
                  <em><small>{data.monthBLabel}</small>{formatMetricValue(metric, metric.january)}</em>
                </div>
                <p>{metric.kind === "percent" || metric.kind === "loss" ? "变化" : "环比"} <b className={isGoodChange(metric) ? "positive-text" : "negative-text"}>{formatMetricDiff(metric)}</b></p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="compare-chart-row">
        <article className="panel compare-chart-card">
          <div className="panel-heading"><div><h2>个人产品双月柱状对比</h2><p>{data.monthALabel}灰色 / {data.monthBLabel}紫色，收入与毛利润显示 ¥</p></div></div>
          <EChart option={groupedBar} height={290} />
        </article>
        <article className="panel compare-chart-card">
          <div className="panel-heading"><div><h2>个人收入环比瀑布图</h2><p>收入合计从 {formatCny(moneyMetrics[0]?.december ?? 0)} {moneyMetrics[0]?.diff && moneyMetrics[0].diff > 0 ? "上升" : "下降"}到 {formatCny(moneyMetrics[0]?.january ?? 0)}</p></div></div>
          <EChart option={waterfall} height={290} />
        </article>
      </section>

      <section className="compare-chart-row">
        <article className="panel compare-cost-card">
          <div className="panel-heading"><div><h2>个人成本结构对比</h2><p>雷达图 + 指标表，突出退损率、广告占比和毛利率变化</p></div></div>
          <div className="compare-cost-body">
            <EChart option={costOption} height={258} />
            <table className="cost-compare-table">
              <thead><tr><th>指标</th><th>{data.monthALabel}</th><th>{data.monthBLabel}</th><th>变化</th><th>趋势</th><th>诊断</th></tr></thead>
              <tbody>{data.personalCost.map((item) => {
                const diff = item.january - item.december;
                const good = item.label === "采购成本占比" ? diff < 0 : item.label === "毛利率" ? diff > 0 : diff < 0;
                return (
                  <tr key={item.label}>
                    <td>{item.label}</td>
                    <td>{formatPercent(item.december, 2)}</td>
                    <td>{formatPercent(item.january, 2)}</td>
                    <td className={good ? "positive-text" : "negative-text"}>{diff >= 0 ? "+" : ""}{diff.toFixed(2)}pp</td>
                    <td className={good ? "positive-text" : "negative-text"}>{diff >= 0 ? "↗" : "↘"}</td>
                    <td><span className={`mini-status ${good ? "" : "danger"}`}>{item.status}</span></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        </article>
        <article className="panel compare-category-card">
          <div className="panel-heading"><div><h2>品类月度对比</h2><p>平台品类与个人品类并排查看 MoM</p></div></div>
          <div className="compare-category-split">
            <div><h3>平台品类收入变化（品类口径）</h3>{categoryBars(data.platformCategory, "platform")}</div>
            <div><h3>个人品类收入变化</h3>{categoryBars(data.personalCategory, "personal")}</div>
          </div>
        </article>
      </section>

      <section className="compare-product-row">
        <article className="panel">
          <div className="panel-heading"><div><h2>产品变化榜 - 收入增长 TOP10</h2><p>产品ID统一为 7 位数；手套产品固定为 1322886</p></div></div>
          {productRows(data.growthProducts, "growth")}
          <button className="see-more">查看完整 TOP10</button>
        </article>
        <article className="panel">
          <div className="panel-heading"><div><h2>产品变化榜 - 收入下滑 TOP10</h2><p>{data.monthBLabel}收入为 0 的产品标记疑似断货/下架</p></div></div>
          {productRows(data.declineProducts, "decline")}
          <button className="see-more">查看完整 TOP10</button>
        </article>
      </section>

      <section className="panel compare-final-insights">
        <div className="panel-heading"><div><h2>默认结论</h2></div></div>
        <div className="compare-insight-rail">
          {data.conclusions.map((item, index) => (
            <article key={item} className={`insight-tile tile-${index}`}>
              <Sparkles size={22} />
              <strong>{item.split("，")[0]}</strong>
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/*
function MonthComparePage() {
  const data = monthCompare;
  const kpis = data.personalKpis;
  const moneyMetrics = kpis.filter((item) => item.kind === "money");
  const barMetrics = kpis.filter((item) => ["money", "count"].includes(item.kind)).slice(0, 4);
  const kpiIcons = [Boxes, ShoppingCart, PackageSearch, WalletCards, Percent, TrendingUp] as const;

  const formatMetricValue = (metric: MonthMetric, value: number) => {
    if (metric.kind === "money") return formatCny(value);
    if (metric.kind === "percent" || metric.kind === "loss") return formatPercent(value * 100, 2);
    return `${formatNumber(value)}${metric.suffix ? ` ${metric.suffix}` : ""}`;
  };

  const formatMetricDiff = (metric: MonthMetric) => {
    if (metric.kind === "money") return formatSignedCny(metric.diff);
    if (metric.kind === "percent" || metric.kind === "loss") return `${metric.diff >= 0 ? "+" : ""}${(metric.diff * 100).toFixed(2)}pp`;
    return `${metric.diff >= 0 ? "+" : ""}${formatNumber(metric.diff)}${metric.suffix ? ` ${metric.suffix}` : ""}`;
  };

  const isPositive = (metric: MonthMetric) => metric.kind === "loss" ? metric.diff < 0 : metric.diff > 0;

  const groupedBar = useMemo<EChartsOption>(() => ({
    color: ["#94A3B8", "#6366F1"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { top: 0, left: 0, itemWidth: 10, itemHeight: 10, textStyle: { color: "#777a92", fontSize: 12 } },
    grid: { left: 42, right: 42, top: 44, bottom: 28, containLabel: true },
    xAxis: { type: "category", data: barMetrics.map((item) => item.label), axisLabel: { color: "#666a7d", fontSize: 11 }, axisTick: { show: false } },
    yAxis: { type: "value", axisLabel: { color: "#8f91a6", formatter: (value) => Number(value) >= 10000 ? `¥${Math.round(Number(value) / 10000)}万` : formatNumber(Number(value)) }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
    series: [
      { name: "2025年12月", type: "bar", barWidth: 16, itemStyle: { borderRadius: 8 }, data: barMetrics.map((item) => item.december) },
      { name: "2026年1月", type: "bar", barWidth: 16, itemStyle: { borderRadius: 8 }, data: barMetrics.map((item) => item.january) },
    ],
  }), [barMetrics]);

  const waterfall = useMemo<EChartsOption>(() => {
    const income = moneyMetrics[0];
    return {
      color: ["#94A3B8", "#E74C3C", "#6366F1"],
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (value) => formatCny(Number(value)) },
      grid: { left: 42, right: 18, top: 28, bottom: 30, containLabel: true },
      xAxis: { type: "category", data: ["12月收入", "减少额", "1月收入"], axisLabel: { color: "#666a7d", fontSize: 11 }, axisTick: { show: false } },
      yAxis: { type: "value", axisLabel: { color: "#8f91a6", formatter: (value) => `¥${Math.round(Number(value) / 10000)}万` }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
      series: [
        { name: "辅助", type: "bar", stack: "total", itemStyle: { color: "transparent" }, emphasis: { disabled: true }, data: [0, income.january, 0] },
        { name: "收入变化", type: "bar", stack: "total", barWidth: 30, itemStyle: { borderRadius: 8, color: (params: any) => params.dataIndex === 1 ? "#E74C3C" : params.dataIndex === 2 ? "#6366F1" : "#94A3B8" }, label: { show: true, position: "top", color: "#34364a", fontSize: 11, formatter: (params: any) => params.dataIndex === 1 ? formatSignedCny(income.diff) : formatCny(Number(params.value)) }, data: [income.december, Math.abs(income.diff), income.january] },
      ],
    };
  }, [moneyMetrics]);

  const costOption = useMemo<EChartsOption>(() => ({
    color: ["#94A3B8", "#8B5CF6"],
    tooltip: { trigger: "item", valueFormatter: (value) => formatPercent(Number(value), 2) },
    legend: { left: 0, top: 0, itemWidth: 9, itemHeight: 9, textStyle: { color: "#777a92", fontSize: 11 } },
    radar: {
      center: ["31%", "55%"],
      radius: "68%",
      indicator: data.personalCost.map((item) => ({ name: item.label, max: Math.max(item.december, item.january, 20) + 4 })),
      axisName: { color: "#5d6277", fontSize: 10 },
      splitLine: { lineStyle: { color: "#e6e4f1" } },
      splitArea: { areaStyle: { color: ["#fff", "#faf9ff"] } },
      axisLine: { lineStyle: { color: "#e6e4f1" } },
    },
    series: [
      { name: "个人成本结构", type: "radar", symbolSize: 4, areaStyle: { opacity: .12 }, lineStyle: { width: 2 }, data: [
        { name: "12月", value: data.personalCost.map((item) => item.december) },
        { name: "1月", value: data.personalCost.map((item) => item.january) },
      ] },
    ],
  }), [data.personalCost]);

  const categoryBars = (rows: readonly { name: string; december: number; january: number; mom: number }[], scope: "platform" | "personal") => {
    const max = Math.max(...rows.map((item) => Math.max(item.december, item.january)), 1);
    return <div className="compare-category-list">{rows.map((item) => (
      <div className="compare-category-row" key={`${scope}-${item.name}`}>
        <span>{item.name}</span>
        <div className="category-track"><i className={item.mom >= 0 ? "positive" : "negative"} style={{ width: `${Math.max(8, (item.january / max) * 100)}%` }} /></div>
        <b className={item.mom >= 0 ? "positive-text" : "negative-text"}>{item.mom >= 0 ? "+" : ""}{formatPercent(item.mom * 100, 2)}</b>
      </div>
    ))}</div>;
  };

  const productRows = (rows: readonly { id: string; name: string; site: string; december: number; january: number; diff: number; status: string }[], mode: "growth" | "decline") => (
    <div className="table-wrap compare-table-wrap">
      <table className="compare-product-table">
        <thead><tr><th>产品ID</th><th>产品名称</th><th>站点</th><th>12月收入</th><th>1月收入</th><th>变化额</th><th>状态</th></tr></thead>
        <tbody>{rows.map((item) => (
          <tr key={`${item.id}-${item.site}-${item.status}`}>
            <td className="product-id">{item.id}</td>
            <td><span className="product-name-ellipsis">{item.name}</span></td>
            <td>{item.site}</td>
            <td>{formatCny(item.december)}</td>
            <td>{formatCny(item.january)}</td>
            <td className={mode === "growth" ? "positive-text" : "negative-text"}>{formatSignedCny(item.diff)}</td>
            <td><span className={`status-pill ${item.status.includes("亏损") || item.status.includes("断货") || item.status.includes("复盘") ? "danger" : "good"}`}>{item.status}</span></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );

  return (
    <div className="content-canvas compare-canvas">
      <section className="compare-hero">
        <div>
          <h2>月度对比：2025年12月 vs 2026年1月</h2>
          <p>个人产品口径 · 销售额与利润统一显示 ¥</p>
        </div>
        <div className="compare-controls"><button>对比月份A <b>2025-12</b> <ChevronDown size={14} /></button><button>对比月份B <b>2026-01</b> <ChevronDown size={14} /></button><span>口径切换</span><button className="selected">个人产品</button><button>平台整体</button><button className="export-btn">导出报告</button></div>
      </section>
      <div className="compare-warning">数据口径提示：{data.warning}</div>

      <section className="compare-kpi-grid">
        {kpis.map((metric, index) => {
          const Icon = kpiIcons[index] ?? Boxes;
          return <article className="compare-kpi" key={metric.label}>
          <span className={`compare-kpi-icon tone-${index}`}><Icon size={20} /></span>
          <div className="compare-kpi-main">
            <h3>{metric.label}</h3>
            <div className="compare-month-values"><em><small>12月</small>{formatMetricValue(metric, metric.december)}</em><em><small>1月</small>{formatMetricValue(metric, metric.january)}</em></div>
            <p>环比 <b className={isPositive(metric) ? "positive-text" : "negative-text"}>{metric.kind === "percent" || metric.kind === "loss" ? formatMetricDiff(metric) : `${metric.mom >= 0 ? "+" : ""}${formatPercent(metric.mom * 100, 2)}`}</b></p>
          </div>
        </article>)}
      </section>

      <section className="compare-chart-row">
        <article className="panel compare-chart-card"><div className="panel-heading"><div><h2>个人产品双月柱状对比</h2><p>12月灰色 / 1月紫色，金额统一 ¥</p></div></div><EChart option={groupedBar} height={300} /></article>
        <article className="panel compare-chart-card"><div className="panel-heading"><div><h2>个人收入环比瀑布图</h2><p>收入合计少了 {formatSignedCny(-42668)}</p></div></div><EChart option={waterfall} height={300} /></article>
      </section>

      <section className="compare-chart-row">
        <article className="panel compare-cost-card"><div className="panel-heading"><div><h2>个人成本结构对比</h2><p>雷达图 + 指标表，突出退损率上升</p></div></div><div className="compare-cost-body"><EChart option={costOption} height={258} /><table className="cost-compare-table"><thead><tr><th>指标</th><th>12月</th><th>1月</th><th>变化</th><th>诊断</th></tr></thead><tbody>{data.personalCost.map((item) => <tr key={item.label}><td>{item.label}</td><td>{formatPercent(item.december, 2)}</td><td>{formatPercent(item.january, 2)}</td><td className={item.january > item.december && item.label !== "采购成本占比" ? "negative-text" : "positive-text"}>{item.january > item.december ? "+" : ""}{(item.january - item.december).toFixed(2)}pp</td><td><span className="mini-status">{item.status}</span></td></tr>)}</tbody></table></div></article>
        <article className="panel compare-category-card"><div className="panel-heading"><div><h2>品类月度对比</h2><p>平台品类与个人品类并排查看 MoM</p></div></div><div className="compare-category-split"><div><h3>平台品类收入变化（品类口径）</h3>{categoryBars(data.platformCategory, "platform")}</div><div><h3>个人品类收入变化</h3>{categoryBars(data.personalCategory, "personal")}</div></div></article>
      </section>

      <section className="compare-product-row">
        <article className="panel"><div className="panel-heading"><div><h2>产品变化榜 - 收入增长 TOP10</h2><p>产品ID已清洗为7位纯数字</p></div></div>{productRows(data.growthProducts, "growth")}<button className="see-more">查看完整 TOP10</button></article>
        <article className="panel"><div className="panel-heading"><div><h2>产品变化榜 - 收入下滑 TOP10</h2><p>1月收入为0标记疑似断货/下架</p></div></div>{productRows(data.declineProducts, "decline")}<button className="see-more">查看完整 TOP10</button></article>
      </section>

      <section className="panel compare-final-insights">
        <div className="panel-heading"><div><h2>默认结论</h2></div></div>
        <div className="compare-insight-rail">{data.conclusions.map((item, index) => <article key={item} className={`insight-tile tile-${index}`}><Sparkles size={22} /><strong>{item.split("，")[0]}</strong><span>{item}</span></article>)}</div>
      </section>
    </div>
  );
}

*/
function AdAnalysisPage({ selectedMonth, monthLabel }: { selectedMonth: MonthKey; monthLabel: string }) {
  const data = selectedMonth === "2026-05" ? mayAdAnalysis : selectedMonth === "2026-04" ? aprilAdAnalysis : selectedMonth === "2026-03" ? marchAdAnalysis : selectedMonth === "2026-02" ? februaryAdAnalysis : januaryAdAnalysis;
  const summary = data.summary;
  const periods = data.periodRows;
  const periodLabels = periods.map((item) => item.period.replace("2026/", ""));
  const insights = "insightCards" in data ? data.insightCards : adInsightCards;

  const metricCards = [
    ["曝光量", `${formatNumber(summary.impressions)} 次`, Eye, "blue", "广告被展示次数"],
    ["点击量", `${formatNumber(summary.clicks)} 次`, MousePointerClick, "violet", "用户点击广告次数"],
    ["CTR", formatPercent(summary.ctr * 100, 2), Percent, "orange", "点击量 / 曝光量"],
    ["CPC", formatKrw(summary.cpc), Target, "blue", "平均每次点击成本"],
    ["转化订单", `${formatNumber(summary.adOrders)} 次`, ShoppingCart, "cyan", "广告带来的订单"],
    ["CVR", formatPercent(summary.cvr * 100, 2), Target, "lime", "转化订单 / 点击量"],
    ["广告费", formatKrw(summary.adSpend), WalletCards, "coral", "实际广告支出"],
    ["广告转化销售额", formatKrw(summary.adSales), TrendingUp, "cyan", "广告直接销售额"],
    ["总销售额", formatKrw(summary.totalSales), BarChart3, "blue", "店铺整体销售额"],
    ["ROAS", formatPercent(summary.roas * 100, 2), Sparkles, "lime", "广告销售额 / 广告费"],
    ["广告销售占比", formatPercent(summary.adSalesRatio * 100, 1), Megaphone, "violet", "广告转化销售额 / 总销售额"],
  ] as const;

  const makeSparkOption = (values: readonly number[], color: string): EChartsOption => ({
    animationDuration: 700,
    color: [color],
    tooltip: { show: false },
    grid: { left: 6, right: 6, top: 10, bottom: 6 },
    xAxis: { type: "category", show: false, data: values.map((_, index) => index + 1) },
    yAxis: { type: "value", show: false, min: 0 },
    series: [{
      type: "line",
      smooth: true,
      showSymbol: false,
      lineStyle: { width: 3 },
      areaStyle: { opacity: .16 },
      data: [...values],
    }],
  });

  const salesTrendOption = useMemo<EChartsOption>(() => ({
    animationDuration: 800,
    color: ["#27AE60", "#7655f6", "#F39C12"],
    tooltip: { trigger: "axis", valueFormatter: (value) => formatKrw(Number(value)) },
    legend: { top: 0, left: 0, itemWidth: 10, itemHeight: 10, textStyle: { color: "#777a92", fontSize: 12 } },
    grid: { left: 42, right: 18, top: 44, bottom: 28, containLabel: true },
    xAxis: { type: "category", data: periodLabels, axisLabel: { color: "#777a92", fontSize: 11 }, axisTick: { show: false } },
    yAxis: { type: "value", axisLabel: { color: "#8f91a6", formatter: (value) => `₩${Math.round(Number(value) / 10000)}万` }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
    series: [
      { name: "总销售额", type: "line", smooth: true, symbolSize: 7, lineStyle: { width: 3 }, data: periods.map((item) => item.totalSales) },
      { name: "广告转化销售额", type: "line", smooth: true, symbolSize: 7, lineStyle: { width: 3 }, data: periods.map((item) => item.adSales) },
      { name: "广告费", type: "line", smooth: true, symbolSize: 7, lineStyle: { width: 3 }, data: periods.map((item) => item.adSpend) },
    ],
  }), [periodLabels, periods]);

  const weeklyBarOption = useMemo<EChartsOption>(() => ({
    animationDuration: 800,
    color: ["#27AE60", "#7655f6", "#F39C12"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (value) => formatKrw(Number(value)) },
    legend: { top: 0, left: 0, itemWidth: 10, itemHeight: 10, textStyle: { color: "#777a92", fontSize: 12 } },
    grid: { left: 40, right: 18, top: 44, bottom: 30, containLabel: true },
    xAxis: { type: "category", data: periodLabels, axisLabel: { color: "#777a92", fontSize: 11 }, axisTick: { show: false } },
    yAxis: { type: "value", axisLabel: { color: "#8f91a6", formatter: (value) => `₩${Math.round(Number(value) / 10000)}万` }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
    series: [
      { name: "总销售额", type: "bar", barWidth: 12, itemStyle: { borderRadius: 8 }, data: periods.map((item) => item.totalSales) },
      { name: "广告转化销售额", type: "bar", barWidth: 12, itemStyle: { borderRadius: 8 }, data: periods.map((item) => item.adSales) },
      { name: "广告费", type: "bar", barWidth: 12, itemStyle: { borderRadius: 8 }, data: periods.map((item) => item.adSpend) },
    ],
  }), [periodLabels, periods]);

  const trendCards = [
    ["曝光量趋势", data.screenshotTrends.impressions, "#5470C6"],
    ["点击量趋势", data.screenshotTrends.clicks, "#7655f6"],
    ["转化销量趋势", data.screenshotTrends.conversionSalesCount, "#91CC75"],
    ["ROAS趋势", data.screenshotTrends.roas, "#9A60B4"],
  ] as const;

  const roasClass = (roas: number) => roas >= 5 ? "good" : roas >= 3 ? "warn" : roas >= 1 ? "mid" : "danger";
  const ctrClass = (ctr: number) => ctr >= .003 ? "good" : ctr >= .001 ? "warn" : "danger";

  return (
    <div className="content-canvas ad-canvas">
      <section className="ad-hero">
        <div>
          <h2>{monthLabel}广告整体分析</h2>
          <p>{data.store} · {data.dateRange} · {data.sourceNote}</p>
        </div>
        <div className="store-tabs ad-store-tabs"><button>本土70</button><button className="selected">本土88</button></div>
      </section>

      <section className="ad-kpi-grid">
        {metricCards.map(([label, value, Icon, tone, note]) => (
          <article className="kpi-card ad-kpi" key={label}>
            <span className={`kpi-icon ${tone}`}><Icon size={20} /></span>
            <div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
          </article>
        ))}
      </section>

      <section className="ad-trend-grid">
        {trendCards.map(([title, values, color]) => (
          <article className="panel ad-mini-card" key={title}>
            <div className="mini-head"><div><h3>{title}</h3><p>截图趋势，仅展示波动</p></div><i style={{ background: color }} /></div>
            <EChart option={makeSparkOption(values, color)} height={92} />
          </article>
        ))}
      </section>

      <section className="ad-chart-row">
        <article className="panel ad-chart-card">
          <div className="panel-heading"><div><h2>销售与广告投入趋势</h2><p>总销售额 / 广告转化销售额 / 广告费</p></div><span className="data-source">来源：店铺整体截图</span></div>
          <EChart option={salesTrendOption} height={300} />
        </article>
        <article className="panel ad-chart-card">
          <div className="panel-heading"><div><h2>周度业绩对比</h2><p>按周查看广告贡献与自然销售差异</p></div><span className="data-source">来源：各周业绩报告</span></div>
          <EChart option={weeklyBarOption} height={300} />
        </article>
      </section>

      <section className="ad-bottom-row">
        <article className="panel ad-table-card">
          <div className="panel-heading"><div><h2>时间段明细表</h2><p>按截图时间段汇总，不展示单广告活动数据</p></div><button>导出CSV</button></div>
          <div className="table-wrap ad-table-wrap">
            <table className="ad-period-table">
              <thead><tr><th>查询时间</th><th>曝光量</th><th>点击量</th><th>CTR</th><th>CPC</th><th>转化订单</th><th>转化销量</th><th>CVR</th><th>广告费</th><th>广告转化销售额</th><th>总销售额</th><th>ROAS</th></tr></thead>
              <tbody>
                {periods.map((row) => (
                  <tr key={row.period}>
                    <td>{row.period}</td>
                    <td>{formatNumber(row.impressions)}</td>
                    <td>{formatNumber(row.clicks)}</td>
                    <td><span className={`status-pill ${ctrClass(row.ctr)}`}>{formatPercent(row.ctr * 100, 2)}</span></td>
                    <td>{formatKrw(row.cpc)}</td>
                    <td>{formatNumber(row.adOrders)}</td>
                    <td>{formatNumber(row.conversionSalesCount)}</td>
                    <td>{formatPercent(row.cvr * 100, 2)}</td>
                    <td>{formatKrw(row.adSpend)}</td>
                    <td>{formatKrw(row.adSales)}</td>
                    <td>{formatKrw(row.totalSales)}</td>
                    <td><span className={`status-pill ${roasClass(row.roas)}`}>{formatPercent(row.roas * 100, 2)}</span></td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td>合计</td><td>{formatNumber(summary.impressions)}</td><td>{formatNumber(summary.clicks)}</td><td>{formatPercent(summary.ctr * 100, 2)}</td><td>{formatKrw(summary.cpc)}</td><td>{formatNumber(summary.adOrders)}</td><td>{formatNumber(summary.conversionSalesCount)}</td><td>{formatPercent(summary.cvr * 100, 2)}</td><td>{formatKrw(summary.adSpend)}</td><td>{formatKrw(summary.adSales)}</td><td>{formatKrw(summary.totalSales)}</td><td>{formatPercent(summary.roas * 100, 2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel ad-insight-card">
          <div className="panel-heading"><div><h2>自动诊断结论</h2><p>结论均可追溯到时间段明细表</p></div></div>
          <div className="ad-insight-list">
            {insights.map((item) => <div className={`ad-insight ${item.level}`} key={item.title}><span>{item.title}</span><strong>{item.value}</strong><p>{item.note}</p></div>)}
          </div>
        </article>
      </section>
    </div>
  );
}

function ProductAnalysisPage({ selectedMonth, monthLabel }: { selectedMonth: MonthKey; monthLabel: string }) {
  const data = selectedMonth === "2026-05" ? mayProductAnalysis : selectedMonth === "2026-04" ? aprilProductAnalysis : selectedMonth === "2026-03" ? marchProductAnalysis : selectedMonth === "2026-02" ? februaryProductAnalysis : januaryProductAnalysis;
  const productMatrixOption = useMemo<EChartsOption>(() => {
    const salesMax = Math.max(...data.matrixProducts.map((item) => item.sales), 1);
    return {
      color: ["#8065f4", "#ffb321"],
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const point = Array.isArray(params) ? params[0] : params;
          const item = ((point as unknown as { data: { raw: ProductAnalysisItem } }).data).raw;
          return `${item.name}<br/>销售额：${formatCnyCompact(item.sales)}<br/>毛利率：${formatPercent(item.grossMargin * 100, 1)}<br/>店铺：${item.storeBadge}`;
        },
      },
      grid: { left: 34, right: 20, top: 20, bottom: 34 },
      xAxis: {
        type: "value",
        name: "销售额",
        max: salesMax * 1.12,
        axisLabel: { color: "#9093a7", formatter: (value) => formatCnyCompact(Number(value)) },
        splitLine: { lineStyle: { color: "#e9e6f7" } },
      },
      yAxis: {
        type: "value",
        name: "毛利率",
        axisLabel: { color: "#9093a7", formatter: (value) => `${value}%` },
        splitLine: { lineStyle: { color: "#e9e6f7" } },
      },
      series: [
        {
          type: "scatter",
          symbolSize: (value) => Math.max(14, Math.min(34, Number(value[2]) / 8)),
          data: data.matrixProducts.map((item) => ({
            value: [item.sales, item.grossMargin * 100, item.orders],
            raw: item,
            itemStyle: { color: item.grossMargin >= data.personalTotal.grossMargin ? "#8065f4" : "#ffb321", borderColor: "#fff", borderWidth: 2 },
          })),
        },
      ],
    };
  }, [data]);

  const kpis = [
    ["订单量", formatNumber(data.personalTotal.orders), ShoppingCart, "violet", "有效订单"],
    ["销售额", formatCnyCompact(data.personalTotal.sales), Boxes, "cyan", "产品表汇总"],
    ["商品数", formatNumber(data.productCount), PackageSearch, "orange", "可切换店铺/新增店铺"],
    ["客单价", formatCny(data.personalTotal.sales / data.personalTotal.orders), WalletCards, "blue", "销售额/订单量"],
    ["毛利率", formatPercent(data.personalTotal.grossMargin * 100, 1), TrendingUp, "lime", `平台 ${formatPercent(data.platformTotal.grossMargin * 100, 1)}`],
    ["退损率", formatPercent(data.personalTotal.lossRate * 100, 1), TrendingDown, "coral", `平台 ${formatPercent(data.platformTotal.lossRate * 100, 1)}`],
  ] as const;

  const compareRows = [
    ["毛利率", data.personalTotal.grossMargin, data.platformTotal.grossMargin, "violet"],
    ["退损率", data.personalTotal.lossRate, data.platformTotal.lossRate, "coral"],
    ["采购占比", data.personalTotal.purchaseShare, data.platformTotal.purchaseShare, "cyan"],
    ["物流占比", data.personalTotal.logisticsShare, data.platformTotal.logisticsShare, "orange"],
    ["广告占比", data.personalTotal.adShare, data.platformTotal.adShare, "lime"],
  ] as const;

  return (
    <div className="content-canvas product-canvas">
      <section className="kpi-row product-kpis">
        {kpis.map(([label, value, Icon, tone, note]) => (
          <article className="kpi-card product-kpi" key={label}>
            <span className={`kpi-icon ${tone}`}><Icon size={21} /></span>
            <div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
          </article>
        ))}
      </section>

      <section className="product-main-row">
        <article className="panel product-ranking-panel">
          <div className="panel-heading"><div><h2>商品排行（销售额）</h2><p>按产品ID聚合，标记单店铺/多店铺出单</p></div><span className="data-source">{monthLabel}Excel</span></div>
          <div className="product-table-wrap">
            <table className="product-table">
              <thead><tr><th>产品ID</th><th>产品名称</th><th>店铺</th><th>销售额</th><th>订单</th><th>客单价</th><th>毛利率</th><th>退损</th></tr></thead>
              <tbody>
                {data.topSales.slice(0, 5).map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="product-name"><span>{index + 1}. {item.name}</span></td>
                    <td><span className={`store-badge ${item.storeType}`}>{item.storeBadge}</span></td>
                    <td className="strong-cell">{formatCnyCompact(item.sales)}</td>
                    <td>{formatNumber(item.orders)}</td>
                    <td>{formatCny(item.avgPrice)}</td>
                    <td className={item.grossMargin < 0 ? "down" : ""}>{formatPercent(item.grossMargin * 100, 1)}</td>
                    <td className={item.lossRate > data.personalTotal.lossRate ? "down" : ""}>{formatPercent(item.lossRate * 100, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel product-matrix-panel">
          <div className="panel-heading"><div><h2>产品矩阵：销售额 × 毛利率</h2><p>右上优先放大，右下保量控采购/物流</p></div></div>
          <EChart option={productMatrixOption} height={285} />
        </article>
      </section>

      <section className="product-bottom-row">
        <article className="panel product-compare-panel">
          <div className="panel-heading"><div><h2>个人 vs 平台产品基准</h2><p>成本、退损、毛利结构对照</p></div></div>
          <div className="benchmark-list">
            {compareRows.map(([label, personalValue, platformValue, tone]) => (
              <div key={label}>
                <span>{label}</span>
                <div><i className={tone} style={{ width: `${Math.min(personalValue / 0.5, 1) * 100}%` }} /></div>
                <strong>{formatPercent(personalValue * 100, 1)}</strong>
                <small>平台 {formatPercent(platformValue * 100, 1)}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel product-alert-panel">
          <div className="panel-heading"><div><h2>异常产品预警</h2><p>优先处理高退损、低毛利产品</p></div></div>
          <div className="alert-list">
            <AlertRow tag="高退损" tone="coral" item={data.highLoss[0]} />
            <AlertRow tag="低毛利" tone="orange" item={data.lowMargin[0]} />
            <AlertRow tag="高销售低利润" tone="violet" item={[...data.topSales].sort((a, b) => a.grossMargin - b.grossMargin)[0]} />
          </div>
        </article>

        <article className="panel product-fields-panel">
          <div className="panel-heading"><div><h2>产品明细表字段</h2><p>后续完整开发会接入筛选、排序、导出</p></div></div>
          <div className="field-chips">
            {["产品ID", "产品名称", "品类/店铺", "销售额", "订单量", "客单价", "毛利率", "退损率", "采购占比", "物流占比", "广告占比", "建议动作"].map((field) => <span key={field}>{field}</span>)}
          </div>
        </article>
      </section>
    </div>
  );
}

function CategoryAnalysisPage({ selectedMonth, monthLabel }: { selectedMonth: MonthKey; monthLabel: string }) {
  const [mode, setMode] = useState<"personal" | "platform">("personal");
  const [selectedCategory, setSelectedCategory] = useState("居家百货");
  const categoryAnalysis = selectedMonth === "2026-05" ? mayCategoryAnalysis : selectedMonth === "2026-04" ? aprilCategoryAnalysis : selectedMonth === "2026-03" ? marchCategoryAnalysis : selectedMonth === "2026-02" ? februaryCategoryAnalysis : januaryCategoryAnalysis;
  const dataset = categoryAnalysis[mode];
  const personalDataset = categoryAnalysis.personal;
  const platformDataset = categoryAnalysis.platform;
  const categories = dataset.categories.filter((item) => item.orders > 0);
  const selected = categories.find((item) => item.name === selectedCategory) ?? categories[0];
  const selectedPlatform = platformDataset.categories.find((item) => item.name === selected.name) ?? platformDataset.categories[0];

  const kpiCards = [
    ["总收入", formatCnyCompact(dataset.summary.revenue), Boxes, "cyan", mode === "personal" ? "个人品类合计" : "平台大盘合计"],
    ["毛利率", formatPercent(dataset.summary.grossMargin * 100, 1), TrendingUp, dataset.summary.grossMargin > 0.2 ? "lime" : dataset.summary.grossMargin > 0.1 ? "orange" : "coral", "整体毛利率"],
    ["订单量", formatNumber(dataset.summary.orders), ShoppingCart, "violet", "有效订单"],
    ["退损率", formatPercent(dataset.summary.lossRate * 100, 1), TrendingDown, dataset.summary.lossRate < 0.1 ? "lime" : dataset.summary.lossRate < 0.2 ? "orange" : "coral", "退货+损耗比例"],
  ] as const;

  const revenueRank = useMemo<EChartsOption>(() => {
    const fixedCategoryOrder = Object.keys(categoryPalette).filter((name) => name !== "母婴");
    const makePieData = (items: CategoryAnalysisItem[]) => [...items]
      .filter((item) => item.orders > 0)
      .sort((a, b) => b.orders - a.orders)
      .map((item) => ({
        name: item.name,
        value: item.orders,
        itemStyle: { color: categoryPalette[item.name] ?? "#8B8EA3" },
      }));
    const personalTotal = personalDataset.summary.orders;
    const platformTotal = platformDataset.summary.orders;
    return {
      color: fixedCategoryOrder.map((name) => categoryPalette[name]),
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          const row = Array.isArray(params) ? params[0] : params;
          return `${row.seriesName}<br/>${row.marker}${row.name}：${formatNumber(Number(row.value))} 单<br/>占比：${Number(row.percent).toFixed(1)}%`;
        },
      },
      legend: {
        bottom: 0,
        left: "center",
        data: fixedCategoryOrder,
        itemWidth: 9,
        itemHeight: 9,
        textStyle: { color: "#777a92", fontSize: 11 },
      },
      series: [
        {
          name: "个人出单占比",
          type: "pie",
          radius: ["42%", "66%"],
          center: ["25%", "50%"],
          avoidLabelOverlap: true,
          label: { show: false },
          labelLine: { show: false },
          data: makePieData(personalDataset.categories),
        },
        {
          name: "平台出单占比",
          type: "pie",
          radius: ["42%", "66%"],
          center: ["75%", "50%"],
          avoidLabelOverlap: true,
          label: { show: false },
          labelLine: { show: false },
          data: makePieData(platformDataset.categories),
        },
      ],
    };
  }, [personalDataset, platformDataset]);

  const costStack = useMemo<EChartsOption>(() => ({
    color: ["#E74C3C", "#F39C12", "#3498DB", "#9B59B6", "#1ABC9C", "#95A5A6", "#2ECC71"],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (value) => formatPercent(Number(value), 1) },
    legend: { top: 0, left: 0, itemWidth: 9, itemHeight: 9, textStyle: { color: "#777a92", fontSize: 11 } },
    grid: { left: 34, right: 18, top: 54, bottom: 42, containLabel: true },
    xAxis: { type: "category", data: categories.map((item) => item.name), axisLabel: { color: "#55596d", fontSize: 11, rotate: 28 }, axisTick: { show: false } },
    yAxis: { type: "value", max: 100, axisLabel: { color: "#8f91a6", formatter: "{value}%" }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
    series: [
      { name: "采购", type: "bar", stack: "cost", data: categories.map((item) => item.purchaseShare * 100) },
      { name: "物流", type: "bar", stack: "cost", data: categories.map((item) => item.logisticsShare * 100) },
      { name: "佣金", type: "bar", stack: "cost", data: categories.map((item) => item.commissionShare * 100) },
      { name: "广告", type: "bar", stack: "cost", data: categories.map((item) => item.adShare * 100) },
      { name: "VAT", type: "bar", stack: "cost", data: categories.map((item) => item.vatShare * 100) },
      { name: "活动", type: "bar", stack: "cost", data: categories.map((item) => item.eventFeeShare * 100) },
      { name: "毛利率", type: "bar", stack: "cost", itemStyle: { borderColor: "#2ECC71", borderWidth: 1, borderType: "dashed" }, data: categories.map((item) => item.grossMargin * 100) },
    ],
  }), [categories]);

  const marginRank = useMemo<EChartsOption>(() => {
    const sorted = [...categories].sort((a, b) => a.grossMargin - b.grossMargin);
    const platformAverage = platformDataset.summary.grossMargin * 100;
    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (value) => formatPercent(Number(value), 1) },
      grid: { left: 78, right: 30, top: 24, bottom: 14, containLabel: true },
      xAxis: { type: "value", axisLabel: { color: "#8f91a6", formatter: "{value}%" }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
      yAxis: { type: "category", data: sorted.map((item) => item.name), axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: "#55596d", fontSize: 12 } },
      series: [{
        name: "毛利率",
        type: "bar",
        barWidth: 13,
        itemStyle: { borderRadius: 8, color: (params) => Number(params.value) >= platformAverage ? "#2ECC71" : "#E74C3C" },
        markLine: { symbol: "none", lineStyle: { color: "#EF4444", type: "dashed" }, label: { formatter: "平台均值" }, data: [{ xAxis: platformAverage }] },
        data: sorted.map((item) => item.grossMargin * 100),
      }],
    };
  }, [categories, platformDataset.summary.grossMargin]);

  const lossBubble = useMemo<EChartsOption>(() => {
    const avgOrders = categories.reduce((sum, item) => sum + item.orders, 0) / Math.max(categories.length, 1);
    const maxRevenue = Math.max(...categories.map((item) => item.revenue), 1);
    return {
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          const point = Array.isArray(params) ? params[0] : params;
          const item = ((point as unknown as { data: { raw: CategoryAnalysisItem } }).data).raw;
          return `${item.name}<br/>订单：${formatNumber(item.orders)}<br/>退损率：${formatPercent(item.lossRate * 100, 1)}<br/>收入：${formatCnyCompact(item.revenue)}`;
        },
      },
      grid: { left: 48, right: 26, top: 24, bottom: 36 },
      xAxis: { type: "value", name: "订单量", axisLabel: { color: "#8f91a6" }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
      yAxis: { type: "value", name: "退损率", axisLabel: { color: "#8f91a6", formatter: "{value}%" }, splitLine: { lineStyle: { color: "#ecebf5", type: "dashed" } } },
      series: [{
        type: "scatter",
        data: categories.map((item) => ({
          value: [item.orders, item.lossRate * 100, item.revenue],
          raw: item,
          symbolSize: Math.max(14, Math.min(38, (item.revenue / maxRevenue) * 38)),
          itemStyle: { color: item.lossRate < 0.1 ? "#2ECC71" : item.lossRate < 0.2 ? "#F39C12" : "#E74C3C", borderColor: "#fff", borderWidth: 2 },
          label: { show: true, formatter: item.name, position: "top", color: "#575b6f", fontSize: 10 },
        })),
        markLine: { symbol: "none", lineStyle: { color: "#8B5CF6", type: "dashed" }, data: [{ xAxis: avgOrders }, { yAxis: 15 }] },
      }],
      graphic: [
        { type: "text", right: 18, top: 16, style: { text: "⚠ 重点关注", fill: "#E74C3C", fontSize: 12, fontWeight: 700 } },
        { type: "text", right: 18, bottom: 18, style: { text: "✅ 健康", fill: "#2ECC71", fontSize: 12, fontWeight: 700 } },
      ],
    };
  }, [categories]);

  const radarOption = useMemo<EChartsOption>(() => {
    const personalItem = personalDataset.categories.find((item) => item.name === selected.name) ?? selected;
    const platformItem = selectedPlatform;
    const toScore = (item: CategoryAnalysisItem) => [
      item.grossMargin,
      1 - item.lossRate,
      1 - item.logisticsShare,
      1 - item.purchaseShare,
      1 - item.adShare,
      1 - item.commissionShare,
    ].map((value) => Math.max(0, Math.min(1, value)) * 100);
    return {
      color: ["#3B82F6", "#8B5CF6"],
      tooltip: { trigger: "item" },
      legend: { top: 0, right: 10, textStyle: { color: "#777a92", fontSize: 12 } },
      radar: {
        radius: "62%",
        indicator: [
          { name: "毛利率", max: 100 },
          { name: "低退损", max: 100 },
          { name: "物流控制", max: 100 },
          { name: "采购控制", max: 100 },
          { name: "广告控制", max: 100 },
          { name: "佣金控制", max: 100 },
        ],
        axisName: { color: "#575b6f", fontSize: 12 },
        splitLine: { lineStyle: { color: "#e8e5f5" } },
        splitArea: { areaStyle: { color: ["#faf9ff", "#f2efff"] } },
      },
      series: [{ type: "radar", data: [{ name: "个人", value: toScore(personalItem) }, { name: "平台", value: toScore(platformItem), lineStyle: { type: "dashed" } }] }],
    };
  }, [personalDataset.categories, selected, selectedPlatform]);

  return (
    <div className="content-canvas category-canvas">
      <section className="category-toolbar">
        <div>
          <h2>品类分析</h2>
          <p>{monthLabel} · {mode === "personal" ? "个人经营" : "平台大盘"} · 数据来自品类经营分析 Excel</p>
        </div>
        <div className="category-switch">
          <button className={mode === "personal" ? "selected" : ""} onClick={() => setMode("personal")}>个人经营</button>
          <button className={mode === "platform" ? "selected" : ""} onClick={() => setMode("platform")}>平台大盘</button>
        </div>
      </section>

      <section className="kpi-row category-kpis">
        {kpiCards.map(([label, value, Icon, tone, note]) => (
          <article className="kpi-card category-kpi" key={label}>
            <span className={`kpi-icon ${tone}`}><Icon size={22} /></span>
            <div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
          </article>
        ))}
      </section>

      <section className="category-chart-grid">
        <article className="panel category-chart-card category-donut-card">
          <div className="panel-heading"><div><h2>个人&平台出单品类对比</h2><p>双环形饼图对比个人与平台品类订单占比</p></div></div>
          <div className="donut-title donut-title-left">个人出单占比</div>
          <div className="donut-title donut-title-right">平台出单占比</div>
          <div className="donut-center donut-center-left"><strong>{formatNumber(personalDataset.summary.orders)}</strong><span>总订单量</span></div>
          <div className="donut-center donut-center-right"><strong>{formatNumber(platformDataset.summary.orders)}</strong><span>总订单量</span></div>
          <EChart option={revenueRank} height={320} />
        </article>
        <article className="panel category-chart-card"><div className="panel-heading"><div><h2>成本结构堆叠图</h2><p>采购、物流、佣金、广告、VAT 与毛利率</p></div></div><EChart option={costStack} height={300} /></article>
        <article className="panel category-chart-card"><div className="panel-heading"><div><h2>毛利率排行</h2><p>红色虚线为平台整体基准</p></div></div><EChart option={marginRank} height={286} /></article>
        <article className="panel category-chart-card"><div className="panel-heading"><div><h2>订单量 vs 退损率</h2><p>气泡大小代表销售额</p></div></div><EChart option={lossBubble} height={286} /></article>
      </section>

      <section className="category-detail-row">
        <article className="panel category-selector-card">
          <div className="panel-heading"><div><h2>选择品类对比</h2><p>点击后更新右侧雷达图</p></div></div>
          <div className="category-chip-list">
            {categories.map((item) => (
              <button key={item.name} onClick={() => setSelectedCategory(item.name)} className={selected.name === item.name ? "selected" : ""} style={{ borderColor: categoryPalette[item.name] ?? "#8B5CF6" }}>
                <i style={{ background: categoryPalette[item.name] ?? "#8B5CF6" }} />{item.name}
              </button>
            ))}
          </div>
        </article>
        <article className="panel category-radar-card">
          <div className="panel-heading"><div><h2>{selected.name} · 个人 vs 平台</h2><p>反向成本指标已转为“越高越好”</p></div></div>
          <EChart option={radarOption} height={260} />
          <p className="radar-note">个人毛利 {formatCnyCompact(selected.grossProfit)} vs 平台毛利 {formatCnyCompact(selectedPlatform.grossProfit)}</p>
        </article>
      </section>
    </div>
  );
}

function AlertRow({ tag, tone, item }: { tag: string; tone: string; item: ProductAnalysisItem }) {
  return (
    <div className="alert-row">
      <span className={`alert-tag ${tone}`}>{tag}</span>
      <div><strong>{item.name}</strong><small>销售 {formatCnyCompact(item.sales)} / 毛利 {formatPercent(item.grossMargin * 100, 1)}</small></div>
    </div>
  );
}

function formatCnyCompact(value: number) {
  if (Math.abs(value) >= 10000) return `¥${(value / 10000).toFixed(1)}万`;
  return formatCny(value);
}
