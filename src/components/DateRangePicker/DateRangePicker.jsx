import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  RangeCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarCell,
  Button as CalBtn,
  Heading
} from 'react-aria-components';
import {
  today as getTodayDate,
  getLocalTimeZone,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  CalendarDate,
} from '@internationalized/date';
import { MdCalendarToday, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import './DateRangePicker.css';

const TZ = getLocalTimeZone();

const PRESETS = [
  { label: 'Today', getRange: () => { const t = getTodayDate(TZ); return { start: t, end: t }; } },
  { label: 'Yesterday', getRange: () => { const t = getTodayDate(TZ).subtract({ days: 1 }); return { start: t, end: t }; } },
  { label: 'This week', getRange: () => { const t = getTodayDate(TZ); return { start: startOfWeek(t, 'en-US'), end: endOfWeek(t, 'en-US') }; } },
  { label: 'Last week', getRange: () => { const t = getTodayDate(TZ).subtract({ weeks: 1 }); return { start: startOfWeek(t, 'en-US'), end: endOfWeek(t, 'en-US') }; } },
  { label: 'This month', getRange: () => { const t = getTodayDate(TZ); return { start: startOfMonth(t), end: endOfMonth(t) }; } },
  { label: 'Last month', getRange: () => { const t = getTodayDate(TZ).subtract({ months: 1 }); return { start: startOfMonth(t), end: endOfMonth(t) }; } },
  { label: 'This year', getRange: () => { const t = getTodayDate(TZ); return { start: startOfYear(t), end: endOfYear(t) }; } },
  { label: 'Last year', getRange: () => { const t = getTodayDate(TZ).subtract({ years: 1 }); return { start: startOfYear(t), end: endOfYear(t) }; } },
  { label: 'All time', getRange: () => ({ start: new CalendarDate(2020, 1, 1), end: getTodayDate(TZ) }) },
];

function formatDisplay(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date.toDate(TZ));
}

function formatShort(date) {
  if (!date) return '';
  const d = date.toDate(TZ);
  return `${d.getMonth() + 1} / ${String(d.getDate()).padStart(2, '0')} / ${d.getFullYear()}`;
}

/**
 * FIXED: Moved logic inside the render prop to correctly access 'isSelected', etc.
 */
function CustomCell({ date, todayDate }) {
  return (
    <CalendarCell 
      date={date} 
      className={({ isOutsideVisibleRange }) => `drp-cell ${isOutsideVisibleRange ? 'outside' : ''}`}
    >
      {({ formattedDate, isSelected, isSelectionStart, isSelectionEnd, isOutsideVisibleRange }) => {
        if (isOutsideVisibleRange) return null;

        const isRange = isSelected && !isSelectionStart && !isSelectionEnd;
        const isEndpoint = isSelectionStart || isSelectionEnd;
        const isToday = date.compare(todayDate) === 0;

        return (
          <>
            {isSelected && (
              <span 
                className="drp-range-band" 
                style={{
                  left: (isSelectionStart && !isSelectionEnd) ? '50%' : '0',
                  right: (isSelectionEnd && !isSelectionStart) ? '50%' : '0',
                  display: (isSelectionStart && isSelectionEnd) ? 'none' : 'block',
                  width: isRange ? '100%' : '50%'
                }}
              />
            )}
            <span className={`drp-cell-circle ${isEndpoint ? 'endpoint' : ''} ${isRange ? 'in-range' : ''}`}>
              {formattedDate}
              {isToday && (
                <span className="drp-today-dot" style={{ backgroundColor: isEndpoint ? 'rgba(255,255,255,0.8)' : '#7c3aed' }} />
              )}
            </span>
          </>
        );
      }}
    </CalendarCell>
  );
}

function MonthGrid({ offset, todayDate }) {
  return (
    <CalendarGrid offset={offset} style={{ borderCollapse: 'collapse' }}>
      <CalendarGridHeader>
        {(day) => <CalendarHeaderCell className="drp-cell-header">{day}</CalendarHeaderCell>}
      </CalendarGridHeader>
      <CalendarGridBody>
        {(date) => <CustomCell date={date} todayDate={todayDate} />}
      </CalendarGridBody>
    </CalendarGrid>
  );
}

export default function DateRangePicker({ value, onChange, placeholder = 'Pick a date range' }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? null);
  const [focusedDate, setFocusedDate] = useState(getTodayDate(TZ));
  
  const today = useMemo(() => getTodayDate(TZ), []);

  // Sync draft when external value changes
  useEffect(() => { setDraft(value ?? null); }, [value]);

  const apply = () => { if (draft?.start && draft?.end) { onChange?.(draft); setOpen(false); } };
  const cancel = () => { setDraft(value ?? null); setOpen(false); };

  const handlePreset = (p) => {
    const range = p.getRange();
    setDraft(range);
    setFocusedDate(range.start);
  };

  return (
    <div className="drp-container">
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }} 
        className="drp-trigger"
      >
        <MdCalendarToday style={{ color: '#94a3b8' }} />
        <span>{value?.start ? `${formatDisplay(value.start)} – ${formatDisplay(value.end)}` : placeholder}</span>
      </button>

      {open && (
        <div className="drp-popover">
          <div className="drp-main-content">
            <div className="drp-sidebar">
              {PRESETS.map(p => {
                const isMatch = draft?.start && draft.start.compare(p.getRange().start) === 0 && 
                                draft?.end && draft.end.compare(p.getRange().end) === 0;
                return (
                  <button 
                    key={p.label} 
                    onClick={() => handlePreset(p)} 
                    className={`drp-preset-btn ${isMatch ? 'active' : ''}`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <div className="drp-calendar-wrapper">
              <RangeCalendar 
                value={draft} 
                onChange={setDraft} 
                visibleDuration={{ months: 2 }} 
                focusedValue={focusedDate}
                onFocusChange={setFocusedDate}
              >
                <div className="drp-calendar-grid-container">
                  <div className="drp-month-section">
                    <header className="drp-month-header">
                      <CalBtn slot="previous" className="drp-nav-btn"><MdChevronLeft size={20}/></CalBtn>
                      <Heading className="drp-month-title" />
                      {/* Spacer to keep title centered - Aria Heading handles the text automatically */}
                      <div style={{ width: 28 }} /> 
                    </header>
                    <MonthGrid todayDate={today} />
                  </div>

                  <div className="drp-month-section">
                    <header className="drp-month-header">
                      <div style={{ width: 28 }} />
                      <Heading className="drp-month-title" offset={{ months: 1 }} />
                      <CalBtn slot="next" className="drp-nav-btn"><MdChevronRight size={20}/></CalBtn>
                    </header>
                    <MonthGrid offset={{ months: 1 }} todayDate={today} />
                  </div>
                </div>
              </RangeCalendar>
            </div>
          </div>

          <div className="drp-footer">
            <div style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div className="drp-input-box">{draft?.start ? formatShort(draft.start) : 'mm / dd / yyyy'}</div>
              <span style={{ color: '#94a3b8' }}>–</span>
              <div className="drp-input-box">{draft?.end ? formatShort(draft.end) : 'mm / dd / yyyy'}</div>
            </div>
            <button onClick={cancel} className="drp-action-btn drp-btn-cancel">Cancel</button>
            <button onClick={apply} disabled={!draft?.start || !draft?.end} className="drp-action-btn drp-btn-apply">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}