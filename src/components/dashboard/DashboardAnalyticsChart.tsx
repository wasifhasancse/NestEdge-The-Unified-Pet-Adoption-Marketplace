"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardAnalyticsChartProps {
  totalListings: number;
  activeListings: number;
  adoptedListings: number;
  totalReceived: number;
  pendingReceived: number;
  approvedReceived: number;
  rejectedReceived: number;
}

const BAR_COLORS = ["#0d9488", "#14b8a6", "#34d399"];
const PIE_COLORS = ["#f59e0b", "#10b981", "#f43f5e"];

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "12px",
  color: "hsl(var(--foreground))",
};

export default function DashboardAnalyticsChart({
  totalListings,
  activeListings,
  adoptedListings,
  totalReceived,
  pendingReceived,
  approvedReceived,
  rejectedReceived,
}: DashboardAnalyticsChartProps) {
  const listingData = [
    { name: "Listed", value: totalListings },
    { name: "Available", value: activeListings },
    { name: "Adopted", value: adoptedListings },
  ];

  const requestStatusData = [
    { name: "Pending", value: pendingReceived },
    { name: "Approved", value: approvedReceived },
    { name: "Rejected", value: rejectedReceived },
  ];

  return (
    <section className="rounded-3xl border border-border bg-card/80 p-4 sm:p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Dashboard Analytics
          </p>
          <h2 className="mt-1 text-lg font-bold text-foreground sm:text-xl">
            Listings & Request Insights
          </h2>
        </div>
        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Total Requests: {totalReceived}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Listing Distribution
          </p>
          <div className="h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={listingData} barSize={36}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(13, 148, 136, 0.08)" }}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {listingData.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={BAR_COLORS[index % BAR_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Request Status Breakdown
          </p>
          <div className="h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip contentStyle={tooltipStyle} />
                <Pie
                  data={requestStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={4}
                >
                  {requestStatusData.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
            {requestStatusData.map((item, index) => (
              <div key={item.name} className="rounded-xl border border-border/70 bg-card p-2">
                <p className="font-semibold" style={{ color: PIE_COLORS[index] }}>
                  {item.name}
                </p>
                <p className="mt-0.5 text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}