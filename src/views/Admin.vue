<template>
    <div class="container">
        <AdminNavigation />
        <router-view></router-view>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '../stores/authentication';
import AdminNavigation from './Admin-Views/AdminNavigation.vue'

const auth = useAuth()
const router = useRouter()

if (auth.getUser.email !== 'admin@mercurypasseu.com')
    router.push('/login')

</script>

<style scoped lang="scss">
.container {
    display: flex;
    min-height: 100vh;
    width: 100%;
    gap: 0;
    margin: 0;
    padding: 0;
}
</style>