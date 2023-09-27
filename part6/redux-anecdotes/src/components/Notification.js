import { useSelector } from 'react-redux'
import { getNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(getNotification)

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