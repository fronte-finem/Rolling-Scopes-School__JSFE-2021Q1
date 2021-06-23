import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Test = (props: { isOnline: boolean }) => <>{props.isOnline ? 'Online' : 'Offline'}</>;

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `English for ${count} kids!`;
  });

  return (
    <div>
      <h1>English for {count} kids!</h1>
      <button onClick={() => setCount(count + 1)}>Raise</button>
      <Test isOnline={false} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body
);
