import { STUDENTS } from './store/data.js'
import { Table, Form } from './components/index.js'

export const App = document.querySelector('#root')

export const studentForm = new Form({
  selector: '#studentForm',
})

export const studentsTable = new Table({
  selector: '#studentsTable',
  data: STUDENTS,
})
