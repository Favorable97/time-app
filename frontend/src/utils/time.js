import moment from 'moment'

function startInterval() {
  setInterval(() => {
    this.currentTime = moment().format('HH:mm:ss')
  }, 1000)
}

function saveTime() {
  const time = this.currentTime
  this.axios.post('/times', {
      time: time
    })
    .then(response => {
      if (response.data.insertId) {
        this.savedTimes.unshift({ id: response.data.insertId, time })
        this.$toast.success(`Время ${time} сохранено`, { position: 'top-right' })
      }
    })
    .catch(error => {
      console.log(error)
    })
}

function deleteTime(id) {
  this.axios.delete(`/time/${id}`)
    .then(response => {
      if (response.data.affectedRows) {
        this.savedTimes = this.savedTimes.filter((savedTime) => savedTime.id !== id)
        this.$toast.error(`Время с ID ${id} удалено`, {
          position: 'top-right',
        })
      }
    })
    .catch(error => console.error(error))
}

export { startInterval, saveTime, deleteTime }
