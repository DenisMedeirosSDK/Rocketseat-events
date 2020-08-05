import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api'

export interface ITeacher {
  id:number;
  name:string;
  avatar:string;
  whatsapp:string;
  bio:string;
  subject:string;
  cost:number;
}
interface ITeacherProps {
  teacher: ITeacher;
}
const TeacherItem: React.FC<ITeacherProps> = ({ teacher }) => {
  function createNewConnection () {
    api.post('connections', {
      user_id: teacher.id
    })
  }

  return(
    <article className="teacher-item">
      <header>
          <img src={teacher.avatar} alt={teacher.name} />
          <div>
            <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
          <p>{teacher.bio}</p>
      <footer>
          <p>
            Preço/hora
            <strong>R$ {teacher.cost}</strong>
          </p>
          <a onClick={createNewConnection} href={`https://wa.me/+55${teacher.whatsapp}`}> 
            <img src={whatsappIcon} alt="whatsappIcon"/>
            Entrar em contato
          </a>
      </footer>
    </article>
  )
}

export default TeacherItem