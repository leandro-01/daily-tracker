document.addEventListener("DOMContentLoaded", () => {
  const currentDayElement = document.getElementById("current-day");
  const nextDayButton = document.getElementById("next-day");
  const resetDayButton = document.getElementById("reset-day");

  let currentDay = localStorage.getItem("trackerDay") 
    ? parseInt(localStorage.getItem("trackerDay")) 
    : 1;

  currentDayElement.textContent = currentDay;

  nextDayButton.addEventListener("click", () => {
    currentDay++;
    currentDayElement.textContent = currentDay;
    localStorage.setItem("trackerDay", currentDay);
  });

  resetDayButton.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja resetar o progresso?")) {
      currentDay = 1;
      currentDayElement.textContent = currentDay;
      localStorage.setItem("trackerDay", currentDay);
    }
  });
});
