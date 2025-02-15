"use client";

import Image from "next/image";
import "./page.css";
import MenuStudyJS from "../includes/MenuStudyJS";

import { useRef } from 'react';


export default function Home() {

  return (
    <>

      <div className="container">
        <div className="content">

          <div className="col-fluid">
              <MenuStudyJS />
          </div>

          <div className="col-fix">
          </div>

        </div>

      </div>
    </>
  );
}
