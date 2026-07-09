const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(process.cwd(), 'components', 'dashboard.tsx');
let source = fs.readFileSync(dashboardPath, 'utf8');

const replaceOnce = (from, to) => {
  if (source.includes(to)) return;
  if (!source.includes(from)) {
    throw new Error(`Dashboard patch pattern not found: ${from.slice(0, 120)}`);
  }
  source = source.replace(from, to);
};

replaceOnce(
  'import { mayCustomerPriceCny, mayOverview } from "@/lib/may";\n',
  'import { mayCustomerPriceCny, mayOverview } from "@/lib/may";\nimport { juneCustomerPriceCny, juneOverview } from "@/lib/june";\n',
);

replaceOnce(
  'import { aprilProductAnalysis, februaryProductAnalysis, januaryProductAnalysis, marchProductAnalysis, mayProductAnalysis, type ProductAnalysisItem } from "@/lib/product-analysis";\n',
  'import { aprilProductAnalysis, februaryProductAnalysis, januaryProductAnalysis, marchProductAnalysis, mayProductAnalysis, type ProductAnalysisItem } from "@/lib/product-analysis";\nimport { juneProductAnalysis } from "@/lib/product-analysis-june";\n',
);

replaceOnce(
  'import { mayCategoryAnalysis } from "@/lib/category-analysis-may";\n',
  'import { mayCategoryAnalysis } from "@/lib/category-analysis-may";\nimport { juneCategoryAnalysis } from "@/lib/category-analysis-june";\n',
);

replaceOnce(
  'import { monthCompareMay } from "@/lib/month-compare-may";\n',
  'import { monthCompareMay } from "@/lib/month-compare-may";\nimport { monthCompareJune } from "@/lib/month-compare-june";\n',
);

replaceOnce(
  'type MonthKey = "2026-01" | "2026-02" | "2026-03" | "2026-04" | "2026-05";',
  'type MonthKey = "2026-01" | "2026-02" | "2026-03" | "2026-04" | "2026-05" | "2026-06";',
);

replaceOnce(
  '  { key: "2026-05", label: "2026年5月", shortLabel: "5月" },\n];',
  '  { key: "2026-05", label: "2026年5月", shortLabel: "5月" },\n  { key: "2026-06", label: "2026年6月", shortLabel: "6月" },\n];',
);

replaceOnce(
  '  "2026-05": mayCategoryComparisonRows,\n} as const;',
  '  "2026-05": mayCategoryComparisonRows,\n  "2026-06": [\n    ["居家百货", 2314, 0.259056, 86265, 0.219245],\n    ["服饰", 557, 0.212603, 26210, 0.177474],\n    ["电子电器", 541, 0.296191, 88972, 0.199599],\n    ["医药保健", 227, 0.250625, 8099, 0.241167],\n    ["鞋类", 28, 0.116942, 9063, 0.157256],\n    ["美容个护", 23, 0.226585, 7636, 0.310136],\n    ["钟表珠宝", 23, 0.119269, 3184, 0.236013],\n    ["包类", 12, 0.24241, 3145, 0.205625],\n    ["母婴玩具", 2, -0.057168, 632, 0.079792],\n  ],\n} as const;',
);

replaceOnce(
  '  { key: "2026-05", label: "5月", sales: 315_632.150955, orders: 4_208 },\n] as const;',
  '  { key: "2026-05", label: "5月", sales: 315_632.150955, orders: 4_208 },\n  { key: "2026-06", label: "6月", sales: 365_229.260773, orders: 3_727 },\n] as const;',
);

replaceOnce(
  'const [selectedMonth, setSelectedMonth] = useState<MonthKey>("2026-05");',
  'const [selectedMonth, setSelectedMonth] = useState<MonthKey>("2026-06");',
);

replaceOnce(
  'const monthMeta = monthOptions.find((item) => item.key === selectedMonth) ?? monthOptions[4];',
  'const monthMeta = monthOptions.find((item) => item.key === selectedMonth) ?? monthOptions[5];',
);

replaceOnce(
  'const overviewData = selectedMonth === "2026-05" ? mayOverview : selectedMonth === "2026-04" ? aprilOverview : selectedMonth === "2026-03" ? marchOverview : selectedMonth === "2026-02" ? februaryOverview : januaryOverview;',
  'const overviewData = selectedMonth === "2026-06" ? juneOverview : selectedMonth === "2026-05" ? mayOverview : selectedMonth === "2026-04" ? aprilOverview : selectedMonth === "2026-03" ? marchOverview : selectedMonth === "2026-02" ? februaryOverview : januaryOverview;',
);

replaceOnce(
  'const overviewCustomerPriceCny = selectedMonth === "2026-05" ? mayCustomerPriceCny : selectedMonth === "2026-04" ? aprilCustomerPriceCny : selectedMonth === "2026-03" ? marchCustomerPriceCny : selectedMonth === "2026-02" ? februaryCustomerPriceCny : januaryCustomerPriceCny;',
  'const overviewCustomerPriceCny = selectedMonth === "2026-06" ? juneCustomerPriceCny : selectedMonth === "2026-05" ? mayCustomerPriceCny : selectedMonth === "2026-04" ? aprilCustomerPriceCny : selectedMonth === "2026-03" ? marchCustomerPriceCny : selectedMonth === "2026-02" ? februaryCustomerPriceCny : januaryCustomerPriceCny;',
);

replaceOnce(
  'const selectedAdAnalysis = selectedMonth === "2026-05" ? { store: mayOverview.advertising.store, dateRange: mayOverview.advertising.period, sourceNote: mayOverview.advertising.source } : selectedMonth === "2026-04" ? { store: aprilOverview.advertising.store, dateRange: aprilOverview.advertising.period, sourceNote: aprilOverview.advertising.source } : selectedMonth === "2026-03" ? marchAdAnalysis : selectedMonth === "2026-02" ? februaryAdAnalysis : januaryAdAnalysis;',
  'const selectedAdAnalysis = selectedMonth === "2026-06" ? { store: juneOverview.advertising.store, dateRange: juneOverview.advertising.period, sourceNote: juneOverview.advertising.source } : selectedMonth === "2026-05" ? { store: mayOverview.advertising.store, dateRange: mayOverview.advertising.period, sourceNote: mayOverview.advertising.source } : selectedMonth === "2026-04" ? { store: aprilOverview.advertising.store, dateRange: aprilOverview.advertising.period, sourceNote: aprilOverview.advertising.source } : selectedMonth === "2026-03" ? marchAdAnalysis : selectedMonth === "2026-02" ? februaryAdAnalysis : januaryAdAnalysis;',
);

replaceOnce(
  'const overview = selectedMonth === "2026-05" ? mayOverview : selectedMonth === "2026-04" ? aprilOverview : selectedMonth === "2026-03" ? marchOverview : selectedMonth === "2026-02" ? februaryOverview : januaryOverview;',
  'const overview = selectedMonth === "2026-06" ? juneOverview : selectedMonth === "2026-05" ? mayOverview : selectedMonth === "2026-04" ? aprilOverview : selectedMonth === "2026-03" ? marchOverview : selectedMonth === "2026-02" ? februaryOverview : januaryOverview;',
);

replaceOnce(
  'const customerPriceCny = selectedMonth === "2026-05" ? mayCustomerPriceCny : selectedMonth === "2026-04" ? aprilCustomerPriceCny : selectedMonth === "2026-03" ? marchCustomerPriceCny : selectedMonth === "2026-02" ? februaryCustomerPriceCny : januaryCustomerPriceCny;',
  'const customerPriceCny = selectedMonth === "2026-06" ? juneCustomerPriceCny : selectedMonth === "2026-05" ? mayCustomerPriceCny : selectedMonth === "2026-04" ? aprilCustomerPriceCny : selectedMonth === "2026-03" ? marchCustomerPriceCny : selectedMonth === "2026-02" ? februaryCustomerPriceCny : januaryCustomerPriceCny;',
);

replaceOnce(
  'const compareData = selectedMonth === "2026-05" ? monthCompareMay : selectedMonth === "2026-04" ? monthCompareApril : selectedMonth === "2026-03" ? monthCompareMarch : selectedMonth === "2026-02" ? monthCompareFebruary : monthCompare;',
  'const compareData = selectedMonth === "2026-06" ? monthCompareJune : selectedMonth === "2026-05" ? monthCompareMay : selectedMonth === "2026-04" ? monthCompareApril : selectedMonth === "2026-03" ? monthCompareMarch : selectedMonth === "2026-02" ? monthCompareFebruary : monthCompare;',
);

replaceOnce(
  'const previousMonthLabel = selectedMonth === "2026-05" ? "2026年4月" : selectedMonth === "2026-04" ? "2026年3月" : selectedMonth === "2026-03" ? "2026年2月" : selectedMonth === "2026-02" ? "2026年1月" : "2025年12月";',
  'const previousMonthLabel = selectedMonth === "2026-06" ? "2026年5月" : selectedMonth === "2026-05" ? "2026年4月" : selectedMonth === "2026-04" ? "2026年3月" : selectedMonth === "2026-03" ? "2026年2月" : selectedMonth === "2026-02" ? "2026年1月" : "2025年12月";',
);

replaceOnce(
  'const data = selectedMonth === "2026-05" ? monthCompareMay : selectedMonth === "2026-04" ? monthCompareApril : selectedMonth === "2026-03" ? monthCompareMarch : selectedMonth === "2026-02" ? monthCompareFebruary : monthCompare;',
  'const data = selectedMonth === "2026-06" ? monthCompareJune : selectedMonth === "2026-05" ? monthCompareMay : selectedMonth === "2026-04" ? monthCompareApril : selectedMonth === "2026-03" ? monthCompareMarch : selectedMonth === "2026-02" ? monthCompareFebruary : monthCompare;',
);

replaceOnce(
  'const data = selectedMonth === "2026-05" ? mayProductAnalysis : selectedMonth === "2026-04" ? aprilProductAnalysis : selectedMonth === "2026-03" ? marchProductAnalysis : selectedMonth === "2026-02" ? februaryProductAnalysis : januaryProductAnalysis;',
  'const data = selectedMonth === "2026-06" ? juneProductAnalysis : selectedMonth === "2026-05" ? mayProductAnalysis : selectedMonth === "2026-04" ? aprilProductAnalysis : selectedMonth === "2026-03" ? marchProductAnalysis : selectedMonth === "2026-02" ? februaryProductAnalysis : januaryProductAnalysis;',
);

replaceOnce(
  'const categoryAnalysis = selectedMonth === "2026-05" ? mayCategoryAnalysis : selectedMonth === "2026-04" ? aprilCategoryAnalysis : selectedMonth === "2026-03" ? marchCategoryAnalysis : selectedMonth === "2026-02" ? februaryCategoryAnalysis : januaryCategoryAnalysis;',
  'const categoryAnalysis = selectedMonth === "2026-06" ? juneCategoryAnalysis : selectedMonth === "2026-05" ? mayCategoryAnalysis : selectedMonth === "2026-04" ? aprilCategoryAnalysis : selectedMonth === "2026-03" ? marchCategoryAnalysis : selectedMonth === "2026-02" ? februaryCategoryAnalysis : januaryCategoryAnalysis;',
);

fs.writeFileSync(dashboardPath, source);
console.log('Applied June dashboard patch');
