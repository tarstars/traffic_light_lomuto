import React, { ReactElement, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import img_green from "./images/green.png";
import img_red from "./images/red.png";
import img_yellow from "./images/yellow.png";
import arrow from "./images/arrow.png";

interface ArrowElementProps {
  src: string;
  showArrow: boolean;
}

function ArrowElement({src, showArrow}: ArrowElementProps) {
  return (
    <div className='arrow-element' key={crypto.randomUUID()}>
      <img src={src} className='scaled-image' key={crypto.randomUUID()}/>
      {showArrow && <img src={arrow} className='scaled-image' key={crypto.randomUUID()}/>}
    </div>
  )
}

function App() {
  const [a, seta] = useState([4, 3, 7, 5, 1, 5, 2, 6, 2, 9, 7, 2, 5, 8, 1, 5, 7, 1, 0, 5, 4, 3, 7, 5, 1, 5, 2, 6, 2, 9, 7, 2, 5, 8, 1, 5, 7, 1, 0, 5]);
  const [p, setp] = useState(a[a.length - 1]);
  const [l, setl] = useState<Array<ReactElement>>([]);
  const [al, setAl] = useState(0);
  const [ar, setAr] = useState(0);
  const [state, setState] = useState(0);

  useEffect(() => {
    const ll: Array<ReactElement> = [];
    let k = 0;

    for (let v of a) {
      const sa = k == al || k == ar;

      let img = img_green;
      if (v === p) {
        img = img_yellow;        
      }
      if (v > p) {
        img = img_red;
      }
      ll.push(<ArrowElement src={img} showArrow={sa} key={crypto.randomUUID()}></ArrowElement>);
      k += 1;
    }

    setl(ll)
  }, [a, al, ar]);

  function nextStep() {
    if ((a[ar] < p && state === 0) || (a[ar] === p && state === 1)) {
      const temp = a[al];
      a[al] = a[ar];
      a[ar] = temp;
      seta(a);
      setAl(al + 1);
    }
    setAr(ar + 1);
    if (ar + 1 === a.length) {
      setAr(al);
      setState(1);
    }
    console.log('stop a[ar] =', a[ar], 'state =', state, al, ar);
  }

  return <>
    <div className='traffic-light-container'>
      {l}
    </div>
    
    <br></br>
    <h1>{p}</h1>
    <h1>{a}</h1>
    <button onClick={nextStep}>Next</button><br/>
    l = {al}<br/>
    r = {ar}
  </>
  ;
}

export default App;
