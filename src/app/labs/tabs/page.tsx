"use client";

import "./page.scss";

import {useState, useRef} from 'react';
import Tab from "./Tab";
import Accordion from "./Accordion";

export default function Home() {
	const data = [{label:"Pré-História", content: "<ul><li>Período anterior à invenção da escrita. </li><li>Dividida em Paleolítico (caça, pesca, nomadismo), Neolítico (agricultura, sedentarização) e Idade dos Metais (metalurgia e primeiras cidades).</li></ul>"},
					{label:"Idade Antiga", content: "<ul><li>Início com a invenção da escrita. </li><li>Grandes civilizações: Egípcios, Mesopotâmios, Gregos, Romanos. </li><li>Expansão da cultura, política e religião.</li></ul>"},
					{label:"Idade Média", content: "<ul><li>Começa com a queda do Império Romano do Ocidente. </li><li>Feudalismo, poder da Igreja Católica, Cruzadas. </li><li>Fim marcado pela queda de Constantinopla (1453) ou chegada de Colombo à América (1492).</li></ul>"}];
	
	var [lstData, setLstData] = useState(data);
	var refTab = useRef(null);
	var [type, setType] = useState("T");

	function handleSubmit(e){
		e.preventDefault();

		let el = e.target;
		let label = el.querySelector("#label");
		let content = el.querySelector("#content");

		setLstData([...lstData, {label: label.value, content: content.value}]);

		label.value = "";
		content.value = "";

	}

	return(
	<>
		<div className="content">

        		<div className="col-fluid">
        			<div className="col-fluid-inner">
						{(type == "T")
            			?<Tab ref={refTab} data={lstData} />
            			:<Accordion ref={refTab} data={lstData} />
						}
            		</div>
        		</div>

        		<div className="box col-fix">

					<fieldset className="radio">
                  		<h4>Escolha um tipo:</h4>
                  		<input type="radio" id="tabs" value="T" name="type" checked={type === "T"} onChange={(e)=> setType(e.target.value) } />
						<label htmlFor="tabs">Tabs</label>

						<br/><input type="radio" id="accordion" value="A" checked={type === "A"} name="type" onChange={(e)=> setType(e.target.value)}  />
						<label htmlFor="accordion">Accordion</label>
                  		
                	</fieldset>

					<h3>Insira uma tab nova:</h3>
        			<form onSubmit={handleSubmit}>
        				<fieldset className="text">
                  			<label htmlFor="label">Label</label>
                  			<input required type="text" id="label" name="label" />
                		</fieldset>
        				<textarea required id="content" name="content"></textarea>

        				<button type="submit">Adicionar</button>
        			</form>

        		</div>
        </div>
	</>
	);
}