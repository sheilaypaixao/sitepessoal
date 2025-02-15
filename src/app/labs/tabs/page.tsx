"use client";

import "./page.scss";

import {useState, useRef} from 'react';
import Tab from "./Tab";
import Accordion from "./Accordion";

export default function Home() {
	const data = [{label:"Tab1", content: "Teste teste"},
					{label:"Tab1", content: "<h3>Título</h3>Teste teste2"},
					{label:"Tab3", content: "Teste teste3"},
					{label:"Tab4", content: "Teste teste4"}];
	
	var [lstData, setLstData] = useState(data);
	var refTab = useRef(null);
	var [type, setType] = useState("A");

	function handleSubmit(e){
		e.preventDefault();

		let el = e.target;
		let label = el.querySelector("#label").value;
		let content = el.querySelector("#content").value;

		setLstData([...lstData, {label: label, content: content}]);

		console.log(lstData);

		//console.log(el,label, content);

		//refTab.current!.addTab({label: label, content: content});
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