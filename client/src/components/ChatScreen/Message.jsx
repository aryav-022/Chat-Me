export default function Message(props) {
  const { sent, msg } = props;

  return (
    <div className={`toast static w-fit py-2 ${sent && "self-end"}`}>
      <div className={`alert max-w-sm  ${sent ? "bg-primary text-gray-200" : "alert-info bg-base-content text-base-300"}`}>
        <div>
          <span>{msg}</span>
        </div>
      </div>
    </div>
  )
}

Message.defaultProps = {
  sent: false,
  msg: "New msg"
}