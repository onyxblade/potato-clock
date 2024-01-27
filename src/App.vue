<template>
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
    <button v-if="!segments.currentSegment" @click="segments.createSegment">Create Segment</button>
    <button v-else @click="segments.closeCurrentSegment">Close Current Segment</button>
    <button @click="segments.clearAllSegments">Clear All Segments</button>
  </section>
</template>

<script setup>
import useSegments from './composables/useSegments'

const segments = useSegments()

function durationString(duration) {
  const seconds = duration
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const secondsString = `${seconds % 60}s`
  const minutesString = minutes ? `${minutes % 60}m ` : ''
  const hoursString = hours ? `${hours}h ` : ''
  return `${hoursString}${minutesString}${secondsString}`
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
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
