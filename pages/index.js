import styles from "../styles/Home.module.css";
import { FaPortrait, FaLockOpen, FaLock } from "react-icons/fa";
import Header from "./Header";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const [userName, setUserName] = useState("");
  const router = useRouter()

  function handleChange(e) {
    setUserName(e.target.value);
    console.log(e.target.value);
  }

  function handleLogin() {
    localStorage.setItem("catUserName", userName);
  }

  useEffect(() => {
    if (localStorage.getItem("catUserName") != undefined) {
      console.log("this user is already logged in");
      router.push("/CatSearch")
    }
  }, []);

  return (
    <div>
      <div className={styles.pageHeading}>
        <h2>
          log In <FaPortrait />
        </h2>
      </div>
      <div>
        <Card className={styles.loginCard}>
          <Card.Body>
            <Card.Title>Please enter a name:</Card.Title>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="username"
                aria-describedby="basic-addon2"
                onChange={handleChange}
              />
              <Link href="/CatSearch">
                <Button
                  onClick={handleLogin}
                  variant="outline-info"
                  id="button-addon2"
                  disabled={userName == ""}
                >
                  Submit
                </Button>
              </Link>
            </InputGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
