<template>
    <div class="adminBar" :style="{ width: navWidth, 'min-width': navWidth }">
        <div class="header">
            <img :class="collapsed ? 'smallImg' : 'bigImg'" src="../../assets/logo.svg" alt="mercury logo">
            <h3 v-if="!collapsed">Admin Console</h3>
        </div>

        <AdminLink :style="isSelected('overview')" @clicked="navigate('overview')" :icon="'house'" :name="'Overview'" />
        <AdminLink :style="isSelected('scan')" @clicked="navigate('scan')" :icon="'barcode'" :name="'Scan'" />
        <AdminLink :style="isSelected('users')" @clicked="navigate('users')" :icon="'users'" :name="'Users'" />
        <AdminLink :style="isSelected('countries')" @clicked="navigate('countries')" :icon="'earth-europe'"
            :name="'Countries'" />
        <span :class="{ 'rotate-180': collapsed }" class="collapse-icon" @click="toggleSidebar">
            <i class="fas fa-angle-double-left fa-2xl" />
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import AdminLink from '../../components/Admin/AdminLink.vue';

const collapsed = ref(false);
const navWidth = ref('250px');

const router = useRouter()
const route = useRoute()

const startRoute = route.fullPath.split('/')
const currentRoute = ref(startRoute[startRoute.length - 1]);

function isSelected(r) {
    if (r === currentRoute.value) {
        return {
            'background-color': '#192a5a',
            'color': 'white'
        }
    }
}

function toggleSidebar() {
    collapsed.value = !collapsed.value;
    if (collapsed.value) {
        navWidth.value = '40px'
    }
    else {
        navWidth.value = '250px'
    }
}

function navigate(to) {
    currentRoute.value = to
    router.push('/admin/' + to)
}
</script>

<style scoped lang="scss">
$sidebar-bg-color: rgb(255, 255, 255);
$brand-blue :#3c6ef7;

.smallImg {
    width: 40px;
}

.bigImg {
    width: 100px;
}

.header {
    display: flex;
    align-items: center;
    color: black;
}

.adminBar {
    display: flex;
    flex-direction: column;
    background: $sidebar-bg-color;
    border-right: 1px solid rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: sticky;
    top: 0;
    transition: all 500ms ease;
    overflow: hidden;
}

.collapse-icon {
    position: absolute;
    bottom: 10px;
    transform: translateX(-120%);
    font-size: 15px;
    color: black;
    left: 250px;
    transition: 500ms ease;
}

.rotate-180 {
    transform: rotate(180deg);
    left: 10px;
    transition: 500ms ease;
}
</style>