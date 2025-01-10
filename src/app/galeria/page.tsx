import Image from "next/image";
import "./page.css";

import Gallery from "./Gallery";

export default function Home() {
  return (
    <div className="btn">
      <Gallery />
    </div>
  );
}
