<template>
<div><div class="heading-contents">
    <h2 class="main-heading">Meetings</h2>
    <hr />
</div>
<div class="content-tab">
    <router-link to="/filtermeetings">
        <div class="filter-search-tab" @click="activeFalse" :class="isActive ? '' :'active-tab'">Filter / Search meetings</div>
    </router-link>
    <router-link to="/addmeetings">
        <div class="addmeet-tab" @click="activeTrue" :class="isActive?'active-tab':''">Add a meeting</div>
    </router-link>
    <hr class="tab-hr"/>

</div>
<router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'MeetingsPage',
    data() {
        return {
            isActive:true
        }
    },
    methods: {
        activeTrue(){
            this.isActive= true
        },
        activeFalse(){
            this.isActive=false
        }
    }
}
</script>

<style scoped>
h2 {
    font-weight: bolder;
}
.filter-search-tab {
    display: inline;
    padding: 10px;
}
.addmeet-tab {
    display: inline;
    padding: 10px;
}
.active-tab {
    color: #252525;
    display: inline;
    border: 1px solid lightgray;
    border-bottom: 4px solid white;
    border-radius: 3px;
}
.tab-hr{
    margin-top: 10px;
}
a{
    text-decoration: none;
}
</style>