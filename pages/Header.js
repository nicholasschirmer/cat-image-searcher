import styles from "../styles/Home.module.css";
import CatSearch from "./CatSearch";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import CatBreeds from "./CatBreeds";
import Categories from "./Categories";
import Favourites from "./Favourites";

export default function Header() {
  return (
    <div>
      <div className={styles.header}>
        <nav className={styles.navigation}>
          <Link href="/CatSearch">
            <a className={styles.navItem}>
              <FaSearch />
              Search
            </a>
          </Link>
          <Link href="/CatBreeds">
            <a className={styles.navItem}>Breeds</a>
          </Link>
          <Link href="/Categories">
            <a className={styles.navItem}>Categories</a>
          </Link>
          <Link href="/Favourites">
            <a className={styles.navItem}>Favourites</a>
          </Link>
        </nav>
        <p className={styles.heading}>CatzWow</p>
        <hr></hr>
      </div>
    </div>
  );
}
