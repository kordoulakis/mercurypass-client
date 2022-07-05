<script setup>
import { api_global } from '../../services/api';
import { ref } from 'vue'
import axios from 'axios';
import { useAuth } from '../../stores/authentication';

const api = api_global + 'admin/stats'

const authStore = useAuth()
const payload = {
    headers: {
        token: authStore.getUser.accessToken
    }
};

const data = ref();
(async () => {
    const res = await axios.get(api, payload)
    data.value = res.data
})();

</script>


<template>
    <div v-if="data" class="overview-container">
        <div class="stats">
            <h1>Statistics</h1>
            <div class="stat-item">
                <h2>Users</h2>
                <div class="details">
                    <h3 class="count">
                        Count: {{ data.users.count }}
                    </h3>
                    <p v-for="user in data.users.users" :key="user">
                        <i class="fa-solid fa-person"></i> uid: {{ user }} <br>
                    </p>
                </div>
            </div>
            <div class="stat-item">
                <h2>Countries</h2>
                <div class="details">
                    <h3 class="count">
                        Count: {{ data.countries.count }}
                    </h3>
                    <p v-for="country in data.countries.countries" :key="country">
                        <i class="fa-solid fa-flag"></i> Country: {{ country }} <br>
                    </p>
                </div>
            </div>
            <div class="passes-trips">
                <div class="stat-item">
                    <h2>Passes</h2>
                    <div class="details">
                        <h3 class="count">
                            Count: {{ data.passes }}
                        </h3>
                    </div>
                </div>
                <div class="stat-item">
                    <h2>Trips</h2>
                    <div class="details">
                        <h3 class="count">
                            Count: {{ data.trips }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="messages">
            <h2>Messages</h2>
            <h3 class="count">
                Count: {{ data.messages.count }}
            </h3>
            <div v-for="message in data.messages.messages" :key="message" class="messageItem">
                <h4>Date: {{ message.createdAt }} <br>
                    From: {{ message.sender }}</h4>
                <p>{{ message.message }}</p>
            </div>
        </div>
    </div>
    <div class="loader" v-else>
        <h1>Loading..</h1>
    </div>
</template>

<style scoped lang="scss">
.passes-trips {
    display: flex;
}

.messageItem {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.11);
    width: 80%;
    justify-content: center;
    align-items: center;
}

.loader {
    display: flex;
    justify-content: center;
    width: 100%;

}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.11);
    min-width: 10vw;
    width: 20vw;
    padding: 40px;
    margin: 10px;
    border-radius: 5px;
}

.messages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 2vh;
    gap: 2vh;
    height: 90vh;
    box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.11);
    overflow-y: scroll;
}

.stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.11);
    margin-top: 2vh;
    margin-right: 10px;
    height: 90vh;

}

.overview-container {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
    margin-top: 40px;
    font-family: 'Raleway', sans-serif;
}
</style>