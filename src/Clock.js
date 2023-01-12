import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import { useRef, useState, useEffect } from 'react';
import timezones from './timezones.json';

export default function Clock () {
  const formatStr = 'MMMM Do, yyyy hh:mm:ss aa';
  const clockRef = useRef(0);
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [ date, setDate ] = useState(format(new Date(), formatStr));
  const [ tz, setTz] = useState(userTz);

  useEffect(() => {
    const displayTime = (timezone) => {
      let utcDate = zonedTimeToUtc(new Date(), userTz);
      let zonedDate = utcToZonedTime(utcDate, timezone);
      let formatted = format(zonedDate, formatStr);
      setDate(formatted);
    }

    clearInterval(clockRef.current);
    clockRef.current = setInterval(() => displayTime(tz), 500);
    return () => clearInterval(clockRef.current)
  }, [tz, userTz])

  return (
    <div className="row">
      <div className="col-12 h4 text-center text-primary mb-3">
        {date}
      </div>
      <div className="col-12">
        <select
          className="form-select"
          value={tz}
          onChange={(e) => setTz(e.target.value)}>
            {timezones.map(({text, utc}, idx) => (
              <option key={idx} value={new Set(utc).has(tz) ? tz : utc[0]}>
                {text}
              </option>
            ))}
        </select>
      </div>
    </div>
  )

}