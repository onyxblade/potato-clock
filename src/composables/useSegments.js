import { reactive, computed } from "vue"
import useSegment from './useSegment'

const STORAGE_KEY = 'potato-clock-segments'

export default function useSegments() {
  const list = reactive(loadList())
  const currentSegment = computed(() => list.find(x => x.closedDate === null))

  function createSegment() {
    if (!currentSegment.value) {
      list.push(useSegment(+new Date(), null))
      saveList()
    }
  }

  function closeCurrentSegment() {
    if (currentSegment.value) {
      currentSegment.value.closedDate = new Date()
      saveList()
    }
  }

  function clearAllSegments() {
    list.length = 0
    saveList()
  }

  function loadList() {
    const json = window.localStorage.getItem(STORAGE_KEY)
    if (json) {
      return JSON.parse(json).map(x => useSegment(x.opened, x.closed))
    } else {
      return []
    }
  }

  function saveList() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.map(x => x.toJSON())))
  }

  const totalDuration = computed(() => list.map(x => x.duration).reduce((acc, x) => acc + x))

  return reactive({
    list,
    currentSegment,
    createSegment,
    closeCurrentSegment,
    clearAllSegments,
    totalDuration
  })
}