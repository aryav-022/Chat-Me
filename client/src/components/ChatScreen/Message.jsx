export default function Message(props) {
  const { sent, msg } = props;

  return (
    // is message is sent
    // align on right side (self-end)
    // else it automatically aligns on right side
    <div className={`toast static w-fit py-2 ${sent && "self-end"}`}>
      <div className={`alert max-w-sm  ${sent ? "bg-primary text-gray-200" : "alert-info bg-base-content text-base-300"}`}>
        <div>
          <span>{msg}</span>
        </div>
      </div>
    </div>
  )
}

// Default Props (when no props are recieved)
// To avoid errors caused by undefined
Message.defaultProps = {
  sent: false,
  msg: "New msg"
}