import React, { useState, useRef, useEffect } from 'react';
import {
  DatePicker,
  DateInput,
  DateSegment,
  Button,
  Calendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarCell,
  Heading,
  Dialog,
  Popover,
  Group
} from 'react-aria-components';
import { 
  getLocalTimeZone, 
  today as getTodayDate, 
  parseDate, 
  CalendarDate 
} from '@internationalized/date';
import { MdCalendarToday, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import './FormDatePicker.css';
import './Form.css';

const TZ = getLocalTimeZone();

const FormDatePicker = ({ 
  label, 
  icon: Icon = MdCalendarToday, 
  name, 
  value, 
  onChange, 
  required, 
  fullWidth 
}) => {
  // Convert string date "YYYY-MM-DD" to CalendarDate for react-aria
  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    if (value && typeof value === 'string') {
      try {
        setDateValue(parseDate(value));
      } catch (e) {
        setDateValue(null);
      }
    } else {
      setDateValue(null);
    }
  }, [value]);

  const handleDateChange = (newDate) => {
    setDateValue(newDate);
    if (newDate) {
      // Pass back as YYYY-MM-DD string to match the rest of the form
      const dateStr = newDate.toString();
      onChange({ target: { name, value: dateStr } });
    } else {
      onChange({ target: { name, value: '' } });
    }
  };

  return (
    <div className={`form-field ${fullWidth ? 'full-width' : ''}`}>
      {label && <label>{label}</label>}
      <DatePicker 
        value={dateValue} 
        onChange={handleDateChange} 
        isRequired={required}
        className="apple-date-picker"
      >
        <Group className="input-wrapper date-group">
          {Icon && <Icon className="input-icon" size={24} />}
          <DateInput className="apple-date-input">
            {(segment) => <DateSegment segment={segment} className="apple-date-segment" />}
          </DateInput>
          <Button className="apple-calendar-trigger">
            <MdCalendarToday size={20} />
          </Button>
        </Group>
        
        <Popover className="apple-calendar-popover">
          <Dialog className="apple-calendar-dialog">
            <Calendar className="apple-calendar">
              <header className="apple-calendar-header">
                <Button slot="previous" className="apple-calendar-nav-btn">
                  <MdChevronLeft size={24} />
                </Button>
                <Heading className="apple-calendar-title" />
                <Button slot="next" className="apple-calendar-nav-btn">
                  <MdChevronRight size={24} />
                </Button>
              </header>
              <CalendarGrid className="apple-calendar-grid">
                <CalendarGridHeader>
                  {(day) => (
                    <CalendarHeaderCell className="apple-calendar-header-cell">
                      {day}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell 
                      date={date} 
                      className={({ isSelected, isToday, isOutsideVisibleRange, isFocused }) => `
                        apple-calendar-cell 
                        ${isSelected ? 'selected' : ''} 
                        ${isToday ? 'today' : ''} 
                        ${isOutsideVisibleRange ? 'outside' : ''}
                        ${isFocused ? 'focused' : ''}
                      `}
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </DatePicker>
    </div>
  );
};

export default FormDatePicker;
