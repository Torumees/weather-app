# Weather App 🌤️

Lihtne Reactil põhinev ilmaäpp, mis kasutab Open-Meteo avalikku API-t ning võimaldab otsida ilma linnanime järgi. Projekt on loodud eesmärgiga harjutada API päringute tegemist, asünkroonset andmetöötlust ning Reacti olekuhaldust (State Management). Rakendusse on lisatud ka otsinguajalugu, mis salvestatakse brauseri localStorage abil.

---

## 🚀 Funktsionaalsus

✅ Otsi ilma linnanime järgi  
✅ Kuvab temperatuuri ja tuulekiirust  
✅ Laadimise olek (“loading state”)  
✅ Vigade käsitlemine (vale linna nimi, võrguvead)  
✅ Otsingu ajalugu (localStorage, kuni 3 viimast otsingut)  
✅ Kiirklõps viimastele otsingutele  

---

## 🛠️ Tehnoloogia

Projekt on ehitatud järgmiste tehnoloogiatega:

| Tehnoloogia        | Kasutus                          |
|--------------------|----------------------------------|
| React (Vite)       | Front-end raamistik              |
| JavaScript (ES6+)  | Keel                             |
| Open-Meteo API     | Ilmaandmete päringud             |
| CSS / Inline style | Kujundus                         |
| localStorage       | Otsingu ajaloo salvestamine      |

---

## 🔧 Paigaldamine ja käivitamine

Klooni repo:
```bash
git clone https://github.com/torumees/weather-app.git
cd weather-app


## Install
npm install

## Dev
npm run dev

## Build
npm run build

## Vercel LIVE
https://weather-app-three-wine-32.vercel.app/