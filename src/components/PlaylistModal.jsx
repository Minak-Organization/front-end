export default function PlaylistModal({ playlist, onClose, onRename }) {
  const handleRename = () => {
    const newTitle = prompt("Rename playlist:", playlist.title);
    if (newTitle && newTitle.trim() !== "") {
      onRename(playlist.id, newTitle);
    }
  };

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <h3>{playlist.title}</h3>
        <ul>
          {playlist.songs.map((song, idx) => (
            <li key={idx}>{song}</li>
          ))}
        </ul>
        <div style={{ marginTop: "1rem" }}>
          <button style={btnStyle} onClick={handleRename}> Rename</button>
          <button
            style={{ ...btnStyle, backgroundColor: "#e74c3c" }}
            onClick={onClose}
          >
             Close
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyles = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyles = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "400px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

const btnStyle = {
  marginRight: "1rem",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#3498db",
  color: "#fff",
  cursor: "pointer",
};