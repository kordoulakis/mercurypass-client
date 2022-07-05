<template>
    <div class="container">
        <div v-if="pass" class="pass-container">
            <div class="trips-container">
                <div class="header">
                    <h3 class="floaty">Past trips</h3>
                </div>

                <ul v-if="pass.trips.length > 0" class="trips-list">
                    <UserTrip v-for="trip in pass.trips" :key="trip.id" :trip="trip" />
                </ul>
                <div v-else class="no-trips-yet">
                    <div class="icondiv">
                        <i class="fa-solid fa-heart-crack fa-2xl"></i>
                    </div>
                    <h2>Oh, it seems like you haven't used this pass yet</h2>
                    <h4>Luckily, you can create some dummy trips by clicking the button</h4>
                    <button class="seed-btn" @click="seedTrips()">
                        Create trips
                    </button>
                </div>
            </div>
            <div class="qr-container">
                <div class="header">
                    <h3 class="floaty">{{ pass.country.name }}</h3>
                </div>
                <div class="qr-text">
                    <p>Type: {{ getTypeName() }}</p>
                    <p>Created at: {{ formatDate(pass.createdAt) }}</p>
                    <p>Expires at: {{ formatDate(pass.expirationDate) }}</p>
                    <p v-if="activeStatus">Status: Active 😊</p>
                    <p v-else>Status: Inactive 🔴</p>
                </div>
                <!-- QR CODE IMAGE -->
                <a :href="qrCodeImg" target="_blank">
                    <img class="qrCodeImg" v-show="qrLoaded" :src="qrCodeImg" @load="qrLoaded = true"
                        alt="qr code for image">
                </a>
                <ContentLoader v-if="!qrLoaded" :width="300" :height="300" />
                <div class="ticketId">
                    <p>
                        pass_id: {{ passId }}
                    </p>
                    <button class="clipboard-btn" @click="copyToClipboard()" @mouseover="tooltip = true"
                        @mouseleave="onMouseLeave()">
                        <i class=" fa-solid fa-copy icon fa-lg"></i>
                        <p class="tooltip " :class="{ 'success': copied }" v-if="tooltip">{{ tooltipText }}</p>
                    </button>
                </div>

            </div>
        </div>
        <button v-if="!deactivating && pass" class="deactivate-pass" @click="deactivating = true">
            Delete Pass
        </button>
        <div v-else-if="deactivating && pass" class="confirmation">
            <h2>Are you sure you want to <i>delete</i> your pass?</h2>
            <div class="deactivation-btns">
                <button class="deactivate-pass" @click="deactivating = false">
                    Cancel
                </button>
                <button class="deactivate-pass" @click="deactivatePass()">
                    Delete Pass
                </button>
            </div>
        </div>

        <div v-else class="loading">
            <h2>Loading..</h2>
            <div class="loaders">
                <ContentLoader :height="1000" :width="700" :speed="2"></ContentLoader>
                <ContentLoader :height="1000" :width="700" :speed="2"></ContentLoader>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * @author Ilias Kordoulas <eliaskordoulas@gmail.com>
 */
import UserTrip from '../components/UserTrip.vue'

import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { ContentLoader } from 'vue-content-loader'

import axios from 'axios'
import { useAuth } from '../stores/authentication';
import { api_global } from '../services/api';

const authStore = useAuth()
const router = useRouter()

const deactivating = ref(false)

//Get the passId from the route. No props are passed as this should be accessible from a standalone URL
const passId = useRoute().path.split('/')[3]

const api = api_global + "passes/";
const config = {
    headers: {
        token: authStore.getUser.accessToken
    }
};

const pass = ref(null);
const activeStatus = ref(false)

async function deactivatePass() {
    const dapi = api + passId;
    await axios.delete(dapi, config)
    router.push('/me/passes')
}

//Tooltip related markers
const tooltip = ref(false)
const copied = ref(false)
const tooltipText = ref('Copy to clipboard')
const qrLoaded = ref(false)

async function onMouseLeave() {
    setTimeout(() => {
        copied.value = false;
        tooltip.value = false;
        tooltipText.value = 'Copy to clipboard';
    }, 100)
}

function copyToClipboard() {
    copied.value = true;
    tooltipText.value = 'Copied'
    navigator.clipboard.writeText(passId);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric", year: "numeric", });
}

async function fetchPass() {
    try {
        const fapi = api + passId;
        const req = await axios.get(fapi, config);
        pass.value = await req.data.passDetails;
        activeStatus.value = await req.data.activeStatus;

        //sort trips by date descending
        pass.value.trips = pass.value.trips.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    } catch (error) {
        console.log(error)

    }
}

async function seedTrips() {
    try {
        const sapi = api + 'seed/' + passId
        await axios.post(sapi, {}, config)
        fetchPass()

    } catch (error) {
        console.log(error)
    }
}


function getTypeName() {
    const types = ['Pay Per Trip', 'Weekly', 'Semester']
    return types[pass.value.type - 1]
}

onMounted(async () => {
    fetchPass()
});


const qrCDN = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data='
const qrCodeImg = qrCDN + passId

</script>
<style scoped lang="scss">
$brand-blue :#3c6ef7;
$success: #00B74A;
$cancel: #F93154;
$brand-dark: #2b2b2b;

.loaders {
    display: flex;
    height: auto;
    width: 80%;
    align-items: center;
    justify-content: space-around;
}

.loading {
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
}

.header {
    background-color: $brand-dark;
    width: 100%;
    display: flex;
    justify-content: center;
}

.seed-btn {
    margin: 20px;
    padding: 20px;

    width: 20ch;
    border: 1px solid $brand-blue;

    border-radius: 10px;
    font-size: large;
    font-weight: bold;
    color: black;

    transition: all 200ms ease;

    cursor: pointer;

    &:hover {
        color: white;
        background-color: $brand-blue;
    }
}

.no-trips-yet {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    background-color: white;
    font-family: 'Raleway', sans-serif;
    color: black;
    padding-top: 20px;
    justify-content: center;
    align-items: center;
}

.icondiv {
    font-size: 50px;
    margin-bottom: 10px;
    padding-bottom: 10px;
}

.deactivation-btns {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0;
    margin: 0;
}

.deactivate-pass {
    margin: 20px;
    padding: 20px;

    width: 7vw;
    min-width: 200px;
    border: 1px solid $cancel;

    border-radius: 10px;
    font-size: medium;
    color: black;

    transition: all 200ms ease;

    cursor: pointer;

    &:hover {
        color: white;
        background: $cancel;
    }
}

.success {
    background-color: $success !important;
}

.tooltip {
    position: absolute;
    top: -5em;
    right: .2em;
    padding: 10px;
    background-color: $brand-blue;
    font-family: 'Raleway', sans-serif;
    color: white;
    border-radius: 10px;
    transition: all 200ms ease;
}



.ticketId {
    width: 90%;
    display: flex;
    gap: 10px;
    color: gray;
    align-items: center;
    word-wrap: break-word;
    justify-content: center;

}

button {
    position: relative;
    background: none;
    border: none;
    color: gray;
    padding: 0;
}

.icon {
    cursor: pointer;
}

h4 {
    color: #414141;
}

.floaty {
    margin-bottom: 0px;
    z-index: 1000;
    font-size: 1.5em;
    padding: 0;
    margin: 10px 0 10px 0;
}

.pass-container {
    display: flex;

    justify-content: center;
    align-items: flex-start;
    min-height: 70vh;
    gap: 20px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    min-height: 100vh;
}

.row {
    display: flex;
    flex-direction: row;
    margin: 0;
    justify-content: space-evenly;
    align-items: center;
    padding-left: 10vw;
    padding-right: 10vw;
}

.trips-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    perspective: 1px;
    height: 85vh;
    width: 50vw;

    background-color: white;
    color: white
}

.trips-list {
    display: flex;
    flex-direction: column;

    overflow-y: scroll;
    scrollbar-width: 0px;
    align-items: center;
    justify-content: flex-start;

    margin: 0;
    text-align: center;
    list-style-type: none;
    padding: 0;

    width: 100%;
    box-shadow: inset 0 12px 9px -7px rgba(44, 44, 44, 0.226);
}

.trips-list::-webkit-scrollbar {
    display: none;
}

.qr-container {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    perspective: 1px;

    height: 85vh;
    width: 20vw;
    font-family: 'Lato', sans-serif;
}

.qr-container img {
    object-fit: contain;
    aspect-ratio: 1/1;
    width: 100%;
    max-width: 350px;
    transition: all 200ms ease-in-out;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

    &:hover {
        transform: scale(1.005);
        box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);

    }

    padding: 10px;
    border: 2px solid $brand-dark;
    border-radius: 5px;
}

h1 {
    text-align: center;
    font-family: 'Lato', sans-serif;
    margin-top: 0;
    background-color: #00B74A;
}

h2 {
    font-family: 'Raleway', sans-serif;
}

h3 {
    font-size: 2.5vh;
    color: white;
    font-family: 'Lato', sans-serif;
}

h4 {
    text-align: center;
    font-family: 'Lato', sans-serif;
}

.qr-text p {
    font-size: 1.8vh;
    text-align: center;
    word-wrap: break-word;
    gap: 10px;
}

.qr-text {
    background-color: $brand-dark;
    color: white;
    width: 85%;
    border-radius: 10px;
    padding: 5px;
    pointer-events: none;
    justify-self: start;
}

.qr-code {
    margin-top: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
}



@media (max-width: 600px) {
    a>.qrCodeImg {
        width: 80%;
    }

    .seed-btn {
        width: 100%;
        color: white;
        background-color: $brand-blue;
        border-radius: 0;
    }

    .container {
        padding: 0;
        margin: 0;
        justify-content: center;
    }

    .pass-container {
        padding: 0;
        margin: 0;
        width: 100vw;
        justify-content: space-evenly;
        gap: 5px;
        margin-bottom: 20px;
        padding-bottom: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

    }

    .trips-container {
        width: 50%;
        padding: 0;
        margin: 0;
        border-radius: 0;
        box-shadow: none;
    }

    .qr-container {
        width: 50%;
        margin: 0;
        border-radius: 0;
        box-shadow: none;
    }

    .deactivate-pass {
        width: 50vw;
        color: white;
        background-color: $cancel;
        border-radius: 0;
        margin: 0 10px 0 10px;
    }

    .deactivation-btns {
        align-items: center;
        margin: 0 10vw 0 10vw;
    }

    .confirmation {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        padding: 0 20px 0 20px;
        word-wrap: break-word;
    }

    .ticketId {
        font-size: 3vw;
    }

    .clipboard-btn {
        padding-right: 10px;
    }

}
</style>