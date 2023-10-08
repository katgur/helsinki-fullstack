import { useEffect, useState } from 'react'
import { Diary, NewDiary, Visibility, Weather } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import { isAxiosError } from 'axios';

interface NewDiaryFormProps {
  addDiary: (diary: Diary) => void,
  setMessage: (message: string) => void,
}

interface WeatherRadioButtonProps {
  value: Weather,
  diary: NewDiary,
  setDiary: React.Dispatch<React.SetStateAction<NewDiary>>,
}

function WeatherRadioButton({ value, diary, setDiary }: WeatherRadioButtonProps) {
  return (
    <label>
      <input type='radio' name='weather' checked={diary.weather === value} onChange={() => setDiary({ ...diary, weather: value })} />
      {value}
    </label>
  )
}

interface VisibilityRadioButtonProps {
  value: Visibility,
  diary: NewDiary,
  setDiary: React.Dispatch<React.SetStateAction<NewDiary>>,
}

function VisibilityRadioButton({ value, diary, setDiary }: VisibilityRadioButtonProps) {
  return (
    <label>
      <input type='radio' name='visibility' checked={diary.visibility === value} onChange={() => setDiary({ ...diary, visibility: value })} />
      {value}
    </label>
  )
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
          <WeatherRadioButton value={Weather.Cloudy} diary={diary} setDiary={setDiary} />
          <WeatherRadioButton value={Weather.Rainy} diary={diary} setDiary={setDiary} />
          <WeatherRadioButton value={Weather.Stormy} diary={diary} setDiary={setDiary} />
          <WeatherRadioButton value={Weather.Sunny} diary={diary} setDiary={setDiary} />
          <WeatherRadioButton value={Weather.Windy} diary={diary} setDiary={setDiary} />
        </div>
        <div>
          <VisibilityRadioButton value={Visibility.Good} diary={diary} setDiary={setDiary} />
          <VisibilityRadioButton value={Visibility.Great} diary={diary} setDiary={setDiary} />
          <VisibilityRadioButton value={Visibility.Ok} diary={diary} setDiary={setDiary} />
          <VisibilityRadioButton value={Visibility.Poor} diary={diary} setDiary={setDiary} />
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
