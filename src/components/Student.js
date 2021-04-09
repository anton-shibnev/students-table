import { MONTH_START_STUDDING, YEARS_STUDDING } from '../store/data.js'

export class Student {
  constructor({
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    yearOfStart,
    faculty,
  }) {
    this.firstName = firstName
    this.lastName = lastName
    this.middleName = middleName
    this.faculty = faculty
    this.dateOfBirth = new Date(dateOfBirth)
    this.yearOfStart = yearOfStart
    this.yearOfEnd = new Date(
      +this.yearOfStart + YEARS_STUDDING,
      MONTH_START_STUDDING - 1
    ).getFullYear()
    this.fullName = `${this.lastName} ${this.firstName} ${this.middleName}`
  }

  calcAge(start) {
    const differenceMs = Date.now() - start.getTime()
    const ageDate = new Date(differenceMs)

    return Math.abs(ageDate.getFullYear() - 1970)
  }

  formatDob() {
    return `${this.dateOfBirth.getDay() + 1}.${
      this.dateOfBirth.getMonth() + 1
    }.${this.dateOfBirth.getFullYear()}`
  }

  endStuddingYear() {
    const now = Date.now()
    const startDate = new Date(this.yearOfStart)
    const endDate = new Date(
      +this.yearOfStart + YEARS_STUDDING,
      MONTH_START_STUDDING - 1
    )
    const nowCourse = this.calcAge(startDate) + 1

    const endString = `${startDate.getFullYear()} - ${endDate.getFullYear()} (${
      now < endDate.getTime() ? `${nowCourse} курс` : 'закончил'
    })`

    return endString
  }

  prepareForTable() {
    return {
      fullName: this.fullName,
      faculty: this.faculty,
      dataOfBirth: `${this.formatDob()} (${this.calcAge(this.dateOfBirth)})`,
      studdingYears: `${this.endStuddingYear()}`,
    }
  }
}
