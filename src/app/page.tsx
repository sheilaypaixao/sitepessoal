import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
        <div className="content">

          <div className="col-fluid">
            <div className="box">
              <h2>Em construção</h2>

              <h2>Estudos em Javascript</h2>

              

               <ul className="lst-box">
                <li><a href="/labs/forms">Formulários em React</a></li>
                <li><a href="/labs/galeria">Galeria em React</a></li>
              </ul>

            </div>
          </div>

          <div className="box col-fix">
          </div>

        </div>
    </div>
  );
}
