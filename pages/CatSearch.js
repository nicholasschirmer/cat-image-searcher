import React, { Component, useEffect, useState } from "react";
import { Card, FloatingLabel, Form, Select } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

export default function CatSearch() {
  const [hasBreed, setHasBreed] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [currentBreed, setCurrentBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [searchedCats, setSearchedCats] = useState([]);
  const [scrollLimit, setScrollLimit] = useState(12);

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

  useEffect(async () => {
    const res = await fetch(
      "https://api.thecatapi.com/v1/breeds/search?q=" + currentBreed,
      {
        method: "GET",
        headers: {
          "x-api-key": "5924d782-dbf2-4574-bf70-ed7743edccc4",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data);
    setSelectedBreed(res);
    if (currentBreed != "") {
      setHasBreed(true);
    } else {
      setHasBreed(false);
    }
  }, [currentBreed]);

  useEffect(async () => {
    if (selectedBreed.length != 0) {
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?breed_ids=" +
          selectedBreed[0].id +
          "&limit=" +
          scrollLimit,
        {
          method: "GET",
          headers: {
            "x-api-key": "5924d782-dbf2-4574-bf70-ed7743edccc4",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => data);
      setSearchedCats(res);
    }
  }, [selectedBreed]);

  function breedChange(e) {
    let { value } = e.target;
    setCurrentBreed(value);
    setCurrentCategory("");
    if (value == "") {
      setSearchedCats([]);
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.page}>
        {" "}
        {hasBreed && selectedBreed.length != 0 && (
          <div className={styles.pageHead}>
            <h2>
              <b>{currentBreed}</b>
            </h2>
            <h3>
              <b>description</b>:
            </h3>
            <p>{selectedBreed[0].description}</p>
          </div>
        )}
        <div className={styles.PageConetents}>
          {console.log(breeds)}
          <div className={styles.flexContainer}>
            <div className={styles.flexObject}>
              <label>Select a breed: </label>
              {breeds.length != 0 && breeds != undefined && (
                <Form.Select
                  className={styles.select}
                  onChange={breedChange}
                  value={currentBreed}
                >
                  <option value={""}></option>
                  {breeds.map((n) => (
                    <option value={n.name} key={n.id}>
                      {n.name}
                    </option>
                  ))}
                </Form.Select>
              )}
            </div>
            <div className={styles.flexObject}>
              <label>Select a category: </label>
              {breeds.length != 0 && breeds != undefined && (
                <Form.Select className={styles.select} value={currentCategory}>
                  <option value={""}></option>
                  {categories.map((n) => (
                    <option value={n.id} key={n.id}>
                      {n.name}
                    </option>
                  ))}
                </Form.Select>
              )}
            </div>
          </div>
          <div className={styles.catPics}>
            {console.log(searchedCats)}
            {searchedCats.map((c) => (
              <Card
                className={styles.catCard}
                style={{ width: "18rem", height: "auto" }}
              >
                <Card.Img className={styles.catImg} variant="top" src={c.url} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
