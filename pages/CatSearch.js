import React, { Component, useEffect, useState } from "react";
import { Card, FloatingLabel, Form, Select } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { FaSearch } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function CatSearch() {
  const [hasBreed, setHasBreed] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [currentBreed, setCurrentBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [searchedCats, setSearchedCats] = useState([]);
  const [scrollLimit, setScrollLimit] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

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
    setCurrentBreed(localStorage.getItem("currentBreed"));
    localStorage.removeItem("currentBreed");
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
    setCurrentCategory(localStorage.getItem("currentCategory"));
    // console.log(currentCategory)
    localStorage.removeItem("currentCategory");
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
      setIsLoading(true);
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
      setIsLoading(false);
    }
  }, [selectedBreed]);

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
  }, [scrollLimit]);

  useEffect(async () => {
    if (currentCategory != "") {
      setIsLoading(true);
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?category_ids=" +
          currentCategory +
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
      setIsLoading(false);
    }
  }, [currentCategory]);

  useEffect(async () => {
    if (currentCategory != "") {
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?category_ids=" +
          currentCategory +
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
  }, [scrollLimit]);

  function breedChange(e) {
    let { value } = e.target;
    setCurrentBreed(value);
    setSelectedCategory("");
    setCurrentCategory("");
    setScrollLimit(12);
    if (value == "") {
      setSearchedCats([]);
    }
  }

  function categoryChange(e) {
    let { name, value } = e.target;
    setCurrentCategory(value);
    setCurrentBreed("");
    setScrollLimit(12);
    for (let i = 0; i < categories.length; i++) {
      // console.log(categories[i].name);
      // console.log(categories[i].id);
      // console.log(value);
      if (categories[i].id == value) {
        setSelectedCategory(categories[i].name);
      }
    }
    if (value == "") {
      setSearchedCats([]);
    }
  }

  function HandleScrolled() {
    setScrollLimit(scrollLimit + 12);
  }

  async function addFavourite(imageId) {
    var res = await fetch(
      "https://api.thecatapi.com/v1/favourites?=image_id" + imageId,
      {
        method: "POST",
        headers: {
          "x-api-key": "5924d782-dbf2-4574-bf70-ed7743edccc4",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: imageId,
          sub_id: localStorage.getItem("catUserName"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => data);
    console.log(res);
  }

  return (
    <div>
      <Header />
      <div className={styles.pageHeading}>
        <h2>
          Search <FaSearch />
        </h2>
      </div>
      <div>
        {selectedCategory != "" && (
          <div className={styles.pageHead}>
            <h2>
              <b>{selectedCategory}</b>
            </h2>
          </div>
        )}
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
          <div className={styles.cssGrid1}>
            <label style={{ gridColumn: "span 1" }}>Select a breed: </label>
            <div></div>
            <label style={{ gridColumn: "span 1" }}>Select a category: </label>
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
            <div></div>
            {breeds.length != 0 && breeds != undefined && (
              <Form.Select
                className={styles.select}
                onChange={categoryChange}
                value={currentCategory}
              >
                <option value={""}></option>
                {categories.map((n) => (
                  <option value={n.id} key={n.id} name={n.name}>
                    {n.name}
                  </option>
                ))}
              </Form.Select>
            )}
            {isLoading && (
              <Spinner
                animation="grow"
                variant="info"
                className={styles.spinner}
              />
            )}
            {searchedCats.length != 0 &&
              !isLoading &&
              searchedCats.map((c) => (
                <Card
                  className={styles.catCard}
                  style={{ width: "18rem", height: "auto" }}
                >
                  <Card.Img
                    className={styles.catImg}
                    variant="top"
                    src={c.url}
                  />
                  <AiFillHeart
                    title="add to favourites"
                    onClick={() => addFavourite(c.id)}
                  />
                </Card>
              ))}
            {searchedCats.length != 0 && !isLoading && (
              <button
                className={styles.scrollButton + " btn btn-secondary"}
                onClick={HandleScrolled}
                disabled={searchedCats.length < scrollLimit}
              >
                load more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
