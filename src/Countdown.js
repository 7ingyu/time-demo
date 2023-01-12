import { useRef, useState, useEffect } from 'react';
import './Countdown.css';

export default function Countdown ({ idx, handleDelete }) {
  const timerRef = useRef(0);
  const [ hr, setHr ] = useState(0);
  const [ min, setMin ] = useState('00');
  const [ sec, setSec ] = useState('00');
  const [ started, setStarted ] = useState(false);
  const [ ended, setEnded ] = useState(false);

  useEffect(() => {
    const startCountdown = () => {
      let start = new Date().getTime();
      let duration = (Number(sec) + (Number(min) * 60) + (Number(hr) * 60 * 60)) * 1000;
      let end = Number(start) + duration;
      timerRef.current = setInterval(() => updateTime(end), 500);
    };

    const updateTime = (end) => {
      let remaining = Math.floor((end - Number(new Date().getTime())) / 1000);
      if (remaining <= 0) {
        setTime([0, 0, 0]);
        clearInterval(timerRef.current);
        timerRef.current = 0;
        return;
      }
      let hours = Math.floor(remaining / 60 / 60);
      remaining -= hours * 60 * 60;
      let minutes = Math.floor(remaining / 60);
      remaining -= minutes * 60;
      let seconds = remaining;
      setTime([hours, minutes, seconds]);
      return;
    };

    const setTime = ([h, m, s]) => {
      setHr(h);
      setMin(String(m).length < 2 ? '0' + m : m);
      setSec(String(s).length < 2 ? '0' + s : s);
      return;
    };

    if (started) {
      setEnded(false);
      startCountdown();
    } else {
      clearInterval(timerRef.current);
      timerRef.current = 0;
    }

    return () => clearInterval(timerRef.current)
  }, [started, hr, min, sec]);

  const handleChange = (e, type) => {
    let val = String(Number(e.target.value));
    if (Number(val) > 59) return;
    if (val.length === 1) val = '0' + val;
    if (type === 'min') setMin(val);
    if (type === 'sec') setSec(val);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="mw-20rem">
          <div className="input-group border rounded">
            <input
              type="number"
              value={hr}
              onChange={(e) => setHr(e.target.value)}
              aria-label="hour"
              className="form-control no-arrows border-0 flex-fill" />
            <span>:</span>
            <input
              type="number"
              value={min}
              onChange={(e) => handleChange(e, 'min')}
              aria-label="min"
              max="59"
              className="form-control no-arrows border-0" />
            <span>:</span>
            <input
              type="number"
              value={sec}
              onChange={(e) => handleChange(e, 'sec')}
              aria-label="second"
              max="59"
              className="form-control no-arrows border-0" />
            <button
              className="btn btn-outline-dark"
              onClick={() => setStarted(true)}
              disabled={!hr && !Number(min) && !Number(sec)}>
                <i className={`text-${(!hr && !Number(min) && !Number(sec)) ? 'muted' : 'success'} bi bi-play-fill`} />
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => setStarted(false)}>
                <i className={`text-${(!timerRef.current) ? 'muted' : 'danger'} bi bi-stop-fill`} />
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={handleDelete}>
                <i className="bi bi-x-lg"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}