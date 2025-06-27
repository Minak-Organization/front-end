import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SongCard from "../components/SongCard";
import Navbar from "../components/AppNavbar";

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/songs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("jwt");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch songs");
        }

        const data = await res.json();
        setSongs(data);
      } catch (err) {
        console.error("Error loading songs:", err);
        setError("Could not load songs. Check your connection or token.");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [navigate]);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "1rem" }}>🎵 All Songs</h2>

        <input
          type="text"
          placeholder="Search songs by title or artist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "12px",
            marginBottom: "1.5rem",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        {loading ? (
          <p> Loading your playlist...</p>
        ) : error ? (
          <p style={{ color: "crimson", fontWeight: "bold" }}>{error}</p>
        ) : filteredSongs.length === 0 ? (
          <p>No tracks match your search. Try something else.</p>
        ) : (
          <>
            <p style={{ marginBottom: "1rem" }}>
              Showing <strong>{filteredSongs.length}</strong> song{filteredSongs.length > 1 ? "s" : ""}.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
              {filteredSongs.map((song) => (
                <SongCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist}
                  audio_url={song.audio_url}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}