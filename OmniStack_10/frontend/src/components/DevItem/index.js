import React from 'react';

import { MdDelete } from 'react-icons/md'

import './styles.css';

export default function DevItem({ dev }) {
    return (
        <li className="dev-item">
            <header>
                    <img src={dev.avatar_url} alt={dev.name} />
                    <button className="delete-button">
                        <MdDelete className="delete-icon" />
                    </button>

                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil Github</a>
        </li>
    )
}