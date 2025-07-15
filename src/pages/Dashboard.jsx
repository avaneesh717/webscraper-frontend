import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {
  const [url, setUrl] = useState("")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/")
  }, [navigate])

  const fetchData = async () => {
    if (!url) return alert("Please enter a URL to scrape.")
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/scrape?url=${encodeURIComponent(url)}`)
      console.log("API response:", res.data)
      setData(res.data.sections || [])
    } catch (err) {
      console.error(err)
      alert("Failed to fetch data.")
    }
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Dashboard</h2>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter URL to scrape..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={fetchData}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition"
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      {data && data.length > 0 ? (
        <div className="mt-6">
          {data.map((section, idx) => (
            <div key={idx} className="mb-8 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-4">{section.heading}</h3>
              {section.content.map((para, i) => (
                <p key={i} className="mb-2 text-gray-800 leading-relaxed break-words">{para}</p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-500">No data fetched yet.</p>
      )}
    </div>
  )
}
