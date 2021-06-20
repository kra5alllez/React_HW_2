export const pipeTime = timeSeconds => {
    let seconds = (timeSeconds % 60)
    let minutes = (timeSeconds - seconds) /60;
    let parSeconds = seconds < 10 ? '0'+seconds : seconds;
    let parMinutes = minutes < 10 ? '0'+minutes : minutes;
  
    return parMinutes + ' : ' + parSeconds;
  }