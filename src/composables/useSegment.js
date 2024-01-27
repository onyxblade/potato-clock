import { reactive, computed, ref } from "vue"

function leftPad(number) {
  const string = `${number}`
  if (string.length == 1) {
    return `0${string}`
  } else {
    return string
  }
}

function getDateString(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${leftPad(date.getHours())}:${leftPad(date.getMinutes())}:${leftPad(date.getSeconds())}`
}

function getSeconds(ms) {
  return Math.floor(ms / 1000)
}

export default function useSegment(opened, closed) {
  const openedDate = ref(new Date(opened))
  const closedDate = ref(closed ? new Date(closed) : null)

  const openedDateString = computed(() => getDateString(openedDate.value))
  const closedDateString = computed(() => {
    if (closedDate.value) {
      return getDateString(closedDate.value)
    } else return ''
  })

  const nowDate = ref(new Date())

  function refreshNowDate() {
    if (!closedDate.value) {
      nowDate.value = new Date()
      window.requestAnimationFrame(refreshNowDate)
    }
  }
  refreshNowDate()

  const duration = computed(() => {
    if (closedDate.value) {
      return getSeconds(+closedDate.value) - getSeconds(+openedDate.value)
    } else {
      return getSeconds(+nowDate.value) - getSeconds(+openedDate.value)
    }
  })

  function toJSON() {
    return {
      opened: +openedDate.value,
      closed: closedDate.value ? +closedDate.value : null
    }
  }

  return reactive({
    openedDate,
    closedDate,
    openedDateString,
    closedDateString,
    toJSON,
    duration
  })
}