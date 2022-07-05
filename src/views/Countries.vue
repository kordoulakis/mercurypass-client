<template>
    <div class="countries-container">
        <div class="banner">
            <img src="../assets/welcome.jpg" alt="">
        </div>
        <div class="our-countries">
            <h1>Our Countries</h1>
        </div>

        <div class="countries">
            <div class="loader" v-if="!countriesToShow">
                <instagram-loader :width="600" :height="300" :speed="2"></instagram-loader>
                <instagram-loader :width="600" :height="300" :speed="2"></instagram-loader>
                <instagram-loader :width="600" :height="300" :speed="2"></instagram-loader>
                <instagram-loader :width="600" :height="300" :speed="2"></instagram-loader>
            </div>
            <div v-else class="country" v-for="country in countriesToShow" :key="country.id">
                <CountryItem :country="country" />
            </div>
        </div>
    </div>

</template>

<script setup>

import { ref } from '@vue/runtime-core';
import CountryItem from '../components/CountryItem.vue';

import { InstagramLoader } from 'vue-content-loader';

import axios from 'axios'
import { api_global } from '../services/api';


const countriesToShow = ref();

const calculated = 400;

const api = api_global + 'countries';

(async () => {
    const res = await axios.get(api)
    countriesToShow.value = res.data
})();

</script>

<style scoped lang="scss">
$brand-blue: #3c6ef7;

.loader {
    display: flex;
    max-width: 100vw;
    flex: 1;
    justify-content: space-around;
    gap: 1vw;
    align-items: center;
    overflow: hidden;
}

.country {
    margin-bottom: 2vh;
}

.countries {
    margin: 5vh 7.5vw 1vh 7.5vw;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-content: left;
    align-items: center;
    justify-content: center;

    text-align: left;
    gap: 1vw;
}

.our-countries {
    text-align: center;
    background-color: $brand-blue;
    color: white;
    font-family: 'Raleway', sans-serif;
}


.banner {
    font-family: 'Raleway', sans-serif;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-height: 60vh;
    background-color: lightblue;
    overflow: hidden;
}

img {
    width: 100%;
}

.countries-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    min-height: 100vh;
}

@media (max-width: 500px) {
    .countries {
        flex-direction: column;
        width: 100vw;

        margin: 0;
    }

    .loader {
        flex-direction: column;
        width: 80%;
    }
}
</style>
