import { useSelector } from "react-redux"
import { getNotification, MESSAGE_TYPE_ERROR } from "../reducers/notificationReducer"

function Notification() {
    const notification = useSelector(getNotification)

    return (
        <>
            {notification && (
                <p
                    style={{
                        color:
                            notification.type === MESSAGE_TYPE_ERROR
                                ? "red"
                                : "green"
                    }}
                >
                    {notification.content}
                </p>
            )}
        </>
    )
}

export default Notification