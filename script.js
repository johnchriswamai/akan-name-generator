// Akan names - day 0=Sunday to 6=Saturday
const akanNames = {
  0: { male: "Kwasi", female: "Akosua" },
  1: { male: "Kwadwo", female: "Adwoa" },
  2: { male: "Kwabena", female: "Abenaa" },
  3: { male: "Kwaku", female: "Akua" },
  4: { male: "Yaw", female: "Yaa" },
  5: { male: "Kofi", female: "Afua" },
  6: { male: "Kwame", female: "Ama" },
};

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Zeller's formula
function getDayOfWeek(day, month, year) {
  if (month <= 2) {
    month += 12;
    year -= 1;
  }
  const CC = Math.floor(year / 100);
  const YY = year % 100;
  const d =
    (Math.floor(CC / 4) -
      2 * CC -
      1 +
      Math.floor((5 * YY) / 4) +
      Math.floor((26 * (month + 1)) / 10) +
      day) %
    7;
  return ((d % 7) + 7) % 7;
}

// Runs when Find button is clicked
function generateName() {
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);
  const gender = document.querySelector('input[name="gender"]:checked');

  // Days allowed per month
  const daysInMonth = [
    0,
    31,
    year % 4 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  // Validation
  if (isNaN(day) || !month || isNaN(year) || !gender) {
    alert("Please fill in all fields!");
    return;
  }
  if (day < 1 || day > daysInMonth[month]) {
    alert("Invalid day for the selected month!");
    return;
  }

  // Get name and display result
  const dayOfWeek = getDayOfWeek(day, month, year);
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    Your Akan Name is <strong>${akanNames[dayOfWeek][gender.value]}</strong>
    <div class="day-label">Born on a ${dayNames[dayOfWeek]}</div>
  `;
}

// Runs when Reset button is clicked
function resetForm() {
  document.getElementById("day").value = "";
  document.getElementById("month").value = "";
  document.getElementById("year").value = "";
  document
    .querySelectorAll('input[name="gender"]')
    .forEach((r) => (r.checked = false));
  document.getElementById("result").style.display = "none";
  document.getElementById("result").innerHTML = "";
}

// Connect buttons to functions
document.getElementById("submit-btn").addEventListener("click", generateName);
document.getElementById("reset-btn").addEventListener("click", resetForm);
