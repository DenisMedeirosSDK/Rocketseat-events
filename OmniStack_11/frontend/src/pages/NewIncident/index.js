import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };
        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return (
        <div className="new-incident-container ">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhamente para encontrar um herói para resolver isso. </p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Valor"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        required
                    />

                    <div className="input-group">
                        <input placeholder="Cidade" required />
                        <input placeholder="UF" style={{ width: 80 }} required />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}