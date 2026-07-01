"use client";

import { useEffect, useRef } from "react";
import type { EChartsOption } from "echarts";
import type { EChartsType } from "echarts/core";

export default function EChart({ option, height = 320 }: { option: EChartsOption; height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: EChartsType | undefined;
    let disposed = false;

    const setup = async () => {
      const echarts = await import("echarts/core");
      const charts = await import("echarts/charts");
      const components = await import("echarts/components");
      const renderers = await import("echarts/renderers");
      echarts.use([
        charts.BarChart,
        charts.LineChart,
        charts.PieChart,
        charts.ScatterChart,
        charts.RadarChart,
        components.GridComponent,
        components.TooltipComponent,
        components.LegendComponent,
        components.GraphicComponent,
        components.RadarComponent,
        renderers.CanvasRenderer,
      ]);
      if (disposed || !containerRef.current) return;
      chart = echarts.init(containerRef.current);
      chart.setOption(option);
      const observer = new ResizeObserver(() => chart?.resize());
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    };

    let cleanup: (() => void) | undefined;
    setup().then((value) => { cleanup = value; });
    return () => {
      disposed = true;
      cleanup?.();
      chart?.dispose();
    };
  }, [option]);

  return <div ref={containerRef} style={{ height }} role="img" aria-label="经营趋势图" />;
}
