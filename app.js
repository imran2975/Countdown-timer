const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')

let tepmDate = new Date()
let tempYear = tepmDate.getFullYear()
let temMonth = tepmDate.getMonth()
let temDay = tepmDate.getDate()
let temHour = tepmDate.getHours()
let temMin = tepmDate.getMinutes()
let temSec = tepmDate.getSeconds()


// let futureDate = new Date(2023,0,31,12,38,0)
const futureDate = new Date(tempYear, temMonth, temDay, temHour, temMin, temSec + 10)
const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()
let month = futureDate.getMonth()
month = months[month]
const date = futureDate.getDate()

const weekday = weekdays[futureDate.getDay()]
giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`

//future time in ms
const futureTime = futureDate.getTime()
//console.log(futureTime);

function getRemainingTime() {
  const today = new Date().getTime()
  const t = futureTime - today
  // 1s = 1000ms
  //1m = 60s
  //1hr = 60m
  //1d = 24hr

  //values in ms
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000
  //cal all values
  let days = t / oneDay
  days = Math.floor(days)
  let hours = Math.floor((t % oneDay) / oneHour)
  let minutes = Math.floor((t % oneHour) / oneMinute)
  let seconds = Math.floor((t % oneMinute) / 1000)
  
  //set values arrays
  const values = [days, hours, minutes, seconds]

  function format(item){
    if(item < 10){
      return (item = `0${item}`)
    }
    return item
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index])
  })
  if (t < 0){
    clearInterval(countDown)
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`
  }
}

//count down 
let countDown = setInterval(getRemainingTime, 1000)

getRemainingTime()
