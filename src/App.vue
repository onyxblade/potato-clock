<template>
  <main>
    <section>
      <table>
        <tr>
          <th>Opened at</th>
          <th>Closed at</th>
          <th>Duration</th>
        </tr>
        <tr v-for="segment in segments.list">
          <td>{{ segment.openedDateString }}</td>
          <td>{{ segment.closedDateString }}</td>
          <td>{{ durationString(segment.duration) }}</td>
        </tr>
      </table>
      All segments total: {{ durationString(segments.totalDuration) }}
    </section>

    <section class="buttons">
      <button v-if="!segments.currentSegment" @click="createSegment">Create Segment</button>
      <button v-else @click="segments.closeCurrentSegment">Close Current Segment</button>
      <button @click="segments.clearAllSegments">Clear All Segments</button>
    </section>
  </main>
  <div ref="bottom"></div>
</template>

<script setup>
import { ref, nextTick } from "vue"
import useSegments from './composables/useSegments'

const segments = useSegments()
const bottom = ref()

function durationString(duration) {
  const seconds = duration
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const secondsString = `${seconds % 60}s`
  const minutesString = minutes ? `${minutes % 60}m ` : ''
  const hoursString = hours ? `${hours}h ` : ''
  return `${hoursString}${minutesString}${secondsString}`
}

function createSegment() {
  segments.createSegment()
  nextTick(() => bottom.value.scrollIntoView())
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0px;
  width: 100%;
}
table,
th,
td {
  padding: 5px;
  border: 1px solid black;
}
section {
  margin-bottom: 12px;
}
main {
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
