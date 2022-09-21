import { INavStyles } from "@fluentui/react";
import { Link } from "react-router-dom";

function NavBar(): JSX.Element{

    const navStyles: Partial<INavStyles> = {
        root: {
            width: 200,
            height: 300,
            boxSizing: 'border-box',
            border: '1px solid #eee',
            overflowY: 'auto'
        },
        link: {
            whiteSpace: 'normal',
            lineHeight: 'inherit'
        },
    };

    
    return(
        <></>
    );
}

export default NavBar;