<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/">Meetings App</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Calendar</b-nav-item>
                <b-nav-item to="/meetings">Meetings</b-nav-item>
                <b-nav-item to="/teams">Teams</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item to="/login">Logout</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: 'MenuBar'
}
</script>

<style>

</style>