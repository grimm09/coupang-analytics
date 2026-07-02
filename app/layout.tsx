import type { Metadata } from "next";
import GlobalWatermark from "@/components/global-watermark";
import "./globals.css";
import "./logo-fix.css";
import "./watermark.css";

export const metadata: Metadata = {
  title: "Coupang 经营分析",
  description: "多店铺经营与广告数据分析平台",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <GlobalWatermark />
      </body>
    </html>
  );
}
