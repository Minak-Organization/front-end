import React, { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import PlaylistModal from "../components/PlaylistModal";

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    fetch("http://localhost:5000/api/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = () => {
    if (newTitle.trim() === "") return;

    fetch("http://localhost:5000/api/playlists", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => res.json())
      .then((created) => {
        setPlaylists([created, ...playlists]);
        setNewTitle("");
      })
      .catch((err) => console.error("Create error:", err));
  };

  const handleRename = (id, newTitle) => {
    fetch(`http://localhost:5000/api/playlists/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setPlaylists((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setSelectedPlaylist(null);
      })
      .catch((err) => console.error("Rename error:", err));
  };

  return (
    <>
      <AppNavbar />
      <div style={{ padding: "2rem" }}>
        <h2>My Playlists</h2>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="New playlist title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              marginRight: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button onClick={handleCreate} className="primary-btn">
            Create
          </button>
        </div>

        {loading ? (
          <p>Loading playlists...</p>
        ) : playlists.length === 0 ? (
          <p>No playlists yet. Create one above!</p>
        ) : (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              style={{
                background: "#fff",
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "6px",
                marginBottom: "1rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h4>{playlist.title}</h4>
              <ul>
                {playlist.songs?.map((song, idx) => (
                  <li key={idx}>{song.title || song}</li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlaylist(playlist)}
                className="primary-btn"
              >
                View/Edit
              </button>
            </div>
          ))
        )}

        {selectedPlaylist && (
          <PlaylistModal
            playlist={selectedPlaylist}
            onClose={() => setSelectedPlaylist(null)}
            onRename={handleRename}
          />
        )}
      </div>
    </>
  );
}