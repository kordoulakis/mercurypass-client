<script setup>
import CountryPass from "../components/CountryPass.vue"
import { ContentLoader } from 'vue-content-loader'

import { ref } from 'vue'
import axios from 'axios'

import { useAuth } from '../stores/authentication';
import { api_global } from '../services/api';

const authStore = useAuth();

//TODO move this to headers
const api = api_global + 'passes/user/'
const config = {
    headers: {
        token: authStore.getUser.accessToken
    }
};
const passes = ref()
const serverError = ref(false)
const noPasses = ref(false);


(async () => {
    try {
        passes.value = await (await axios.get(api, config)).data
        serverError.value = false

        //If the user has no passes show the correct div and ask for location
        if (passes.value.length === 0) {
            noPasses.value = true
        }
    } catch (error) {
        serverError.value = true
    }
})();



</script>

<template>
    <div class="mypasses">
        <div class="title">
            <h1>My Passes</h1>
        </div>
        <div v-if="passes && !noPasses" class="passes-container">
            <div v-if="passes" v-for="pass in passes" :key="pass.id">
                <CountryPass :pass="pass" />
            </div>
        </div>

        <div v-else-if="!passes && !serverError" class="loader">
            <div v-for="i in 3" :key="i">
                <ContentLoader :height="500" :width="500" :speed="2"></ContentLoader>
            </div>
        </div>

        <div v-else-if="!passes && serverError" class="serverError">
            <h1>Uh-oh, seems like our server is down right now :(</h1>
            <div class="icon">
                <i class="fa-solid fa-server "></i>
                <i class="fa-solid fa-arrow-right"></i>
                <i class="fa-solid fa-bomb"></i>
            </div>
            <p>Please try again later</p>
        </div>

        <div v-if="noPasses" class="no-passes">
            <h1>Aww</h1>
            <i class="icon fa-solid fa-face-sad-tear"></i>
            <h1>It appears you don't have any passes yet</h1>
            <h2>You can see our available countries here</h2>
            <router-link to="/countries">
                <button @click="goToCountries" class="country-btn">
                    Our countries
                </button>
            </router-link>
        </div>
    </div>
</template>
        
<style scoped lang="scss">
$text-color-light: rgb(44, 44, 44);
$brand-blue: #3c6ef7;

.country-btn {
    font-family: 'Raleway', sans-serif;
    width: 6vw;
    height: 6vh;
    min-height: 50px;
    min-width: 200px;
    background: none;
    border: 1px solid #24242446;

    font-size: medium;
    cursor: pointer;
    transition: all 100ms ease-in-out;
    border-radius: 2px;

    &:hover {
        background-color: $brand-blue;
        color: white;

    }
}

h1,
p {
    color: $text-color-light;
    font-family: 'Lato', sans-serif;
}

.no-passes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.icon {
    font-size: 20em;
}

.icon {
    font-size: 7vw;
    margin-bottom: 10px;
    padding-bottom: 10px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    color: $text-color-light;
}

.serverError {
    display: flex;
    flex-direction: column;

    text-align: center;
    height: 100%;
}

.loader {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    gap: 2vw;
}

.title {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-color-light;
    width: 20vw;
}

.mypasses {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-family: 'Lato', sans-serif;
    min-height: 100vh;
}

.passes-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}


@media (max-width: 600px) {
    .passes-container {
        flex-direction: column;
        width: 100%;
        align-content: center;
    }

    .title {
        width: 100vw;
    }

    .icon {
        font-size: 20vw;
        margin-bottom: 10px;
        padding-bottom: 10px;

        display: flex;
        justify-content: space-around;
        align-items: center;

        color: $text-color-light;
    }
}
</style>


