const districts = [
  { name: "Dhaka", lat: 23.8103, lon: 90.4125 },
  { name: "Chattogram", lat: 22.3419, lon: 91.8155 },
  { name: "Khulna", lat: 22.8200, lon: 89.5500 },
  { name: "Sylhet", lat: 24.8948, lon: 91.8690 },
  { name: "Rajshahi", lat: 24.3745, lon: 88.6042 },
  { name: "Barishal", lat: 22.7010, lon: 90.3535 },
  { name: "Rangpur", lat: 25.7460, lon: 89.2500 },
  { name: "Mymensingh", lat: 24.7434, lon: 90.3983 }
];

const districtSelect = document.getElementById("district");
const resultBox = document.getElementById("result");

// Populate districts
for (let d of districts) {
  const option = document.createElement("option");
  option.value = `${d.lat},${d.lon}`;
  option.textContent = d.name;
  districtSelect.appendChild(option);
}

function calculateRisk(cape, cin, li) {
  if (cape > 1500 && cin < 0 && li < -2) return "উচ্চ ঝুঁকি";
  else if (cape > 800 && li < 0) return "মাঝারি ঝুঁকি";
  else return "কম ঝুঁকি";
}

// Event listener

districtSelect.addEventListener("change", () => {
  const [lat, lon] = districtSelect.value.split(",");
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cape,convective_inhibition,lifted_index,cloud_base_height,dew_point_2m,wind_speed_1000hPa,wind_speed_500hPa&timezone=auto`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const cape = data.hourly.cape[0];
      const cin = data.hourly.convective_inhibition[0];
      const li = data.hourly.lifted_index[0];
      const lcl = data.hourly.cloud_base_height[0];
      const dew = data.hourly.dew_point_2m[0];
      const windLow = data.hourly.wind_speed_1000hPa[0];
      const windHigh = data.hourly.wind_speed_500hPa[0];
      const windShear = Math.abs(windHigh - windLow);

      document.getElementById("cape").textContent = cape;
      document.getElementById("cin").textContent = cin;
      document.getElementById("li").textContent = li;
      document.getElementById("lcl").textContent = lcl;
      document.getElementById("dew_point").textContent = dew;
      document.getElementById("wind_shear").textContent = windShear.toFixed(1);
      document.getElementById("risk").textContent = calculateRisk(cape, cin, li);

      resultBox.classList.remove("hidden");
    })
    .catch(err => {
      console.error(err);
      alert("ডেটা আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    });
});
