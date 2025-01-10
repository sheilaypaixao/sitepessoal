import Image from "next/image";
import styles from "./page.module.css";

import Gallery from "./Gallery";

export default function Home() {
  return (
    <div className={styles.page}>
      

      <Gallery />  

    </div>
  );
}
