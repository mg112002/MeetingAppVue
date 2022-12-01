import Router from 'vue-router'
import CalendarPage from '@/components/pages/CalendarPage.vue'
import AddMeetingsPage from '@/components/pages/AddMeetingsPage.vue'
import FilterMeetingsPage from '@/components/pages/FilterMeetingsPage.vue'
import MeetingsPage from '@/components/pages/MeetingsPage.vue'
import TeamsPage from '@/components/pages/TeamsPage.vue'


const router = new Router({
    modes: 'history',
    routes: [
        {
            name: 'calendar',
            path: '/',
            component: CalendarPage
        },
        {
            name: 'meetings',
            path: '/meetings',
            redirect: '/addmeetings',
            props: true,
            component: MeetingsPage,
            children: [
                {
                    name: 'add-meetings',
                    path: '/addmeetings',
                    props: true,
                    component: AddMeetingsPage
                },
                {
                    name: 'filter-meetings',
                    path: '/filtermeetings',
                    props: true,
                    component: FilterMeetingsPage
                }
            ]
        },
        {
            name: 'teams-page',
            path: '/teams',
            component: TeamsPage
        }
    ]
})

export default router