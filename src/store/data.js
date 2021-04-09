import { Store } from './Store.js'

export const KEY = 'students'
export const VALID_YEAR_START = 2000
export const VALID_START_DOB = '01.01.1900'
export const YEARS_STUDDING = 4
export const MONTH_START_STUDDING = 8 // september

export const studentsStore = new Store(KEY)
export const STUDENTS = studentsStore.getData()
