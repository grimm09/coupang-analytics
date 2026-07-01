from __future__ import annotations

import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from matplotlib.ticker import FuncFormatter


def krw(value: float) -> str:
    return f"₩{value:,.0f}"


def main(input_file: str, output_file: str) -> None:
    store = json.loads(Path(input_file).read_text(encoding="utf-8"))
    metrics = store["metrics"]
    months = [f'{row["month"]}月' for row in metrics]
    sales = [row["totalSales"] for row in metrics]
    ad_sales = [row["adSales"] for row in metrics]
    spend = [row["adSpend"] for row in metrics]
    roas = [row["roas"] for row in metrics]

    plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei", "DejaVu Sans"]
    plt.rcParams["axes.unicode_minus"] = False
    blue, orange, teal, ink = "#1769ed", "#ff6b35", "#12a4b6", "#152238"

    with PdfPages(output_file) as pdf:
        fig = plt.figure(figsize=(11.69, 8.27), facecolor="white")
        grid = fig.add_gridspec(3, 2, height_ratios=[0.55, 2.1, 1.6], hspace=0.5, wspace=0.3)
        title = fig.add_subplot(grid[0, :]); title.axis("off")
        title.text(0, .8, f'{store["name"]} · 2026年1–5月经营报告', fontsize=22, weight="bold", color=ink)
        title.text(0, .25, "数据来源：Coupang 店铺整体广告报告截图｜由 Matplotlib 自动生成", fontsize=9, color="#667085")

        ax = fig.add_subplot(grid[1, :])
        x = range(len(months))
        ax.bar([i - .18 for i in x], sales, width=.36, color=blue, label="总销售额")
        ax.bar([i + .18 for i in x], ad_sales, width=.36, color=teal, label="广告转化销售额")
        ax.set_xticks(list(x), months)
        ax.yaxis.set_major_formatter(FuncFormatter(lambda value, _: f"{value/1_000_000:.0f}M"))
        ax.set_title("月度销售趋势", loc="left", fontsize=13, weight="bold", color=ink)
        ax.grid(axis="y", alpha=.18); ax.spines[["top", "right"]].set_visible(False); ax.legend(frameon=False, ncols=2)

        ax2 = fig.add_subplot(grid[2, 0])
        ax2.plot(months, roas, color=orange, linewidth=2.7, marker="o")
        ax2.fill_between(months, roas, color=orange, alpha=.08)
        ax2.set_title("广告支出回报率（ROAS）", loc="left", fontsize=12, weight="bold", color=ink)
        ax2.yaxis.set_major_formatter(FuncFormatter(lambda value, _: f"{value:.0f}%"))
        ax2.grid(axis="y", alpha=.18); ax2.spines[["top", "right"]].set_visible(False)

        ax3 = fig.add_subplot(grid[2, 1]); ax3.axis("off")
        latest = metrics[-1]
        rows = [
            ("5月总销售额", krw(latest["totalSales"])),
            ("广告转化销售额", krw(latest["adSales"])),
            ("广告费", krw(latest["adSpend"])),
            ("曝光 / 点击", f'{latest["impressions"]:,} / {latest["clicks"]:,}'),
            ("转化销量", f'{latest["conversions"]:,}'),
        ]
        ax3.set_title("5月核心指标", loc="left", fontsize=12, weight="bold", color=ink)
        for index, (label, value) in enumerate(rows):
            y = .82 - index * .17
            ax3.text(.02, y, label, color="#667085", fontsize=9)
            ax3.text(.98, y, value, color=ink, fontsize=11, weight="bold", ha="right")
            ax3.axhline(y - .06, color="#e6eaf0", linewidth=.8)
        pdf.savefig(fig, bbox_inches="tight"); plt.close(fig)

        fig, ax = plt.subplots(figsize=(11.69, 8.27), facecolor="white")
        ax.axis("off")
        ax.text(0, 1.04, "月度指标明细", transform=ax.transAxes, fontsize=20, weight="bold", color=ink)
        table_rows = [[
            row["month"], krw(row["totalSales"]), krw(row["adSales"]), krw(row["adSpend"]),
            f'{row["impressions"]:,}', f'{row["clicks"]:,}', f'{row["conversions"]:,}', f'{row["roas"]:.2f}%'
        ] for row in metrics]
        table = ax.table(
            cellText=table_rows,
            colLabels=["月份", "总销售额", "广告销售额", "广告费", "曝光", "点击", "转化", "ROAS"],
            cellLoc="right", colLoc="right", loc="upper center", bbox=[0, .37, 1, .55]
        )
        table.auto_set_font_size(False); table.set_fontsize(9)
        for (row, _), cell in table.get_celld().items():
            cell.set_edgecolor("#e6eaf0")
            cell.set_facecolor("#f5f8fc" if row == 0 else "white")
            if row == 0: cell.set_text_props(weight="bold", color=ink)
        ax.text(0, .24, "口径说明", transform=ax.transAxes, fontsize=12, weight="bold", color=ink)
        ax.text(0, .18, "总销售额、广告转化销售额、广告费和流量指标均来自每月店铺整体广告报告截图。", transform=ax.transAxes, fontsize=9, color="#667085")
        ax.text(0, .13, "产品与品类经营分析 Excel 当前为空表，因此本报告暂不展示产品排行和品类结构。", transform=ax.transAxes, fontsize=9, color="#667085")
        pdf.savefig(fig, bbox_inches="tight"); plt.close(fig)

        fig, ax = plt.subplots(figsize=(11.69, 8.27), facecolor="white")
        ax.axis("off")
        ax.text(0, .95, "经营洞察与后续动作", transform=ax.transAxes, fontsize=20, weight="bold", color=ink)
        previous = metrics[-2] if len(metrics) > 1 else metrics[-1]
        sales_change = (latest["totalSales"] - previous["totalSales"]) / previous["totalSales"] * 100
        ad_share = latest["adSales"] / latest["totalSales"] * 100
        cvr = latest["conversions"] / latest["clicks"] * 100
        insights = [
            ("01  销售增长", f"5月总销售额环比 {sales_change:+.1f}%，当前规模为 {krw(latest['totalSales'])}。"),
            ("02  广告效率", f"5月 ROAS 为 {latest['roas']:.2f}%，广告销售占总销售额 {ad_share:.1f}%。"),
            ("03  转化质量", f"{latest['clicks']:,} 次点击带来 {latest['conversions']:,} 个转化，CVR 为 {cvr:.2f}%。"),
            ("04  数据建设", "补充有效的产品与品类明细表后，可自动扩展产品排行、品类结构和利润分析。"),
        ]
        for index, (heading, body) in enumerate(insights):
            y = .77 - index * .17
            ax.text(.02, y, heading, transform=ax.transAxes, fontsize=13, weight="bold", color=blue if index != 3 else orange)
            ax.text(.02, y - .055, body, transform=ax.transAxes, fontsize=10, color="#475467")
            ax.axhline(y - .095, xmin=.02, xmax=.98, color="#e6eaf0", linewidth=.9)
        ax.text(.02, .06, "自动生成，仅用于经营分析。", transform=ax.transAxes, fontsize=8, color="#98a2b3")
        pdf.savefig(fig, bbox_inches="tight"); plt.close(fig)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
