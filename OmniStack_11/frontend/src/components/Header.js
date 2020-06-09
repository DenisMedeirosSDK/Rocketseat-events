import React from 'react';

function Header({ children, title }) {
    return (
        <header>
            <h1>{title.title}</h1>
        </header>
    )
}

export default Header;