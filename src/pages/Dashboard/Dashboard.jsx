import React, { useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  MdFileDownload,
} from "react-icons/md";

// Sub-components
import KPISnapshot from "../../components/KPISnapshot";
import VelocityChart from "../../components/VelocityChart";
import StatusTiles from "../../components/StatusTiles";
import RecentOrdersTable from "../../components/RecentOrdersTable";
import DateRangePicker from "../../components/DateRangePicker";

import "./Dashboard.css";
import PrioritySignals from "../../components/InsightsSection";
import { statusData } from "../../constant/ordersData";

// --- Utilities ---
const TOTAL_ACTIVE_ORDERS = 1860;

const normalizeToSvg = (data, { width, height, padX, padY }) => {
  if (!data.length) return [];
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return data.map((d, i) => ({
    x: padX + (i * (width - 2 * padX)) / (data.length - 1 || 1),
    y: height - padY - ((d.value - min) / range) * (height - 2 * padY),
    value: d.value,
    date: d.date,
  }));
};

export default function Dashboard() {
  const [filterMode, setFilterMode] = useState("all"); // 'all' or 'range'
  const [dateRange, setDateRange] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null);

  const days = useMemo(() => {
    const start =
      filterMode === "all" || !dateRange?.start
        ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        : dateRange.start.toDate("UTC");
    const end =
      filterMode === "all" || !dateRange?.end
        ? new Date()
        : dateRange.end.toDate("UTC");
    const arr = [];
    let current = new Date(start);
    while (current <= end) {
      arr.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return arr;
  }, [filterMode, dateRange]);

  const velocitySeries = useMemo(() => {
    return days.map((date) => ({
      date,
      value: Math.floor(Math.random() * 50) + 100,
    }));
  }, [days]);

  const mockOrders = useMemo(() => {
    const clients = [
      "Foot Clinic East",
      "Apex Ortho",
      "BioStride Lab",
      "Metro Physio",
    ];
    const patients = [
      "James Wilson",
      "Sarah Chen",
      "Michael Ross",
      "Elena Rodriguez",
    ];
    const orthoticTypes = [
      "UCBL",
      "Functional Diabetic",
      "Sports Performance",
      "Accommodative",
    ];
    const topCovers = [
      "Blue Plastazote",
      "Black Neoprene",
      "Multi-color EVA",
      "Leatherette",
    ];
    const statuses = [
      "open",
      "in_process",
      "file_ready",
      "in_production",
      "ready_to_ship",
      "shipped",
    ];

    return Array.from({ length: 10 }).map((_, i) => ({
      id: `${8420 + i}`,
      prevId: Math.random() > 0.8 ? `${7100 + i}` : null,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      client: clients[Math.floor(Math.random() * clients.length)],
      createdDate: "Oct 24, 2023",
      patientName: patients[Math.floor(Math.random() * patients.length)],
      productCount: Math.floor(Math.random() * 3) + 1,
      orthoticType:
        orthoticTypes[Math.floor(Math.random() * orthoticTypes.length)],
      topCover: topCovers[Math.floor(Math.random() * topCovers.length)],
      quantity: Math.floor(Math.random() * 4) + 1,
      isRush: Math.random() > 0.8,
    }));
  }, []);

  const kpis = useMemo(
    () => ({
      totalOrders: velocitySeries.reduce((s, p) => s + p.value, 0),
      avgTurnaround: 4.2,
      backlog: 145,
      minis: {
        miniOrders: velocitySeries
          .slice(-7)
          .map((v, i) => ({
            x: i * 18,
            y: Math.random() * 30,
            value: v.value,
          })),
        miniTat: velocitySeries
          .slice(-7)
          .map((v, i) => ({
            x: i * 18,
            y: Math.random() * 30,
            value: Math.random(),
          })),
        miniBacklog: velocitySeries
          .slice(-7)
          .map((v, i) => ({
            x: i * 18,
            y: Math.random() * 30,
            value: Math.random(),
          })),
      },
    }),
    [velocitySeries],
  );

  const normalizedPrimary = useMemo(() => {
    return normalizeToSvg(velocitySeries, {
      width: 860,
      height: 240,
      padX: 28,
      padY: 22,
    });
  }, [velocitySeries]);

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-container"
    >
      {/* --- PAGE HEADER --- */}
      <div className="db-header__title">
        <h1>Dashboard</h1>
    
      </div>

      {/* --- PERFORMANCE METRICS SECTION (FILTERABLE) --- */}
      <section className="db-performance-section">
        <div className="db-section-header">
          <div className="db-section-title-group">
            <h2>Performance Metrics</h2>
            <p>Data reflects the selected time period</p>
          </div>
          <div className="db-section-actions">
            <div className="db-segmented-control">
              <button
                className={`db-segment ${filterMode === "all" ? "active" : ""}`}
                onClick={() => setFilterMode("all")}
              >
                All Time
              </button>
              <button
                className={`db-segment ${filterMode === "range" ? "active" : ""}`}
                onClick={() => setFilterMode("range")}
              >
                Date Range
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {filterMode === "range" && (
                <Motion.div
                  key="date-picker"
                  initial={{ opacity: 0, width: 0, x: -10 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: 'visible', minWidth: filterMode === "range" ? '220px' : '0' }}
                  className="db-date-picker-wrapper"
                >
                  <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    placeholder="Select range"
                  />
                </Motion.div>
              )}
            </AnimatePresence>

            <button
              className="db-btn-export"
              onClick={() => alert("Exporting metrics...")}
            >
              <MdFileDownload />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="db-metrics-card-group">
          <StatusTiles statusData={statusData} />
          
          <div className="db-metrics-chart-wrapper">
            <VelocityChart
              metricMode="orders"
              normalizedPrimary={normalizedPrimary}
              days={days}
              trend={{ pct: 12.5, dir: "up" }}
              hoverIdx={hoverIdx}
              onHoverChange={setHoverIdx}
            />
          </div>
        </div>
      </section>

      {/* --- LIVE OVERVIEW SECTION (STATIC) --- */}
      <div className="db-live-overview-stack">
        <section className="db-recent-orders-section">
          
          <div className="db-orders-card">
            <RecentOrdersTable orders={mockOrders} />
          </div>
        </section>

        <div className="db-live-secondary-metrics">
          <section className="db-kpi-live-section">
            
            <div className="db-kpi-card-wrapper">
              <KPISnapshot kpis={kpis} trend={{ pct: 12.5, dir: "up" }} />
            </div>
          </section>

          <section className="db-system-pulse-section">
           
            <div className="db-pulse-card">
              <PrioritySignals
                signals={[
                  {
                    title: "Production Bottleneck",
                    detail: "3D Printing queue is at 92%.",
                    tone: "warning",
                  },
                  {
                    title: "Material Update",
                    detail: "Aluminum 6061 restocked.",
                    tone: "success",
                  },
                  {
                    title: "Logistics",
                    detail: "Carrier delays in North region.",
                    tone: "info",
                  },
                  {
                    title: "Production Bottleneck",
                    detail: "3D Printing queue is at 92%.",
                    tone: "warning",
                  },
                  {
                    title: "Material Update",
                    detail: "Aluminum 6061 restocked.",
                    tone: "success",
                  },
                  {
                    title: "Logistics",
                    detail: "Carrier delays in North region.",
                    tone: "info",
                  },
                  {
                    title: "Production Bottleneck",
                    detail: "3D Printing queue is at 92%.",
                    tone: "warning",
                  },
               
           
                ]}
              />
            </div>
          </section>
        </div>
      </div>
    </Motion.div>
  );
}
