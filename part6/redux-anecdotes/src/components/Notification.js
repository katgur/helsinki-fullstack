import { useDispatch, useSelector } from 'react-redux'
import { getNotification, reset } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useSelector(getNotification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(reset())
      }, 5000)
    }
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
      {
        notification &&
        <div style={style}>
          {notification}
        </div>
      }
    </>
  )
}

export default Notification