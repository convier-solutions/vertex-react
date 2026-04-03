import React from 'react';
import { MdOutlineRadar, MdTrendingUp, MdErrorOutline, MdInfoOutline } from 'react-icons/md';
import { motion } from 'framer-motion';
import './InsightsSection.css';

const IconMap = {
  warning: <MdErrorOutline className="sig-icon warn" />,
  success: <MdTrendingUp className="sig-icon success" />,
  info: <MdInfoOutline className="sig-icon info" />,
};

export default function PrioritySignals({ signals }) {
  return (
    <div className="signals-container">
      <div className="signals-header">
        <div className="signals-title-group">
          <div className="pulse-indicator" />
          <h3>System Pulse</h3>
        </div>
        <span className="live-tag">
          <MdOutlineRadar /> Scanning Live
        </span>
      </div>

      <div className="signals-feed">
        {signals.map((sig, i) => (
          <motion.div 
            key={i} 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`signal-item ${sig.tone}`}
          >
            <div className="signal-visual">
              {IconMap[sig.tone] || IconMap.info}
              <div className="signal-line" />
            </div>
            <div className="signal-content">
              <div className="signal-meta">
                <span className="signal-label">{sig.title}</span>
                <span className="signal-time">Just now</span>
              </div>
              <p className="signal-detail">{sig.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}