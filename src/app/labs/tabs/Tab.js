
import {useState, useImperativeHandle, useRef} from 'react';

export default function Tab({ref, data}){

	//var [lstTabs, setLstTabs] = useState(tabs);
	var [currentTab, setCurrentTab] = useState(0);

	function handleSetTab(e,index){
		e.preventDefault();

		setCurrentTab(index);
	}

	function createMarkup(html) {
	  return {__html: html};
	}

	return(
		<div className="tabs">
			<ul className="tabs-menu">
			
			{data.map((tab,index) => (
	          <li className={(index==currentTab)?'active':''}  key={index}><a onClick={(e)=> handleSetTab(e,index)} href="#">{tab.label}</a></li>
	        ))}

			</ul>

			<div className="tabs-content" dangerouslySetInnerHTML={createMarkup(data[currentTab].content)} />
		</div>


	);
}