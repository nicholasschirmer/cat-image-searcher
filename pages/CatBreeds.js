import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "./Header";
import { FaPaw } from "react-icons/fa";
import { Card } from "react-bootstrap";
import Link from "next/link";

export default function CatBreeds() {
  const [breeds, setBreeds] = useState([]);

  function saveSelection(name) {
    localStorage.setItem("currentBreed", name);
  }

  useEffect(async () => {
    const res = await fetch("https://api.thecatapi.com/v1/breeds", {
      method: "GET",
      headers: {
        "x-api-key": "5924d782-dbf2-4574-bf70-ed7743edccc4",
      },
    })
      .then((response) => response.json())
      .then((data) => data);
    setBreeds(res);
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.pageHeading}>
        <h2>
          Breeds <FaPaw />
        </h2>
      </div>
      <div className={styles.cssGrid}>
        {breeds.length != 0 &&
          breeds.map((b) => (
            <Link href="/CatSearch">
              <Card
                style={{ width: "18rem" }}
                onClick={() => saveSelection(b.name)}
              >
                <Card.Body>
                  <Card.Title>{b.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          ))}
        {console.log(breeds)}
      </div>
    </div>
  );
}
