import * as data from './data.json'
import fs from 'fs'

export default {
  getDatabase () {
    try {
      return data
    } catch (error) {
      console.log(error)
    }
  },
  saveDatabase (data) {
    try {
      let json = JSON.stringify(data)

      fs.writeFile('app/database/data.json', json, (err) => {
        if (err) return console.log(err)
      })

    } catch (error) {
      console.log(error)
    }
  }
}