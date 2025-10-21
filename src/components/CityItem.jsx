/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";
import { useEffect, useState } from "react";
import emojiToCountryCode from "../emojiToCountryCode";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, country, emoji, date, id, position } = city;

  // State to store the fetched SVG
  const [flagSVG, setFlagSVG] = useState(null); // State to store the fetched SVG

  useEffect(() => {
    if (emoji) {
      // Get the lowercase text country code from the emoji property
      const countryCode = emojiToCountryCode[emoji];
      if (countryCode) {
        fetch(
          `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${countryCode}.svg`
        )
          .then((response) => response.text())
          .then((svg) => {
            setFlagSVG(svg);
          })
          .catch((error) => {
            console.error("Error fetching SVG:", error);
          });
      }
    }
  }, [emoji]);

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* Add SVG image of flag to fix issue with flag emoji not showing up */}
        <span className={styles.emoji}>
          {flagSVG ? (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(flagSVG)}`}
              alt={`Flag of ${country}`}
              width="28"
            />
          ) : (
            emoji
          )}
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
