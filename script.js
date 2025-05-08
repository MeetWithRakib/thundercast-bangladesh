// districts.json ফাইল থেকে ডেটা লোড করা
fetch('districts.json')
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('district');
    data.forEach(d => {
      const option = document.createElement('option');
      option.value = JSON.stringify({ lat: d.lat, lon: d.lon });
      option.textContent = d.name;
      select.appendChild(option);
    });
  })
  .catch(err => console.error('Error loading districts:', err));

// API থেকে ডেটা ফেচ এবং ঝড়ের পূর্বাভাস ক্যালকুলেশন
document.getElementById('district').addEventListener('change', function () {
  const selectedDistrict = JSON.parse(this.value);
  if (!selectedDistrict) return;

  const { lat, lon } = selectedDistrict;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cape,cloud_base_height&timezone=auto`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const cape = data.hourly.cape[0];
      const lcl = data.hourly.cloud_base_height[0];

      document.getElementById('cape').textContent = cape;
      document.getElementById('lcl').textContent = lcl;
      document.getElementById('risk-level').textContent = calculateThunderRisk(cape, lcl);
      document.getElementById('result').classList.remove('hidden');
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      alert('ডেটা আনতে সমস্যা হয়েছে।');
    });
});

// ঝড়ের ঝুঁকি নির্ধারণের ফাংশন
function calculateThunderRisk(cape, lcl) {
  if (cape > 1500 && lcl < 2000) {
    return 'উচ্চ ঝুঁকি';
  } else if (cape > 800 && lcl < 2500) {
    return 'মাঝারি ঝুঁকি';
  } else {
    return 'নিম্ন ঝুঁকি';
  }
}
