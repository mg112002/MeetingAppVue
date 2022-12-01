<template>
  <div>
  <h2>Calendar</h2>
  <hr />
  <div class="info-picker-div">
    <p class="date-info">{{getDateString}}</p>
    <input type="date" class="date-picker" v-model="date" value="date" @change="getMeetings" />
  </div>
  <p class="day mb-0">{{ getDay }}</p>
  <div class="main-content">
    <div class="time-container">
      <div class="calendar-date" v-for="n in 24" :key="n">{{n-1}}</div>
    </div>
    <div class="content-container">
      <div class="content-box" v-for="n in 24" :key="n"></div>
    </div>
    <div 
    class="meeting-info" 
    v-for="meeting in meetings" 
    :key="meeting._id" 
    :style="{ 'top': 56.1 * (meeting.startTime.hours) + 'px', 'height': (50 * (meeting.endTime.hours - meeting.startTime.hours)) + meeting.endTime.minutes +'px' }">
    <h4>{{meeting.name}}</h4>
    <hr>
    <p>Attendees: {{ getMembers(meeting)}}</p>
    </div>
  </div>
  </div>
</template>

<script>

import {getCalMeetings} from '@/services/meetings'

export default {
  name: 'CalendarPage',
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      meetings: []
    }
  },
  methods: {
    async getMeetings(e) {
      this.meetings = await getCalMeetings(e.target.value)
      this.members=[]
      this.meetings.forEach(meeting => {
        meeting.attendees.forEach(attendee => {
          this.members.push(attendee.email)
        })
      })
    },
    getMembers(meeting) {
      const members = []
      meeting.attendees.forEach(attendee => members.push(attendee.email))
      return members.join(", ")
    }
  },
  computed: {
    getDateString() {
      let d = new Date(this.date)
      const month = d.toLocaleString("en-US", { month: "long" })
      const year = d.getFullYear()
      
      return `${d.getDate()} ${month} ${year}`
    },
    getDay() {
      let d = new Date(this.date)
      const days = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
      }
      return days[d.getDay()]
    },
  },
  async created() {
    await getCalMeetings(this.date)
      .then(meetings => {
        this.meetings = meetings
        this.meetings.forEach(meeting => {
          meeting.attendees.forEach(attendee => {
            this.members.push(attendee.email)
          })
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
h2,h3 {
  font-weight: bolder;
}
.info-picker-div{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
}
.date-picker{
  width: 300px;
    border: 1px solid lightgray;
    border-radius: 4px;
    font-weight: bold;
    font-size: 18px;
    padding: 8px;
    color: #7e7e7f;
}
.date-info{
  font-size: 20px;
    font-weight: bold;
}
.day{
  color: #7e7e7f;
    font-size: 16px;
    font-weight: bold;
}
.main-content {
  padding: 1% 0 0;
  display: flex;
  flex-direction: column;
  position: relative;
}
.time-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 100.2%;
}
.content-container {
  display: flex;
  flex-direction: column;
  overflow: visible;
}
.content-box {
  margin: 0 0 5px;
  height: 50px;
  background-color: #73c7d5;
}
.calendar-date {
  font-size: 12px;
  height: 55px;
}
.meeting-info {
  position: absolute;
  border-radius: 2px;
  opacity: 0.8;
  width:98%;
  padding: 6px;
  margin: 3px 1%;
  font-size: small;
  background-color: rgba(238, 238, 238, 1);
}
.meeting-info hr {
  border-color: #7e7e7f;
  opacity: 0.2;
  margin: 1px 0;
}
.meeting-info h4{
  font-size: medium;
  font-weight: bolder;
}
</style>