import React, { useState, useEffect } from "react";

const ThermoController = () => {
  const [temperature, setTemperature] = useState(18); // Начальная температура
  const [isProtected, setIsProtected] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // Сообщение предупреждения

  // Изменение температуры
  const changeTemperature = (amount) => {
    if (isProtected) return; // Блокировка изменений, если "Защита" включена
    setTemperature((prevTemp) => prevTemp + amount);
  };

  // Получение цвета для круга в зависимости от температуры
  const getCircleColor = () => {
    if (temperature < -20) return "#00008b"; // Тёмно-синий для температуры ниже -20°C
    if (temperature < 0) return "#00bfff"; // Голубой для отрицательных температур
    if (temperature <= 17) return "#007bff"; // Синий
    if (temperature <= 24) return "#ffd700"; // Желтый
    return "#ff4500"; // Красный
  };

  // Автоматическая активация защиты и предупреждения
  useEffect(() => {
    if (temperature <= 5) {
      setIsProtected(true);
      setAlertMessage("Система замерзла!");
    } else if (temperature >= 30) {
      setIsProtected(true);
      setAlertMessage("Система перегрелась!");
    } else {
      setAlertMessage("");
    }
  }, [temperature]);

  // Автоматическое исчезновение уведомления через 5 секунд
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
      return () => clearTimeout(timer); // Очистка таймера при обновлении
    }
  }, [alertMessage]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#333", // Серый фон
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "20px", marginBottom: "20px" }}>
        TERMOCONTROLLER
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          backgroundColor: getCircleColor(), // Цвет круга
          color: "#fff",
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        {temperature}°C
      </div>
      {alertMessage && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#ff4500",
            borderRadius: "5px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {alertMessage}
        </div>
      )}
      <label style={{ marginBottom: "20px", fontSize: "16px" }}>
        <input
          type="checkbox"
          checked={isProtected}
          onChange={(e) => setIsProtected(e.target.checked)}
          style={{ marginRight: "10px" }}
        />
        Защита
      </label>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() => changeTemperature(-1)}
          style={{
            width: "50px",
            height: "50px",
            fontSize: "24px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#555",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          -
        </button>
        <button
          onClick={() => changeTemperature(1)}
          style={{
            width: "50px",
            height: "50px",
            fontSize: "24px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#555",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ThermoController;
