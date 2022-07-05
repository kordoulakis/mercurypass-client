<script setup>
import perTripDesc from '../json mockdbs/perTripDescription.json'
import weeklyDesc from '../json mockdbs/weeklyDescription.json'
import semesterDesc from '../json mockdbs/semesterDescription.json'

import CountryModalOption from '../components/CountryModalOption.vue';
import axios from 'axios'
import { watch, ref, toRefs } from 'vue';
import { useAuth } from '../stores/authentication';
import { useRouter } from 'vue-router';

import { api_global } from '../services/api';
const props = defineProps({
    showCountryModal: Boolean,
    countryDetails: Object
})

const { showCountryModal, countryDetails } = toRefs(props);

const authStore = useAuth();
const router = useRouter();

const owned = ref(false);
const partiallyOwned = ref(false);

const userPasses = ref(null)

const tierChoice = ref(null)

watch(showCountryModal, async () => {
    if (showCountryModal.value && authStore.getUser) {
        await fetchPasses()
        await updateTier()
        await checkIfPassAlreadyOwned()
    }
})


function goToOwnedPass() {
    const passId = userPasses.value.filter(pass => pass.country.id === countryDetails.value.id)[0].passId
    router.push('/me/passes/' + passId)
}

//Don't query the api if nothing changed
//Relies on the assumption that a user would not activate or update a pass on another machine at the same time
//Server handles the error in that case
async function fetchPasses() {
    const config = {
        headers: {
            token: authStore.getUser.accessToken
        }
    }
    const api = api_global + "passes/user/"
    const res = await axios.get(api, config)
    userPasses.value = await res.data;
}

async function checkIfPassAlreadyOwned() {
    partiallyOwned.value = userPasses.value
        .some(pass => pass.country.id === countryDetails.value.id);


    owned.value = userPasses.value
        .some(pass => pass.country.id === countryDetails.value.id && pass.type === tierChoice.value);
}

async function updateTier() {
    tierChoice.value = userPasses.value
        .filter(pass => pass.country.id === countryDetails.value.id)
        .map(pass => { return pass.type })[0];
}


async function updatePass() {
    const passId = userPasses.value.filter(pass => pass.country.id === countryDetails.value.id)[0].passId

    if (!tierChoice.value || !passId)
        return;

    const api = api_global + "passes/update/" + passId
    const payload = {
        headers: {
            token: authStore.getUser.accessToken,
            type: tierChoice.value
        }
    };
    axios.put(api, {}, payload)
        .then(() => {
            router.push('/me/passes')
        })
        .catch((err) => {
            alert("Something happened while trying to update pass: " + err)
        })

}

async function buyPass() {
    if (!authStore.getUser)
        router.push('/login')

    const api = api_global + "passes/new";
    const payload = {
        headers: {
            token: authStore.getUser.accessToken,
            countryid: countryDetails.value.id,
            typeid: tierChoice.value
        }
    };

    if (tierChoice.value === undefined) {
        return
    }

    axios.post(api, {}, payload)
        .then(async () => {
            await fetchPasses()
            await updateTier()
            await checkIfPassAlreadyOwned()
        }).catch((err) => {
        });
}

async function selectTier(tier) {
    if (tier !== tierChoice.value) {
        tierChoice.value = tier;
        await checkIfPassAlreadyOwned();
    }
    else {
        tierChoice.value = undefined;
    }
}

function getBorderIfSelected(tier) {
    if (tier === tierChoice.value)
        return {
            border: '4px solid rgb(164, 216, 216)',
            transform: 'scale(1.03)',
            'box-shadow': '0px 4px 10px 2px rgb(164, 216, 216)',
            transition: 'all 200ms ease'
        }
}

</script>

<template>
    <Transition name="modal">
        <div v-if="showCountryModal" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="button-wrapper">
                        <button class="close-button" @click="$emit('close')">
                            <img src="../assets/icons/x-mark-thin.svg" alt="">
                        </button>
                        <!-- Body -->
                        <div class="main-container">
                            <h1>{{ countryDetails.name }}</h1>
                            <h2>Cities: {{ countryDetails.cities }} </h2>
                            <div class="options-container">
                                <CountryModalOption @click="selectTier(1)" :style="getBorderIfSelected(1)"
                                    :country="countryDetails" :type="'repeat'" :description="perTripDesc[0]" />
                                <CountryModalOption @click="selectTier(2)" :style="getBorderIfSelected(2)"
                                    :country="countryDetails" :type="'weekly'" :description="weeklyDesc[0]" />
                                <CountryModalOption @click="selectTier(3)" :style="getBorderIfSelected(3)"
                                    :country="countryDetails" :type="'semester'" :description="semesterDesc[0]" />
                            </div>

                            <div class="button-container">
                                <button @click="$emit('close')" class="cancel-button">Cancel</button>
                                <div v-if="authStore.getUser">
                                    <button v-if="owned && partiallyOwned" class="owned-button"
                                        @click="goToOwnedPass()">
                                        Go to Pass
                                        <i class="fa-solid fa-arrow-right fa-lg"></i></button>
                                    <button v-else-if="partiallyOwned" @click="updatePass()" class="owned-button">
                                        Update Pass
                                    </button>
                                    <button v-else :class="[tierChoice === undefined ? 'disabled' : 'buy-button']"
                                        @click="buyPass">
                                        {{ tierChoice == undefined ? "Please select a tier" : "Buy Pass" }}</button>
                                </div>
                                <div v-else>
                                    <button class="buy-button">
                                        Please Log in
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
$brand-blue :#3c6ef7;
$success: #00B74A;
$cancel: #F93154;
$hover-gray: rgb(245, 245, 245);

$shadow: rgba(0, 0, 0, 0.22);

.disabled {
    @extend .custom-button;
    background-color: $cancel !important;
    color: white !important;
    font-size: larger;
    cursor: not-allowed !important;
}

.owned-button {
    @extend .custom-button;
    color: black;
    display: flex;
    justify-content: center;
    gap: 10%;
    font-size: larger !important;
    align-items: center;

    &:hover {
        background-color: $success;
        color: white;
    }
}

h1 {
    margin: 0 0 1vh 0;
}

h2 {

    margin: 0 0 1vh 0;
    color: gray;
}

p {
    font-family: 'Lato', sans-serif;
    text-align: center;
    padding: 10px;
    word-wrap: break-word;
}

.option-text {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.icondiv {
    font-size: 50px;
    box-shadow: 0px 1px 5px -2px $shadow;
    margin-bottom: 10px;
    padding-bottom: 10px;
}

.custom-button {
    min-width: 9vw;
    min-height: 70px;
    height: 7vh;
    margin: 10px;
    border-radius: 2px;
    background: none;
    border: 1px solid rgba(128, 128, 128, 0.363);
    font-family: 'Raleway', sans-serif;
    font-size: medium;

    transition: all 100ms ease-in-out;
    cursor: pointer;

    &:hover {
        color: white;
    }
}

.buy-button {
    @extend .custom-button;
    color: black;

    &:hover {
        background-color: $success;
    }
}

.cancel-button {
    @extend .custom-button;

    &:hover {
        background-color: $cancel;
    }
}

.button-container {
    align-self: flex-end;
    display: flex;

    margin: 10px;
}

.options-container {
    display: flex;
    justify-content: space-evenly;
    border-radius: 10px;
    margin: 0 1vw 0 1vw;
    height: 100%;
}

.main-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1vh 0 1vh 0;

}

.button-wrapper {
    width: 100%;
    height: 100%;
}

.close-button {
    position: absolute;
    top: 10vh;
    left: 93vw;

    padding: 7px;
    margin: 0;
    border-radius: 50%;
    width: 1.5vw;
    height: 1.5vw;
    overflow: hidden;
    border: none;
    transition: all 150ms ease;

    min-width: 30px;
    min-height: 30px;

    &:hover {
        background-color: lightgray;
    }
}


p {
    color: gray;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    font-family: 'Lato', sans-serif;

}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 90vw;
    max-height: 100%;
    height: 80%;
    margin: 0px auto;
    padding: 10px 20px 10px 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 250ms ease-in-out;
    border-radius: 5px;

    background-color: rgb(253, 253, 253);
    text-align: center;

    gap: 10px;

    font-family: 'Lato', sans-serif;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
}

@media (max-width: 600px) {
    .modal-container {
        height: 100vh;
    }

    .button-wrapper {
        width: 100%;
        height: 100%;
    }

    .modal-container {
        height: 100%;
        width: 100%;
        padding: 0;
        overflow: scroll;
    }

    .close-button {
        display: none;
    }

    .options-container {
        display: block;
        gap: 2vh;
    }

    .main-container {
        height: 100vh;
        padding-bottom: 20%;
    }

    .button-container {
        position: relative;
        bottom: -500px;
        z-index: inherit;

    }

}
</style>