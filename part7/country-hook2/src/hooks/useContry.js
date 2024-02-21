import { useState, useEffect } from "react";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setCountry({ found: false });
          } else {
            setCountry({ found: true, data: data });
          }
        });
    }
  }, [name]);

  return country;
}