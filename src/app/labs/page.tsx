"use client";

import Image from "next/image";
import "./page.css";

import { useState, useCallback, useEffect } from 'react';
import { useRef } from 'react';

import FormCommon from "./FormCommon";
import TableCommon from "./TableCommon";
import Pagination from "./Pagination";


export default function Home() {

  return (
    <>

      <div className="container">
        <div className="content">

          <div className="col-fluid">
            
              <h2>Estudos de Javascript</h2>

              <ul className="lst-box">
                <li><a href="/labs/forms">Formulários em React</a></li>
                <li><a href="/labs/galeria">Galeria em React</a></li>
              </ul>
            
          </div>

          <div className="col-fix">
          </div>

        </div>

      </div>
    </>
  );
}
