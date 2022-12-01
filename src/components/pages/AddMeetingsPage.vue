<template>
  <div class="addmeet-tab-content">
    <h3 class="addmeet-heading">Add a new meeting</h3>
    <hr>
      <label for="meet-name">Meeting Name</label>
      <input type="text" name="meet-name" id="meet-name" placeholder="Name of meeting" maxlength="30" v-model.trim="name" required>
      <label for="date">Date</label>
      <input type="date" name="date" id="date" v-model="date" required>
      <label for="startime">Start time (hh:mm)</label>
      <input type="time" name="start-time" id="startime" v-model="startTime" required>
      <label for="endtime">End time (hh:mm)</label><br>
      <input type="time" name="end-time" id="endtime" v-model="endTime" required>
      <label for="description">Description</label>
      <textarea name="description" id="description" rows="2" placeholder="What is agenda of the meeting?" maxlength="300"
        v-model.trim="description" required></textarea>
      <label for="emailid">EmailIDs of attendees, or team's short</label>
      <input type="text" name="emailid" id="email-team" placeholder="john@example.com, @annual-day, mark@example.com"
        v-model.trim="emails" required>
      <p>Seperate emailids / team short names by commas - team short names always begin with @</p>
      <p id="msg" :style="statusMsg ? { 'color': 'green' } : { 'color': 'red' }">{{message}}</p>
      <button @click="sendData">Add meeting</button>
  </div>
</template>

<script>

import addMeeting from '@/services/addMeeting'

export default {
  name: 'AddMeetingsPage',
  data() {
    return {
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      emails: '',
      statusMsg:false,
      message: ''
      }
  },
  methods: {
    getTime(time) {
      const hour = parseInt(time.slice(0, 2))
      const min = parseInt(time.slice(3, 5))
      return {
        "hours": hour,
        "minutes": min
      }
    },
    getAttendees(emails) {
      const attendees = []
      emails = emails.split(',')
      emails.forEach(email => {
        attendees.push(email.trim())
      })
      return attendees
    },
    async sendData(){
      if (!this.errors) {
        const data = {
          "name": this.name,
          "description": this.description,
          "date":this.date,
          "startTime": this.getTime(this.startTime),
          "endTime": this.getTime(this.endTime),
          "attendees": this.getAttendees(this.emails)
        }
        const res = await addMeeting(data)
        if (res.name === this.name) {
          this.statusMsg = true
          this.message = "Meeting added successfully"
        } else {
          this.statusMsg = false
          this.message = "Something went wrong"
        }
      }
    }
    
    }
}
</script>

<style scoped>
h3 {
  font-weight: bolder;
}
.addmeet-tab-content #date,
#meet-name,
#startime,
#endtime,
#description,
#email-team,
#search-for {
  color: #7e7e7f;
  margin: 0 0 2%;
  width: 98%;
  border: none;
  border-radius: 3px;
  padding: 1%;
  font-size: medium;
}
#email-team{
  margin:0
}
.addmeet-tab-content {
  border-radius: 3px;
  margin: 10px 0;
  padding: 2%;
  background-color: #73C7D5;
}
.addmeet-heading {
  color: white;
}
button {
  background-color: #18A2B8;
  color: white;
  font-size: smaller;
  border-radius: 4px;
  width: 9%;
  padding: 5px;
  border: none;
}
p{
  color:white;
  font-size: smaller;
  margin: 1% 0 0
}
label{
  color: black;
}
#msg{
  font-size: large;
  margin: 5px 0;
}
</style>