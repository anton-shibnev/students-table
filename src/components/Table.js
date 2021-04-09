import { studentsStore } from '../store/data.js'
import { Component } from './index.js'
import { Student } from './Student.js'

export class Table extends Component {
  constructor({ selector, data }) {
    super(selector)
    this.data = data
    this.$table = this.$el
    this.$tableBody = this.$table.querySelector('tbody')

    this.sortButtons = {
      lastName: {
        el: this.$el.querySelector('#sortTableNames'),
        switcher: false,
      },
      faculty: {
        el: this.$el.querySelector('#sortTableFac'),
        switcher: false,
      },
      dateOfBirth: {
        el: this.$el.querySelector('#sortTableAge'),
        switcher: false,
      },
      yearOfStart: {
        el: this.$el.querySelector('#sortTableStuddingYears'),
        switcher: false,
      },
    }

    this.filterInputs = {
      fullName: document.querySelector('#filterName'),
      faculty: document.querySelector('#filterFac'),
      yearOfStart: document.querySelector('#filterStartYear'),
      yearOfEnd: document.querySelector('#filterEndYear'),
    }

    this.fillTable()
    this.getFilter()
    this.sort()
  }

  initTableColContent(content, $tr, tag = 'td') {
    const $col = document.createElement(tag)

    $col.innerText = content
    $tr.appendChild($col)
  }

  addStudent(student) {
    const $tr = document.createElement('tr')

    this.$tableBody.appendChild($tr)

    for (const value in student) {
      if (Object.hasOwnProperty.call(student, value)) {
        const element = student[value]

        this.initTableColContent(element, $tr)
      }
    }
  }

  clearTableBody() {
    this.$tableBody.innerHTML = ''
  }

  updateData() {
    this.data = studentsStore.getData()
  }

  fillTable(func = 'sort', callBackFunc) {
    this.updateData()
    if (!this.data) return

    this.clearTableBody()

    this.data[func](callBackFunc).forEach((obj) => {
      const student = new Student(obj).prepareForTable()

      this.addStudent(student)
    })
  }

  // sort
  toggleSort(key) {
    this.fillTable('sort', (a, b) => {
      const thatA = typeof a === 'string' ? a[key].toUpperCase() : a[key]
      const thatB = typeof b === 'string' ? b[key].toUpperCase() : b[key]

      if (this.sortButtons[key].switcher) {
        return thatA > thatB ? 1 : -1
      } else {
        return thatA > thatB ? -1 : 1
      }
    })

    this.sortButtons[key].switcher = !this.sortButtons[key].switcher
  }

  sort() {
    for (const buttonKey in this.sortButtons) {
      if (Object.hasOwnProperty.call(this.sortButtons, buttonKey)) {
        const $button = this.sortButtons[buttonKey].el

        $button.addEventListener('click', (e) => {
          e.preventDefault()

          this.toggleSort(buttonKey)
        })
      }
    }
  }

  // filter
  filterByKey(inputValue, key) {
    if (inputValue.length) {
      this.fillTable('filter', (student) =>
        String(student[key]).includes(inputValue)
      )
    } else {
      this.fillTable()
    }
  }

  getFilter() {
    for (const inputKey in this.filterInputs) {
      if (Object.hasOwnProperty.call(this.filterInputs, inputKey)) {
        const $input = this.filterInputs[inputKey]

        $input.addEventListener('input', () => {
          this.filterByKey($input.value, inputKey)
        })
      }
    }
  }
}
