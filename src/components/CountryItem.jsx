/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./CountryItem.module.css";
import emojiToCountryCode from "../emojiToCountryCode";

function CountryItem({ country }) {
  // State to store the fetched SVG
  const [flagSVG, setFlagSVG] = useState(null); // State to store the fetched SVG
  const { country: countryName, emoji } = country;

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
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>
        {flagSVG ? (
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(flagSVG)}`}
            alt={`Flag of ${countryName}`}
            width="28"
          />
        ) : (
          emoji
        )}
      </span>
      <span>{countryName}</span>
    </li>
  );
}

export default CountryItem;
