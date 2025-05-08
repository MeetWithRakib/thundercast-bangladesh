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
  const url = `https://api.open-meteo.com/v1/forecast?latitude=22.82,23.999941,23.643999,23.64448,23.622641,25.74486,25.778522,26.335377,22.723406,22.3419,24.923025,23.911522,23.015913,24.743448,24.213799,25.019405,24.006355,22.337299,23.2321,22.527651,25.810347,24.771305,25.636574,23.637569,23.920717,23.987967,23.989014,23.858334,23.450001,23.772125,23.810331,24.433123,23.170664,24.894802,24.886436,23.777176,23.811056&longitude=89.550003,90.420273,88.855637,90.598434,90.499794,89.275589,88.897377,88.551697,89.075127,91.815536,89.950111,90.388962,91.397583,90.398384,90.952202,90.013733,89.249298,89.10865,90.663078,91.920555,89.648697,91.545555,88.636322,90.483269,90.718811,90.648849,90.418167,90.26667,91.199997,88.631371,90.412521,90.786568,89.212418,91.869034,91.880722,90.399452,90.407608&hourly=cape,convective_inhibition,lifted_index,cloud_base_height,dew_point_2m,wind_speed_1000hPa,wind_speed_500hPa&timezone=auto`;

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
