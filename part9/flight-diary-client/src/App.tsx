import { useEffect, useState } from 'react'
import { Diary } from './types';
import { getAllDiaries } from './services/diaryService';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data))
      .catch(error => console.log(error.message));
  }, [])

  return (
    diaries.map(diary => {
      return (
        <p key={diary.id}>
          <h2>{diary.date}</h2>
          <p>weather: <i>{diary.weather}</i></p>
          <p>visibility: <i>{diary.visibility}</i></p>
        </p>
      )
    })
  )
}

export default App
