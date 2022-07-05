<script setup>
import { ref } from 'vue'
import { ContentLoader } from 'vue-content-loader'
import SearchResultItem from './SearchResultItem.vue'

import Modal from '../CountryModal.vue'
import axios from 'axios'
import { api_global } from '../../services/api'

const api = api_global + 'countries';

const data = ref();

(async () => {
    const res = await axios.get(api);
    data.value = await res.data
})()


const query = ref('')
const results = ref([])

const showResults = ref(false)
const queryPending = ref(false)
const queryCompleted = ref(false)
const gotResults = ref(false)

function search() {
    queryCompleted.value = false;
    if (query.value === '') {
        showResults.value = false;
        results.value = []
        return
    }
    showResults.value = true;
    queryPending.value = true;

    getQueryResult()
}

function getQueryResult() {
    results.value = data.value
        .filter(country =>
            country.name.toLowerCase().includes(query.value.toLowerCase())
            || country.cities.toLowerCase().includes(query.value.toLowerCase())
        )
    gotResults.value = results.value.length > 0 ? true : false

    queryCompleted.value = true
    queryPending.value = false
}

async function focusOut(e) {
    //Checks if the newly focused element is a child
    if (e.relatedTarget === null) {
        purgeResults()
    }
    else {
        setTimeout(purgeResults, 500)
    }
}

function purgeResults() {
    results.value = []
    queryCompleted.value = false
    queryPending.value = false
    gotResults.value = false
}

const showCountryModal = ref(false)

const country = ref()

function hydrateModal(emitted) {
    country.value = emitted
    showCountryModal.value = true;
}

</script>

<template>
    <div style="position: relative">
        <form @submit.prevent="search" class="search-container" action="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input style="font-family: 'Roboto', sans-serif;" @focus="search" @input="search" v-on:focusout="focusOut"
                v-model="query" type="search" placeholder="Search for Greece, Austria, Paris..." aria-label="Search">
        </form>
        <div v-if="showResults" tabindex="-1" class="search-results-container">

            <div v-if="queryPending" class="results-container">
                <ContentLoader class="search-result-placeholder" :speed="2"></ContentLoader>
            </div>
            <div v-else-if="queryCompleted" class="results-container">
                <div v-if="gotResults" v-for="c in results" :key="c.name">
                    <SearchResultItem :country="c" @click="showCountryModal = true" @countryToShow="hydrateModal" />
                </div>
                <div v-else class="no-results">
                    <i class="fa-solid fa-face-sad-tear"></i>
                    <p>Sorry, we didn't find any such countries or cities </p>
                </div>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :countryDetails="country" :showCountryModal="showCountryModal" @close="showCountryModal = false">
            <template>
            </template>
        </modal>
    </Teleport>
</template>

<style scoped lang="scss">
.no-results {
    display: block;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    background-color: white;
}

.search-results-container {
    position: absolute;
    padding-top: 20px;

    left: 50%;
    transform: translate(-50%);
    min-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;
}

.search-result-placeholder {
    border-bottom: 1px solid rgb(48, 48, 48);
    min-width: 400px;
}

.results-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
}

.search-container {
    display: flex;
    align-items: center;
    color: gray;
    padding: 0 10px 0 10px;

    width: 10vw;
    min-width: 200px;
    min-height: 40px;

    background-color: rgb(233, 233, 233);
    border-color: lightblue;
    transition: background-color 0.1s linear;
    transition: box-shadow 0.1s linear;
    border-radius: 25px;
    box-shadow: none;
    background-color: rgb(233, 233, 233);
    border-color: lightblue;
    transition: background-color 0.1s linear;
    transition: box-shadow 0.1s linear;

    &:hover {
        background-color: rgb(220, 220, 220);
    }

    &:focus-within {
        background-color: rgb(220, 220, 220);
        outline: 2px solid rgb(79, 155, 220);
    }

    & input {
        border: none;
        background-color: transparent;
        outline: none;
        display: flex;
        flex: 1;
    }

}
</style>