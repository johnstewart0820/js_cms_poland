import React from "react";
import '../../styles/PlanerList/PlanerListContainer.scss';

const PlanerListContainer = ({title, children}) => {
    return(
        <div className="planer-list">
           <div className="container">
               <div className="heading">{title}</div>

               <div className="list">
                   {children}
               </div>
           </div>
        </div>
    )
}

export default PlanerListContainer;