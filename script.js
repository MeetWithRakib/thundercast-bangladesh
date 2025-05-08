// script.js

// জেলা ড্রপডাউন লোড
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
  });

// পূর্বাভাস হিসাব
function calculateThunderRisk(cape, lcl) {
  if (cape > 1500 && lcl < 2000) return 'উচ্চ';
  if (cape > 800 && lcl < 2500) return 'মাঝারি';
  return 'কম';
}

// ড্রপডাউন পরিবর্তনে API কল
const select = document.getElementById('district');
select.addEventListener('change', () => {
  const val = select.value;
  if (!val) return;

  const { lat, lon } = JSON.parse(val);
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