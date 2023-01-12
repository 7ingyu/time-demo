import { useState } from 'react';
import Countdown from './Countdown';
import Clock from './Clock';

function App() {
  const [countdowns, setCountdowns] = useState([true]);

  const handleDelete = (i) => {
    let arr = [...countdowns];
    arr[i] = false;
    setCountdowns(arr);
  };

  const handleAdd = () => setCountdowns([...countdowns, true]);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className="container">
        <h1 className="text-center mt-5 text-primary">TIME</h1>
        <hr />
        <h2 className="mt-5 mb-3">Countdowns</h2>
        {countdowns.map((bool, i) => bool && <Countdown key={i} idx={i} handleDelete={() => handleDelete(i)} />)}
        <button onClick={handleAdd} className="mt-3 mb-5 btn btn-primary">Add Countdown</button>

        <hr />
        <h2 className="mt-5 mb-3">Time</h2>
        <Clock />
      </main>
    </div>
  );
}

export default App;
