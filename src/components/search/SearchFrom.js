import React from 'react';
import {SearchIcon} from "../../svg/icons";
import "../../styles/search/search-form.scss";
import TourismRoutes from "../../constants/TourismRoutes";
import {useHistory} from "react-router-dom";
import { isFunction } from '../../extra/functions';

const SearchFrom = props => {
    const history = useHistory();
    const [valueInput, setValueInput] = React.useState("");

    const input = document.getElementById("q");
    if ( input ) {
        input.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
					 if ( document.getElementById("click")) 
					 	document.getElementById("click").click();
            }
        });
	 }
	 

	 const submit = e => {
		e.preventDefault();

		if ( isFunction( props.submitCallback )) props.submitCallback();
	
		history.push({
			pathname: TourismRoutes.SearchPage,
			search: '?q=' + valueInput,
		})
	}

    return (
        <div className="search-form">
            <input name="q" id="q" type="text" onChange={e => setValueInput(e.target.value)} placeholder="Szukaj"/>
            <a id="click" type="submit" onClick={ submit } className='planer-button'><SearchIcon/></a>
        </div>
    )
}
export default SearchFrom;