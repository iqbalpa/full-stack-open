const Notification = ({ message, error }) => {
	return (<>
	{message && !error && <p className="success">{message}</p>}
	{message && error && <p className="error">{message}</p>}
	</>);
};

export default Notification;
