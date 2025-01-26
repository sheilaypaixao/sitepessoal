import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
        <div className="content">

          <div className="col-fluid">
            <div className="box">
              <h2>Laboratórios em React</h2>

              <ul>
                <li><a href="/labs/forms">Formulários</a></li>
              </ul>

            </div>
          </div>

          <div className="box col-fix">
          </div>

        </div>
    </div>
  );
}
