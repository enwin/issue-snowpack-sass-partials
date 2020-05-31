import {map as createMap, marker, tileLayer} from "/web_modules/leaflet/dist/leaflet-src.esm.js";
import "./tool/ui.js";
import geo2 from "./module/geo.js";
document.querySelector('[data-action="locate"]').addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  button.disabled = true;
  button.classList.add("loading");
  const result = await geo2.locate();
  button.disabled = false;
  button.classList.remove("loading");
  const map = createMap("map", {
    zoomControl: false
  }).setView([result.location.lat, result.location.lon], 17);
  tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png", {
    attribution: "&copy; Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
  }).addTo(map);
  marker([result.location.lat, result.location.lon]).addTo(map);
});
