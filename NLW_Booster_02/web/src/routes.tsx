import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherForm from './pages/TeacherForm'
import TeacherList from './pages/TeacherList'

const Routes:React.FC = () => {
  return(
    <BrowserRouter>
      <Switch>
         <Route component={Landing}  path="/" exact />
        <Route component={TeacherList}  path="/study" />
        <Route component={TeacherForm}  path="/give-classes" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes