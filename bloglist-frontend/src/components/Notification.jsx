const Notification = ({ message, errorMessage }) => {
  const looks = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return errorMessage ? (
    <div style={looks}>{errorMessage}</div>
  ) : (
    <div style={{ ...looks, color: "green" }}>{message}</div>
  );
};

export default Notification;
