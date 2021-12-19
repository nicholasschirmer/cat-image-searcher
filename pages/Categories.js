import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from '../styles/Home.module.css'
import {FaHatCowboy} from "react-icons/fa"
import { Card } from "react-bootstrap";
import Link from "next/link";

export default function Categories() {

  const [categories, setCategories] = useState([])

  function saveSelection(id){
    localStorage.setItem("currentCategory", id)
  }

  useEffect(async () => {
    const res = await fetch("https://api.thecatapi.com/v1/categories", {
      method: "GET",
      headers: {
        "x-api-key": "5924d782-dbf2-4574-bf70-ed7743edccc4",
      },
    })
      .then((response) => response.json())
      .then((data) => data);
    setCategories(res);
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.pageHeading}><h2>Categories <FaHatCowboy/></h2></div>
      <div className={styles.cssGrid}>
        {categories.length != 0 && (
          categories.map((b) => (
            <Link href="/CatSearch">
            <Card style={{width: "18rem"}} onClick={() => saveSelection(b.id)}>
              <Card.Body>
                <Card.Title>
                  {b.name}
                </Card.Title>
              </Card.Body>
            </Card>
            </Link>
          ))
        )}
        {console.log(categories)}
      </div>
    </div>
  );
}
