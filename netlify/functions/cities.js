/* eslint-disable no-unused-vars */
let cities = [
  {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: { lat: 38.727881642324164, lng: -9.140900099907554 },
    id: "73930385",
  },
  {
    cityName: "Madrid",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: { lat: 40.46635901755316, lng: -3.7133789062500004 },
    id: "17806751",
  },
  {
    cityName: "Berlin",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: { lat: 52.53586782505711, lng: 13.376933665713324 },
    id: "98443197",
  },
];

export async function handler(event, context) {
  const method = event.httpMethod;

  // GET - return all cities
  if (method === "GET") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cities }),
    };
  }

  // POST - add a new city
  if (method === "POST") {
    try {
      const newCity = JSON.parse(event.body);
      newCity.id = Date.now().toString(); // create unique id
      cities.push(newCity);

      return {
        statusCode: 201,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON body" }),
      };
    }
  }

  // Fallback for other methods
  return {
    statusCode: 405,
    headers: { Allow: "GET, POST" },
    body: JSON.stringify({ error: "Method Not Allowed" }),
  };
}
