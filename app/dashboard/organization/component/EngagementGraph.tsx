"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { Button } from "@/app/components/ui/button";

interface EngagementGraphProps {
  data: { date: string; value: number }[];
  title?: string;
}

export default function EngagementGraph({
  data,
  title = "Engagement Graph",
}: EngagementGraphProps) {
  return (
    <section>
      <div>
        {title && <h2 className="font-semibold mb-1 text-2xl">{title}</h2>}
      </div>

      <div className="bg-background p-4 rounded-xl w-full text-text-primary mt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-gray">Ticket Sales</p>
          </div>
          <Button>Sort by</Button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2A4A" />
            <XAxis dataKey="date" stroke="#B0B3C0" />
            <YAxis stroke="#B0B3C0" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0B1537",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4D67FE" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4D67FE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4D67FE"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#4D67FE",
                stroke: "#0B1537",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#4D67FE",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#colorValue)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
