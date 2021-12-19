import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "../styles/Home.module.css";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { Card } from "react-bootstrap";

export default function Favourites() {
  const [userName, setUserName] = useState("");
  const [catFavourites, setCatFavourites] = useState([]);

  useEffect(() => {
    setUserName(localStorage.getItem("catUserName"));
  }, []);

  useEffect(async () => {
    const res = await fetch(
      "https://api.thecatapi.com/v1/favourites?sub_id=" + userName,
      {
        method: "GET",
        headers: {
          "x-api-key": "5924d782-dbf2-4574-bf70-ed7743edccc4",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data);
    setCatFavourites(res);
  }, []);

  function removeFavourite(imageId) {}

  return (
    <div>
      <Header />
      <div className={styles.pageHeading}>
        <h2>
          Favourites <FaHeart />
        </h2>
      </div>
      <div className={styles.cssGrid}>
        {console.log(catFavourites)}
        {catFavourites.length != 0 &&
          catFavourites.map((f) => (
            <Card
              className={styles.catCard}
              style={{ width: "18rem", height: "auto" }}
            >
              <Card.Img
                className={styles.catImg}
                variant="top"
                src={f.image.url}
              />
              <FaHeartBroken
                title="remove from favourites"
                onClick={() => removeFavourite(f.id)}
              />
            </Card>
          ))}
      </div>
    </div>
  );
}
