const api = "https://api.wheretheiss.at/v1/satellites/25544"
const mymap = L.map('mapid').setView([0, 0], 3.5);
const attribution =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
const iconUrl = "http://pluspng.com/img-png/iss-png-following-the-space-shuttle-columbia-disaster-in-2003-construction-of-the-station-is-halted-the-assembly-of-the-station-resumes-in-2006-896.png"
tiles.addTo(mymap);
const issIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [50, 32],
    iconAnchor: [25, 16]
  });
let marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
mymap.on('zoomend', function() {
       const zoom = mymap.getZoom() + 1;
       const w = 25 * zoom;
       const h = 16 * zoom;
       issIcon.options.iconSize = [w, h];
       issIcon.options.iconAnchor = [w / 2, h / 2];
       mymap.removeLayer(marker);
       let latlng = marker.getLatLng();
       marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
       marker.setLatLng(latlng);
     });

var cnt = 0;
async function getISS() {
  const res = await fetch(api);
  const data = await res.json();
  const {latitude, longitude} = data;

  if (cnt == 0) {
    mymap.setView([latitude, longitude], mymap.getZoom());
  }
  marker.setLatLng([latitude, longitude]);

  document.getElementById('lat').textContent = latitude.toFixed(3);
  document.getElementById('lon').textContent = longitude.toFixed(3);
  cnt++;
  if(cnt > 10){
    cnt = 0;
  }
  console.log(data);
  console.log(cnt);
}

getISS();
setInterval(getISS, 1050);
