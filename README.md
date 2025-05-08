# ⚡ Thunderstorm Forecast Web App (Bangladesh)

A simple web application that provides short-term thunderstorm risk forecasts for different locations in Bangladesh using meteorological parameters like CAPE and LCL.

## 🌐 Live Demo

Host it using **GitHub Pages** or any static site hosting provider. [Guide below](#-how-to-deploy-on-github-pages).

## 📁 Project Structure

```
├── index.html           # Main HTML interface
├── style.css            # Styling file
├── script.js            # JavaScript logic for dynamic fetching
├── districts.json       # List of Bangladeshi locations with lat/lon
└── README.md            # Project documentation
```

## 📦 Features

* Dropdown for selecting Bangladeshi cities/upazilas
* Automatic CAPE & LCL fetch from Open-Meteo API
* Risk calculation logic based on thresholds
* Responsive & clean UI

## ⚙ How it works

1. User selects a place from the dropdown
2. App fetches CAPE & LCL values from Open-Meteo API
3. Applies rule:

   * High Risk: CAPE > 1500 & LCL < 2000
   * Medium Risk: CAPE > 800 & LCL < 2500
   * Low Risk: Otherwise

## 🚀 How to Deploy on GitHub Pages

1. Push your project to GitHub
2. Go to your repo > Settings > Pages
3. Set source to main branch & root
4. Your app will be live at:

   ```
   https://yourusername.github.io/repo-name/
   ```

## 🔗 API Used

* [Open-Meteo API](https://open-meteo.com/en/docs)

## 🙌 Contributing

Pull requests and improvements are welcome!

## 📜 License

MIT License
