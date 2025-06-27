export default function SongCard({ title, artist, audio_url }) {
  const handleLike = () => alert(`Liked "${title}"`);
  const handleAdd = () => alert(`Added "${title}" to your playlist`);

  return (
    <div style={{
      border: "1px solid #ccc", borderRadius: "8px",
      padding: "1rem", width: "240px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <p style={{ color: "#555" }}>{artist}</p>
      <audio controls style={{ width: "100%" }}>
        <source src={audio_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={handleLike} style={btnStyle}>Like</button>
      <button onClick={handleAdd} style={{ ...btnStyle, backgroundColor: "#2d87f0" }}>Add</button>
    </div>
  );
}

const btnStyle = {
  marginTop: "8px", width: "100%", padding: "8px",
  backgroundColor: "#f06292", color: "white", border: "none",
  borderRadius: "4px", cursor: "pointer"
};