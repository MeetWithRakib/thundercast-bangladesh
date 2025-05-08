const districts = [
{ name: "Khulna", lat: 22.8200, lon: 89.5500 },
{ name: "Gazipur", lat: 23.9999, lon: 90.4203 },
{ name: "Chuadanga", lat: 23.6440, lon: 88.8556 },
{ name: "Sonargaon", lat: 23.6445, lon: 90.5984 },
{ name: "Narayanganj", lat: 23.6226, lon: 90.4998 },
{ name: "Rangpur", lat: 25.7449, lon: 89.2756 },
{ name: "Saidpur", lat: 25.7785, lon: 88.8974 },
{ name: "Panchagarh", lat: 26.3354, lon: 88.5517 },
{ name: "Satkhira", lat: 22.7234, lon: 89.0751 },
{ name: "Chattogram", lat: 22.3419, lon: 91.8155 },
{ name: "Jamalpur", lat: 24.9230, lon: 89.9501 },
{ name: "Tongi", lat: 23.9115, lon: 90.3890 },
{ name: "Feni", lat: 23.0159, lon: 91.3976 },
{ name: "Mymensingh", lat: 24.7434, lon: 90.3984 },
{ name: "Bajitpur", lat: 24.2138, lon: 90.9522 },
{ name: "Sherpur", lat: 25.0194, lon: 90.0137 },
{ name: "Pabna", lat: 24.0064, lon: 89.2493 },
{ name: "Shyamnagar", lat: 22.3373, lon: 89.1087 },
{ name: "Chandpur", lat: 23.2321, lon: 90.6631 },
{ name: "Raozan", lat: 22.5277, lon: 91.9206 },
{ name: "Kurigram", lat: 25.8103, lon: 89.6487 },
{ name: "Jagannathpur", lat: 24.7713, lon: 91.5456 },
{ name: "Dinajpur", lat: 25.6366, lon: 88.6363 },
{ name: "Fatulla", lat: 23.6376, lon: 90.4833 },
{ name: "Narsingdi", lat: 23.9207, lon: 90.7188 },
{ name: "Palash", lat: 23.9880, lon: 90.6488 },
{ name: "Joydebpur", lat: 23.9890, lon: 90.4182 },
{ name: "Savar", lat: 23.8583, lon: 90.2667 },
{ name: "Comilla", lat: 23.4500, lon: 91.2000 },
{ name: "Meherpur", lat: 23.7721, lon: 88.6314 },
{ name: "Dhaka", lat: 23.8103, lon: 90.4125 },
{ name: "Kishoreganj", lat: 24.4331, lon: 90.7866 },
{ name: "Jashore", lat: 23.1707, lon: 89.2124 },
{ name: "Sylhet", lat: 24.8948, lon: 91.8690 },
{ name: "Sylhet", lat: 24.8864, lon: 91.8807 },
{ name: "Dhaka", lat: 23.7772, lon: 90.3995 },
{ name: "Dhaka", lat: 23.8111, lon: 90.4076 }
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
