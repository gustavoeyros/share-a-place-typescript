import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "InsiraSuaKeyAqui";

declare var google: any; // irá liberar acesso para o TS entender que existe essa variável atribuída globalmente

type GoogleGeoResponse = {
  results: { geometry: { location: { lat: number; long: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddress(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeoResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Endereço não encontrado!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 8,
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
    });
  //send info to google api
}

form?.addEventListener("submit", searchAddress);
