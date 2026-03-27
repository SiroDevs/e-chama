import * as React from "react";
import { LineChart, Line, Area, ResponsiveContainer } from "recharts";
import Link from "next/link";

export type StatCardProps = {
  title: string;
  link: string;
  value: string;
  interval: string;
  trend: "up" | "down" | "neutral";
  data: number[];
};

export function StatCard({
  title,
  link,
  value,
  interval,
  trend,
  data,
}: StatCardProps) {
  const chartData = data.map((point, index) => ({
    name: index,
    value: point,
  }));

  const trendColors = {
    up: "#10b981",
    down: "#ef4444",
    neutral: "#9ca3af",
  };

  const trendBgClasses = {
    up: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    down: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  };

  const trendValues = { up: "+25%", down: "-25%", neutral: "0%" };
  const chartColor = trendColors[trend];
  const trendBgClass = trendBgClasses[trend];

  return (
    <div className="h-full flex-grow border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {interval}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {value}
            </p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trendBgClass}`}>
              {trendValues[trend]}
            </span>
          </div>

          <div className="w-full h-[50px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id={`colorGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  fill={`url(#colorGradient-${title})`}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {link && (
            <div className="w-full mt-2">
              <Link href={link} passHref>
                <button className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  See More
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
