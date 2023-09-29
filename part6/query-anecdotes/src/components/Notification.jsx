import { createContext, useContext, useEffect } from "react"

export const NotificationContext = createContext()

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' })
      }, 5000)
    }
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
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
