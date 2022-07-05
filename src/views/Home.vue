<template>
    <div class="page">
        <h1 class="header">Mercury Pass</h1>
        <div class="image-container">
            <!-- <img src="../assets/oneeurope.jpg" alt="Image of 3 european cities' landmarks side by side"> -->
            <img src="../assets/simple.jpg" alt="">
            <div class="image-text">
                <h1>A greener, digitally enhanced Europe</h1>
            </div>
            <img src="../assets/travel_comfort.jpg" alt="">

            <div class="image-text">
                <h1>In a vast continent with tens of different cultures</h1>
                <h2>We deserve a unified, simple way to traverse it</h2>
            </div>
            <img src="../assets/boarding.jpg" alt="">
            <div class="image-text">
                <h1>One interface to access all the different transports</h1>
            </div>
            <img src="../assets/infrastructure.jpg" alt="">

        </div>

        <h2>Countries that participate</h2>
        <div class="countries">
            <div v-if="countriesToShow" v-for="i in 3" :key="i">
                <CountryItem :country="countriesToShow[i - 1]" />
            </div>
        </div>
        <router-link to="/countries">
            <button class="more-btn">
                and more..
            </button>
        </router-link>
    </div>
</template>

<script setup>

import CountryItem from '../components/CountryItem.vue'
import { ref } from 'vue'
import axios from 'axios'
import { api_global } from '../services/api';


const countriesToShow = ref();
const api = api_global + 'countries';


(async () => {
    const res = await axios.get(api)
    countriesToShow.value = res.data.sort(() => (Math.random() > 0.5) ? 1 : -1)
})()

</script>

<style scoped lang="scss">
$brand-blue: #3c6ef7;

.header {
    font-size: 4em;
    font-family: 'Roboto', sans-serif;
    padding: 5px;
    width: 20vw;
    text-align: center;
}

.image-text {
    text-align: center;
    background-color: #3c6ef723;
    border-radius: 10px;
    padding: 10px;
    margin: 40px;
}

h2 {
    color: black;
    font-size: xx-large;
    font-family: 'Lato', sans-serif;
}

img {
    width: 50%;
}

.countries {
    margin: 1vh 8vw 1vh 8vw;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 100%;
    align-content: center;
    align-items: center;
    justify-content: center;

    text-align: left;
    gap: 1vw;
}


.image-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 0 0 1% 1%;
    width: 100vw;
    height: auto;
    overflow: hidden;
    font-family: 'Raleway', sans-serif;
}

.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    min-height: 100vh;
}

.more-btn {
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

@media screen and (max-width: 400px) {
    .more-btn {
        height: 10vh;
        width: 100vw;
    }

    .countries {
        width: 400px;
    }

    .header {
        font-size: 2em;
        width: 100%;
    }

    img {
        width: 100%;
    }
}
</style>

