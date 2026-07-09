const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(process.cwd(), 'components', 'dashboard.tsx');
let source = fs.readFileSync(dashboardPath, 'utf8');

const replaceOnce = (from, to) => {
  if (source.includes(to)) return;
  if (!source.includes(from)) {
    throw new Error(`June ad dashboard patch pattern not found: ${from.slice(0, 140)}`);
  }
  source = source.replace(from, to);
};

replaceOnce(
  'import { mayAdAnalysis } from "@/lib/ad-analysis-may";\n',
  'import { mayAdAnalysis } from "@/lib/ad-analysis-may";\nimport { juneAdAnalysis } from "@/lib/ad-analysis-june";\n',
);

replaceOnce(
  'const selectedAdAnalysis = selectedMonth === "2026-06" ? { store: juneOverview.advertising.store, dateRange: juneOverview.advertising.period, sourceNote: juneOverview.advertising.source } : selectedMonth === "2026-05" ? { store: mayOverview.advertising.store, dateRange: mayOverview.advertising.period, sourceNote: mayOverview.advertising.source } : selectedMonth === "2026-04" ? { store: aprilOverview.advertising.store, dateRange: aprilOverview.advertising.period, sourceNote: aprilOverview.advertising.source } : selectedMonth === "2026-03" ? marchAdAnalysis : selectedMonth === "2026-02" ? februaryAdAnalysis : januaryAdAnalysis;',
  'const selectedAdAnalysis = selectedMonth === "2026-06" ? juneAdAnalysis : selectedMonth === "2026-05" ? { store: mayOverview.advertising.store, dateRange: mayOverview.advertising.period, sourceNote: mayOverview.advertising.source } : selectedMonth === "2026-04" ? { store: aprilOverview.advertising.store, dateRange: aprilOverview.advertising.period, sourceNote: aprilOverview.advertising.source } : selectedMonth === "2026-03" ? marchAdAnalysis : selectedMonth === "2026-02" ? februaryAdAnalysis : januaryAdAnalysis;',
);

replaceOnce(
  'const data = selectedMonth === "2026-05" ? mayAdAnalysis : selectedMonth === "2026-04" ? aprilAdAnalysis : selectedMonth === "2026-03" ? marchAdAnalysis : selectedMonth === "2026-02" ? februaryAdAnalysis : januaryAdAnalysis;',
  'const data = selectedMonth === "2026-06" ? juneAdAnalysis : selectedMonth === "2026-05" ? mayAdAnalysis : selectedMonth === "2026-04" ? aprilAdAnalysis : selectedMonth === "2026-03" ? marchAdAnalysis : selectedMonth === "2026-02" ? februaryAdAnalysis : januaryAdAnalysis;',
);

fs.writeFileSync(dashboardPath, source);
console.log('Applied June ad dashboard patch');
