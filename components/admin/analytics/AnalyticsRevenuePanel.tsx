"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  CreditCard,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react";

export interface AnalyticsRevenuePanelData {
  revenue?: number;
  totalRevenue?: number;
  monthlyRevenue?: number;
  todayRevenue?: number;

  subscriptions?: number;
  activeSubscriptions?: number;

  payments?: number;
  successfulPayments?: number;

  averageOrderValue?: number;

  revenueChange?: number;
  subscriptionChange?: number;
}

interface AnalyticsRevenuePanelProps {
  data?: AnalyticsRevenuePanelData;
}

function number(value?: number) {
  return Number(value) || 0;
}

function currency(value?: number) {
  return number(value).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

function percentage(value?: number) {
  return `${number(value).toFixed(1)}%`;
}

function ChangeIndicator({
  value,
}: {
  value?: number;
}) {
  const change = number(value);

  if (change === 0) {
    return (
      <span className="text-xs text-gray-600">
        No change
      </span>
    );
  }

  const positive = change > 0;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${
        positive
          ? "text-emerald-400"
          : "text-red-400"
      }`}
    >
      {positive ? (
        <ArrowUpRight
          size={13}
          strokeWidth={1.8}
        />
      ) : (
        <ArrowDownRight
          size={13}
          strokeWidth={1.8}
        />
      )}

      {Math.abs(change).toFixed(1)}%
    </span>
  );
}

function RevenueMetric({
  label,
  value,
  icon: Icon,
  accent = "navy",
  description,
  change,
}: {
  label: string;
  value: string;
  icon: typeof CircleDollarSign;
  accent?: "navy" | "orange" | "green";
  description?: string;
  change?: number;
}) {
  const iconClass = {
    navy: "bg-[#163C80]/15 text-[#7FA1E0]",
    orange: "bg-[#EA661B]/10 text-[#EA661B]",
    green: "bg-emerald-500/10 text-emerald-400",
  }[accent];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500">
            {label}
          </p>

          <p className="mt-1.5 truncate text-xl font-bold tracking-tight text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon
            size={16}
            strokeWidth={1.8}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        {description ? (
          <p className="truncate text-[10px] text-gray-600">
            {description}
          </p>
        ) : (
          <span />
        )}

        {typeof change === "number" && (
          <ChangeIndicator value={change} />
        )}
      </div>
    </div>
  );
}

export default function AnalyticsRevenuePanel({
  data,
}: AnalyticsRevenuePanelProps) {
  const revenue = number(
    data?.revenue ??
      data?.totalRevenue
  );

  const monthlyRevenue = number(
    data?.monthlyRevenue
  );

  const todayRevenue = number(
    data?.todayRevenue
  );

  const subscriptions = number(
    data?.subscriptions
  );

  const activeSubscriptions =
    number(
      data?.activeSubscriptions
    );

  const payments = number(
    data?.payments
  );

  const successfulPayments =
    number(
      data?.successfulPayments
    );

  const averageOrderValue =
    number(data?.averageOrderValue);

  const revenueChange =
    number(data?.revenueChange);

  const subscriptionChange =
    number(data?.subscriptionChange);

  const paymentSuccessRate =
    payments > 0
      ? (successfulPayments / payments) *
        100
      : 0;

  const hasRevenueData =
    revenue > 0 ||
    monthlyRevenue > 0 ||
    todayRevenue > 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CircleDollarSign
              size={17}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              Revenue Intelligence
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Subscription, payment and platform monetization performance.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <TrendingUp
            size={13}
            strokeWidth={1.8}
          />

          Revenue
        </div>
      </div>

      {/* NO DATA */}

      {!hasRevenueData && (
        <div className="border-b border-white/[0.06] px-5 py-6">
          <div className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#163C80]/10 text-[#7FA1E0]">
              <CreditCard
                size={17}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300">
                Revenue data not available
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Connect subscription and payment analytics to display revenue intelligence here.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PRIMARY METRICS */}

      <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
        <RevenueMetric
          label="Total Revenue"
          value={currency(revenue)}
          icon={IndianRupee}
          accent="orange"
          description="Recorded platform revenue"
          change={revenueChange}
        />

        <RevenueMetric
          label="This Month"
          value={currency(monthlyRevenue)}
          icon={TrendingUp}
          accent="navy"
          description="Current monthly revenue"
        />

        <RevenueMetric
          label="Today"
          value={currency(todayRevenue)}
          icon={Activity}
          accent="green"
          description="Revenue generated today"
        />

        <RevenueMetric
          label="Average Order"
          value={currency(
            averageOrderValue
          )}
          icon={CircleDollarSign}
          accent="navy"
          description="Average successful payment"
        />
      </div>

      {/* SUBSCRIPTION INTELLIGENCE */}

      <div className="grid gap-4 border-t border-white/[0.06] p-5 sm:grid-cols-2">
        <div className="rounded-xl bg-white/[0.02] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Users
                  size={14}
                  strokeWidth={1.8}
                  className="text-gray-500"
                />

                <p className="text-xs text-gray-500">
                  Active Subscriptions
                </p>
              </div>

              <p className="mt-2 text-xl font-semibold text-white">
                {activeSubscriptions.toLocaleString()}
              </p>
            </div>

            <ChangeIndicator
              value={subscriptionChange}
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] text-gray-600">
              Total subscriptions
            </span>

            <span className="text-xs text-gray-500">
              {subscriptions.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-white/[0.02] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CreditCard
                  size={14}
                  strokeWidth={1.8}
                  className="text-gray-500"
                />

                <p className="text-xs text-gray-500">
                  Payment Success
                </p>
              </div>

              <p className="mt-2 text-xl font-semibold text-white">
                {percentage(
                  paymentSuccessRate
                )}
              </p>
            </div>

            <span className="text-xs text-gray-600">
              {successfulPayments.toLocaleString()} successful
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] text-gray-600">
              Successful payments
            </span>

            <span className="text-xs text-gray-500">
              {payments.toLocaleString()} total
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <div className="border-t border-white/[0.06] px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-gray-400">
              Monetization status
            </p>

            <p className="mt-1 text-[10px] text-gray-600">
              Revenue metrics remain optional and do not affect editorial analytics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-xs text-gray-500">
              Analytics ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

