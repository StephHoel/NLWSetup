import './styles/global.css'

import { Habit } from "./components/Habit"

function App() {
  return (
    <>
      <Habit completed={10} />
      <Habit completed={2} />
      <Habit completed={3} />
      <Habit completed={5} />
      <Habit completed={5} />
      <Habit completed={3} />
      <Habit completed={1} />
    </>
  )
}

export default App
