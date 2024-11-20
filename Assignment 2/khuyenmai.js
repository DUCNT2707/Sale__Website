document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#set-promotion-time").addEventListener("click", setPromotionTime);
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
  
  function setPromotionTime() {
    const promotionEndTime = document.querySelector("#promotion-end-time").value;
    if (promotionEndTime) {
      localStorage.setItem("promotionEndTime", new Date(promotionEndTime).getTime());
      alert("Thời gian khuyến mãi đã được thiết lập!");
    } else {
      alert("Vui lòng nhập thời gian khuyến mãi hợp lệ.");
    }
  }
  
  function updateCountdown() {
    const promotionEndTime = localStorage.getItem("promotionEndTime");
    if (promotionEndTime) {
      const currentTime = new Date().getTime();
      const timeRemaining = promotionEndTime - currentTime;
  
      if (timeRemaining > 0) {
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
        document.querySelector("#countdown-timer").textContent =
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        document.querySelector("#countdown-timer").textContent = "Hết giờ khuyến mãi";
      }
    } else {
      document.querySelector("#countdown-timer").textContent = "Chưa thiết lập thời gian khuyến mãi";
    }
  }
  