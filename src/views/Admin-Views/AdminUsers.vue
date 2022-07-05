<script setup>
import { api_global } from '../../services/api';
import { ref } from 'vue'
import axios from 'axios';
import { useAuth } from '../../stores/authentication';

const usersApi = api_global + 'admin/users'


const authStore = useAuth()
const payload = {
    headers: {
        token: authStore.getUser.accessToken
    }
};

const data = ref();
fetchUsers()

async function deleteUser(uid) {
    const deleteApi = api_global + 'admin/users/' + uid;
    try {
        await axios.delete(deleteApi, payload)
        await fetchUsers()
    } catch (error) {
        alert(error)
    }
}

async function fetchUsers() {
    const res = await axios.get(usersApi, payload)
    data.value = res.data
}

</script>


<template>
    <div v-if="data" class="usersContainer">
        <h2>Users</h2>
        <div class="users">
            <div v-for="user in data" :key="user.uid" class="user">
                <div class="img-name">
                    <img :src="user.photoURL" alt="">
                    <h3>{{ user.displayName }}</h3>
                </div>
                <div class="user-details">
                    <h3>email: {{ user.email }}</h3>
                    <h4>uid: {{ user.uid }} </h4>
                    <h4>joined: {{ user.metadata.creationTime }}</h4>
                    <h4>last seen: {{ user.metadata.lastSignInTime }}</h4>
                </div>
                <button @click="deleteUser(user.uid)" class="delete-btn">
                    DELETE USER
                </button>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
$cancel: #F93154;

.delete-btn {
    min-height: 50px;
    font-size: 1.3em;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.164);
    background-color: $cancel;
    border-radius: 5px;
    color: white;
}

.img-name {
    display: flex;
    align-items: center;
    gap: 10px;
}

img {
    width: 50px;
    border-radius: 50%;
}

h3,
h4 {
    padding: 0;
    margin: 10px;
}

.user-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.user {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.11);
    height: fit-content;
    padding: 20px;
    min-height: 400px;
    justify-content: space-between;
}

.users {
    display: flex;
    width: 80%;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
}

.usersContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    margin-top: 40px;
    font-family: 'Raleway', sans-serif;
}
</style>