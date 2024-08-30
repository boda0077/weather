import React, { useRef, useState } from "react";

function App() {
  const cityInput = useRef();
  const [weatherData, setWeatherData] = useState({
    city: "City",
    temp: "35°",
    description: "Sunny",
    minMax: "15°/20°"
  });

  const URL = "https://api.openweathermap.org/data/2.5/";
  const API_KEY = "70752f4ef87277aaab632341e3434fcd";

  const fetchWeatherData = async () => {
    const cityName = cityInput.current.value;
    const api = `${URL}weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=en`;

    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setWeatherData({
        city: data.name,
        temp: `${Math.round(data.main.temp)}°`,
        description: data.weather[0].description,
        minMax: `${Math.round(data.main.temp_min)}°/${Math.round(data.main.temp_max)}°`
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Optionally, you can set an error state here to inform the user
    }
  };

  return (
    <main className="grid gap-6">
      <div className="flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl py-4 px-10">
        <input
          className="tracking-[0.1rem] font-mono text-xl focus:bg-transparent outline-none py-2 px-2 w-[250px] bg-transparent border-b border-black text-white placeholder:text-white placeholder:opacity-75"
          placeholder="Search"
          type="search"
          ref={cityInput}
        />
        <button onClick={fetchWeatherData}>
          <i className="text-white fa-solid fa-magnifying-glass fa-2xl"></i>
        </button>
      </div>

      <div className="py-12 grid justify-center text-center w-[400px] h-[400px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
        <span className="text-white text-4xl font-serif tracking-widest">{weatherData.city}</span>
        <span className="text-white text-[4rem] font-serif tracking-widest">{weatherData.temp}</span>
        <span className="text-white text-2xl font-serif tracking-widest">{weatherData.description}</span>
        <span className="text-white text-xl font-serif tracking-widest">{weatherData.minMax}</span>
      </div>
    </main>
  );
}

export default App;
