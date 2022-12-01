<template>
  <div>
    <div class="heading-contents">
        <h3>Teams</h3>
        <hr />
    </div>
    <div class="teams-content">
        <h5>View and edit teams you are part of</h5>
        <br>
        <div class="teams-card-container">
            <div class="teams-card" v-for="team in teams" :key="team._id">
                <div>
                    <h3>{{team.name}}</h3><br>
                    <p>@{{team.shortName}}</p><br>
                    <p class="teams-card-description">
                        {{team.description}}
                    </p><br>
                    <button class="excuse-btn" :value="team._id">Excuse yourself</button>
                    <hr>
                    <h4>Attendees: </h4>
                    <p class="attendees">
                        {{getMembers(team)}}
                    </p><br>
                    <input class="selected-member" list="select-member" placeholder="Select member" v-model="member">
                    <datalist name="member" id="select-member" class="select-member">
                        <!-- <option v-for="m in allMembers" :key="m._id" :value="m._id" >{{m.email}}</option> -->
                        <option v-for="email in memEmails" :key="team._id+email" :value="email"></option>
                    </datalist>
                    <button class="addbtn" @click="addMem" :value="team._id">Add</button>
                    <p class="add-member-msg"></p>
                </div>
            </div>
            <div class="teams-card add-team">
                <div>
                    <input type="text" id="teamname" maxlength="20" placeholder="Team name" form="add-team-form" required><br>
                    <input type="text" id="shortname" maxlength="20" placeholder="Team short name" form="add-team-form"
                        required><br>
                    <textarea id="teamdesc" rows="2" maxlength="200" form="add-team-form"
                        placeholder="Provide a description for the team" required></textarea><br><br>
                    <hr><br>
                    <h3>Members: </h3>
                    <p class="medium-p">{{members.join(", ")}}</p><br>
                    <input class="selected-member" list="select-member" placeholder="Select member" form="add-member" required>
                    <datalist name="member" id="select-member" class="select-member"></datalist>
                    <button type="submit" class="addbtn" id="addmembtn" form="add-member">Add</button>
                    <p class="add-member-msg"></p><br>
                    <button id="addteambtn" form="add-team-form">Add team</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import { getTeams } from '@/services/teams'
import { getAllMembers,addMember, excuseYourself } from '@/services/filterMeetings'


export default {
    name: 'TeamsPage',
    data() {
        return {
            teams: [],
            allMembers: [],
            memEmails: [],
            memIds: [],
            members:[]
        }
    },
    methods: {
        getMembers(team) {
            const members = []
            team.members.forEach(member => members.push(member.email))
            return members.join(", ")
        },
        async addMem(e) {
            const teamId = e.target.value
            console.log(teamId);
            const usrId = this.memIds[this.memEmails.indexOf(this.member)]
            const data = await addMember('teams',teamId, 'add_member', usrId)
            if (data._id === teamId) {
                this.msg = "Member added successfully"
                this.teams = await getTeams()
            } else {
                this.msg = "Something went wrong"
            }
        },
        async excuse(e) {
            const teamId = e.target.value
            const data = await excuseYourself('teams',teamId,"remove_member")
            if (data._id === teamId) {
                this.teams = await getTeams()
            } else {
                console.log("Error")
            }
        }  
    },
    async created() {
        this.teams = await getTeams()
        this.allMembers = await getAllMembers()
        this.allMembers.forEach(mem => {
            this.memEmails.push(mem.email)
            this.memIds.push(mem._id)
        })
    }
}
</script>

<style scoped>
h3,h4 {
    font-weight: bolder;
    font-size: large;
}
h5 {
    color: #7e7e7f;
    font-weight: bolder;
}
.teams-card-container {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 2.5rem;
    grid-row-gap: 20px;
}

.teams-card {
    border-radius: 6px;
    border: 1px solid #eeeeee;
    min-width: 410px;
    max-width: 410px;
    min-height: 425px;
}

.teams-card div {
    margin: 6% 5%;
}

.teams-card div p {
    font-size: 1.3rem;
    display: inline;
}

.teams-card-description {
    color: #7e7e7f;
}

.teams-card button {
    width: 150px;
    padding: 2% 1%;
    font-size: medium;
    color: white;
    background-color: crimson;
    border: none;
    border-radius: 4px;
}

.teams-card h3 {
    color: black;
    display: inline;
}

.teams-card .medium-p {
    font-size: 1.2rem;
}

.teams-card input,
.teams-card textarea {
    margin-top: 2%;
    border-radius: 3px;
    border: 1px solid lightgray;
    font-size: medium;
    padding: 2%;
    width: 45%;
}

.teams-card .addbtn {
    width: 15%;
    background-color: #18A2B8;
    margin-bottom: 0;
    margin-left: 1%;
}
</style>