import { useEffect, useState } from 'react'
import { Diary, NewDiary, Visibility, Weather } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import { isAxiosError } from 'axios';

interface NewDiaryFormProps {
  addDiary: (diary: Diary) => void,
  setMessage: (message: string) => void,
}

function NewDiaryForm(props: NewDiaryFormProps) {
  const [diary, setDiary] = useState<NewDiary>({
    date: '',
    weather: Weather.Cloudy,
    visibility: Visibility.Good,
    comment: '',
  });

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary(diary)
      .then(data => {
        props.addDiary(data);
        setDiary({
          date: '',
          weather: Weather.Cloudy,
          visibility: Visibility.Good,
          comment: '',
        });
      })
      .catch(error => {
        if (isAxiosError(error)) {
          if (error.response) {
            props.setMessage(`${error.response.data}`);
          }
        } else {
          console.error(error);
        }
      });
  }

  return (
    <div>
      <h2>Create new diary note</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input type='date' value={diary.date} onChange={(event) => setDiary({ ...diary, date: event.target.value })} />
        </div>
        <div>
          <select value={diary.weather} onChange={(event) => setDiary({ ...diary, weather: event.target.value as Weather })}>
            <option>{Weather.Cloudy}</option>
            <option>{Weather.Rainy}</option>
            <option>{Weather.Stormy}</option>
            <option>{Weather.Sunny}</option>
            <option>{Weather.Windy}</option>
          </select>
        </div>
        <div>
          <select value={diary.visibility} onChange={(event) => setDiary({ ...diary, visibility: event.target.value as Visibility })}>
            <option>{Visibility.Good}</option>
            <option>{Visibility.Great}</option>
            <option>{Visibility.Ok}</option>
            <option>{Visibility.Poor}</option>
          </select>
        </div>
        <div>
          <textarea value={diary.comment} onChange={(event) => setDiary({ ...diary, comment: event.target.value })} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data))
      .catch(error => console.error(error));
  }, [])

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 5000)
    }
  }, [message])

  return (
    <>
      <h1>Diary</h1>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <NewDiaryForm addDiary={(diary: Diary) => setDiaries([...diaries, diary])} setMessage={setMessage} />
      {
        diaries.map(diary => {
          return (
            <div key={diary.id}>
              <h2>{diary.date}</h2>
              <p>weather: <i>{diary.weather}</i></p>
              <p>visibility: <i>{diary.visibility}</i></p>
            </div>
          )
        })
      }
    </>
  )
}

export default App
