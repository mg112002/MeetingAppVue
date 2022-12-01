<template>
  <div>
  <div class="filter-search-tab-content">
    <h3 class="filter-search-heading">Search for meetings</h3>
    <hr>
      <label for="select-date">Date</label> 
      <select name="selected-date" id="select-date" v-model="period">
        <option value="all">ALL</option>
        <option value="past">PAST</option>
        <option value="present">TODAY</option>
        <option value="future">UPCOMING</option>
      </select>
      <br>
      <label for="search-for">Search for</label>
      <textarea name="search-for" id="search-for" rows="2" maxlength="300"
        placeholder="Search using words which describe the meeting" v-model="search"></textarea><br>
      <button @click="searchMeetings">Search</button>
  </div>
  <div class="filter-search-container">
    <h4>Meetings matching search criteria</h4>
    <hr /><br>
    <div class="filter-search-content" v-if="filteredMeetings">
      <div class="search-result-card" v-for="meeting in filteredMeetings" :key="meeting._id">
        <h4>{{getDateString(meeting.date.slice(0,10))}}</h4><p> {{getTime(meeting.startTime,meeting.endTime)}}</p><br>
        <p>
          {{meeting.name}}
        </p><br>
        <button class="excusebtn" @click="excuse" :value="meeting._id">
          Excuse yourself
        </button>
        <hr>
        <h4>Attendees: </h4>
        <p class="attendees">
        {{getAttendees(meeting)}}
        </p><br>
          <input class="selected-member" list="select-member" placeholder="Select member" v-model="member">
          <datalist name="member" id="select-member" class="select-member">
            <!-- <option v-for="m in allMembers" :key="m._id" :value="m._id" >{{m.email}}</option> -->
            <option v-for="email in memEmails" :key="meeting._id+email" :value="email" ></option>
          </datalist>
          <button class="addbtn" @click="addMem" :value="meeting._id">Add</button>
          <p class="add-member-msg"></p>
      </div>
    </div>
    <div v-if="filteredMeetings===[]"><h3>No meetings found matching search criteria</h3></div>
    <b-toast id="action_msg" title="AddMember" static>
      {{msg}}
    </b-toast>
    </div>
    </div>
</template>

<script>

import { getAllMembers, filterMeetings, addMember, excuseYourself } from '@/services/filterMeetings'

export default {
  name: 'FilterMeetingsPage',
  data() {
    return {
      period: 'all',
      search:'',
      filteredMeetings: [],
      msg: '',
      member: '',
      allMembers:[],
      memEmails: [],
      memIds:[]
    }
  },
  methods: {
    getDateString(date) {
      let d = new Date(date)
      const month = d.toLocaleString("en-US", { month: "long" })
      const year = d.getFullYear()
      return `${d.getDate()} ${month} ${year}`
    },
    async searchMeetings() {
      this.filteredMeetings = await filterMeetings(this.period, this.search)
      this.allMembers = await getAllMembers()
      this.allMembers.forEach(mem => {
        this.memEmails.push(mem.email)
        this.memIds.push(mem._id)
      })
    },
    getTime(start, end) {
      let startHr = start.hours, startMin = start.minutes, endHr = end.hours, endMin = end.minutes
      if (start.hours < 10) {
        startHr = `0${start.hours}`
      }
      if (start.minutes < 10) {
        startMin = `0${start.minutes}`
      }
      if (end.hours < 10) {
        endHr = `0${end.hours}`
      }
      if (end.minutes < 10) {
        endMin = `0${end.minutes}`
      }
      return `${startHr}:${startMin} - ${endHr}:${endMin}`
    },
    getAttendees(meeting) {
      const members=[]
      meeting.attendees.forEach(attendee => members.push(attendee.email))
      return members.join(", ")
    },
    async addMem(e) {
      const meetId = e.target.value
      const usrId = this.memIds[this.memEmails.indexOf(this.member)]
      // const params = {
      //   action: "add_attendee",
      //   userId: usrId
      // }
      const data = await addMember('meetings',meetId, 'add_attendee',usrId)
      if (data._id === meetId) {
        this.msg = "Member added successfully"
        await this.searchMeetings()
      } else {
        this.msg = "Something went wrong"
      }
    },
    async excuse(e) {
      const meetId = e.target.value
      const data = await excuseYourself('meetings',meetId,"remove_attendee")
      if (data._id === meetId) {
        await this.searchMeetings()
      } else {
        console.log("Error")
      }
    }
  },
}
</script>

<style scoped>
h3,h4 {
  font-weight: bolder;
}
.filter-search-tab-content {
  border-radius: 3px;
  margin: 10px 0;
  padding: 2%;
  background-color: #73C7D5;
}
.filter-search-heading {
  color: white;
}
button {
  background-color: #18A2B8;
  color: white;
  border-radius: 4px;
  border: none;
  padding: 6px 5px;
  width: 65px;
}
.filter-search-container {
  margin: 1% 0;
}
#search-for {
  color: #7e7e7f;
  margin: 0 0 1%;
  width: 100%;
  border: none;
  border-radius: 3px;
  padding: 1%;
  font-size: medium;
}
#select-date {
  margin: 0 0 2%;
  width: 100%;
  padding: 6px;
  border: none;
  border-radius: 3px;
  font-size: medium;
}
label {
  color: black;
}
.search-result-card {
  width: 98%;
  border: 1px solid #eeeeee;
  border-radius: 2px;
  padding: 1%;
  margin-bottom: 1%;
}

.search-result-card h3,
.search-result-card h4 {
  display: inline;
  font-size: large;
  margin: 1% 0
}

.search-result-card p {
  display: inline;
  margin: 2% 0
}

.search-result-card button {
  color: white;
  background-color: crimson;
  border: none;
  padding: 5px;
  width: 110px;
  border-radius: 3px;
  font-size:smaller
}

.search-result-card input {
  font-size: small;
  width: 130px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid lightgray;
}

.search-result-card .addbtn {
  width: 40px;
  background-color: #18A2B8;
  margin: 1% 5px 0;
}
</style>