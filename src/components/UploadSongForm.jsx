import { useState } from "react";

export default function UploadSongForm({ onUpload }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", file);

    try {
      const res = await fetch("/api/songs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        onUpload(data);
        setTitle("");
        setArtist("");
        setFile(null);
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Song Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="file"
        accept=".mp3"
        onChange={(e) => setFile(e.target.files[0])}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>📤 Upload</button>
    </form>
  );
}

const formStyle = {
  marginBottom: "1.5rem",
  padding: "1rem",
  backgroundColor: "#f9f9f9",
  borderRadius: "6px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "0.75rem",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "10px 16px",
  fontSize: "1rem",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};