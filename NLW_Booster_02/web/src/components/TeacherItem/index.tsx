import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
const TeacherItem: React.FC = () => {
  return(
    <article className="teacher-item">
      <header>
          <img src="https://avatars3.githubusercontent.com/u/48757658?s=460&u=9b0c0b4812cace22b107667ae7699d28e6bce203&v=4" alt="DenisMedeirosSDK"/>
          <div>
            <strong>Denis Medeiros</strong>
          <span>Tecnologia</span>
        </div>
      </header>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi molestiae quod exercitationem praesentium nesciunt at! Unde dolorum suscipit quo iusto, temporibus recusandae voluptatum, laboriosam mollitia doloremque sed, itaque omnis ad!</p>
      <footer>
          <p>
            Preço/hora
            <strong>R$ 100,00</strong>
          </p>
          <button type="button">
            <img src={whatsappIcon} alt="whatsappIcon"/>
            Entrar em contato
          </button>
      </footer>
    </article>
  )
}

export default TeacherItem