const akanNames = {
  0: { male: "Kwasi",   female: "Akosua" },  // Sunday
  1: { male: "Kwadwo",  female: "Adwoa"  },  // Monday
  2: { male: "Kwabena", female: "Abenaa" },  // Tuesday
  3: { male: "Kwaku",   female: "Akua"   },  // Wednesday
  4: { male: "Yaw",     female: "Yaa"    },  // Thursday
  5: { male: "Kofi",    female: "Afua"   },  // Friday
  6: { male: "Kwame",   female: "Ama"    },  // Saturday
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getDayOfWeek(day, month, year) {
  if (month <= 2) {
    month += 12;
    year -= 1;
  }

  const CC = Math.floor(year / 100);
  const YY = year % 100;

  const d = (
    Math.floor(CC / 4) - (2 * CC) - 1 +
    Math.floor((5 * YY) / 4) +
    Math.floor((26 * (month + 1)) / 10) +
    day
  ) % 7;

  return ((d % 7) + 7) % 7;
}

function generateName() {
  const day    = parseInt(document.getElementById("day").value);
  const month  = parseInt(document.getElementById("month").value);
  const year   = parseInt(document.getElementById("year").value);
  const gender = document.querySelector('input[name="gender"]:checked');

  const dayOfWeek = getDayOfWeek(day, month, year);
  const name      = akanNames[dayOfWeek][gender.value];
  const dayName   = dayNames[dayOfWeek];

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    Your Akan Name is <strong>${name}</strong>
    <div class="day-label">Born on a ${dayName}</div>
  `;
}
function resetForm() {
  document.getElementById("day").value = "";
  document.getElementById("month").value = "";
  document.getElementById("year").value = "";
  document.querySelectorAll('input[name="gender"]').forEach(r => r.checked = false);
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "none";
  resultDiv.innerHTML = "";
}