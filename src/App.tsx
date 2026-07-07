import { useEffect, useState } from 'react'
import './App.css'
import { SlControlPlay } from "react-icons/sl";
import { SlRefresh } from "react-icons/sl";
import { SlControlPause } from "react-icons/sl";

function App() {
  const [time, setTime] = useState(25 * 60);
  const [plan, setPlan] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const minute = Math.floor(time / 60);
  const second = time % 60;

  // リフレッシュ関数
  const refresh = (newPlan: number) => {
    setPlan(newPlan)
    if(newPlan == 1){
      setTime(25 * 60)
    }else{
      setTime(5 * 60)
    }
    setIsRunning(false)
  }

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if(prevTime <= 0){
          //ここで音ならす
          setTime(25 * 60);
          setPlan(1);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className='timer'>
      <h1>MY Pomodoro Timer</h1>
      <p className='description'>
        集中力を高める、時間管理テクニックです ⏰<br />
        25分間の作業と、5分間の休憩を繰り返し、生産性を向上させましょう！
      </p>
      <div className={`content ${plan === 2 ? "coffee" : ""}`}>
        <div className='plans'>
          <a onClick={() => refresh(1)} className={plan == 1 ? "selected" : ""}>🔥</a>
          <a onClick={() => refresh(2)} className={plan == 2 ? "selected" : ""}>☕️</a>
        </div>
        <div className='time'>
          {String(minute).padStart(2, "0")}:{String(second).padStart(2, "0")}
        </div>
        <div className='button'>
          {
            isRunning ? 
            <div>  
              <SlControlPause onClick={() => setIsRunning(false)}/> 
            </div>
            :
            <div>
              <SlControlPlay onClick={() => setIsRunning(true)}/>
            </div>
          }
          <div>
            <SlRefresh onClick={() => refresh(plan)}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
