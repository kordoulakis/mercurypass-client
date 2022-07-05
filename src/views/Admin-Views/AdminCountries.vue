<script setup>
import { ref } from 'vue'
import axios from 'axios'

import { api_global } from '../../services/api';

import SearchResultItem from '../../components/Search/SearchResultItem.vue';
import { useAuth } from '../../stores/authentication';

const countries = ref()
const selected = ref();

const authStore = useAuth();

(async () => {
    const api = api_global + 'countries'
    const res = await axios.get(api)
    countries.value = await res.data
})()

function selectCountry(c) {
    selected.value = c
}

const newCountryName = ref();
const newCountryCities = ref();
const newCountryRepeat = ref();
const newCountryWeekly = ref();
const newCountrySemester = ref();
const newcountryImg = ref();
const newCountryAb = ref();

async function createCountry() {
    const newCountry = {
        name: newCountryName.value,
        cities: newCountryCities.value,
        repeat: newCountryRepeat.value,
        weekly: newCountryWeekly.value,
        semester: newCountrySemester.value,
        abbreviation: newCountryAb.value,
        image: newcountryImg.value,
    }

    const invalid = Object.entries(newCountry)
        .some(i => i[1] === '' || i[1] === undefined)
    if (invalid) {
        alert("Failed to create, empty fields")
    }

    //parse the inputs and send through axios
    try {
        if (isNaN(newCountry.repeat) || isNaN(newCountry.weekly) || isNaN(newCountry.semester)) {
            throw 'Parameter not a number'
        }
        const api = api_global + 'admin/country/new'
        const payload = {
            headers: {
                token: authStore.getUser.accessToken
            }
        };
        await axios.post(api, newCountry, payload)
        alert('Country Created succesfully')
    } catch (error) {
        alert('Failed: ' + error)
    }
}

const editCities = ref()
const editRepeat = ref()
const editWeekly = ref()
const editSemester = ref()

async function editCountry() {
    const edit = {
        id: selected.value.id,
        cities: editCities.value,
        repeat: editRepeat.value,
        weekly: editWeekly.value,
        semester: editSemester.value,
    }

    const invalid = Object.entries(edit)
        .some(i => i[1] === '' || i[1] === undefined)
    if (invalid) {
        alert("Failed to create, empty fields")
    }

    try {
        if (isNaN(edit.repeat) || isNaN(edit.weekly) || isNaN(edit.semester)) {
            throw 'Parameter not a number'
        }
        const api = api_global + 'admin/country/edit/'
        const payload = {
            headers: {
                token: authStore.getUser.accessToken
            }
        };
        await axios.put(api, edit, payload)
        alert('Country Created succesfully')
    } catch (error) {
        alert(error)
    }

}

</script>

<template>
    <div class="admin-countries-container">
        <div class="countries">
            <h1>Countries</h1>
            <div v-if="countries" v-for="c in countries" :key="c.id">
                <SearchResultItem @country-to-show="selectCountry" :country="c" />
            </div>
        </div>
        <div class="edit">
            <h1>Edit</h1>
            <div v-if="selected" class="edit-country">
                <h2>{{ selected.name }}</h2>
                <div class="edits">
                    <div class="edit-cities">
                        <h2>{{ selected.cities }}</h2>
                        <input v-model="editCities" :style="{ width: '100%' }" type="text">
                    </div>
                    <div class="edit-prices">
                        <div class="price">
                            <h2>{{ selected.repeat }}</h2>
                            <input v-model="editRepeat" type="text" placeholder="Pay per trip">
                        </div>
                        <div class="price">
                            <h2>{{ selected.weekly }}</h2>
                            <input v-model="editWeekly" type="text" placeholder="Weekly">
                        </div>

                        <div class="price">
                            <h2>{{ selected.semester }}</h2>
                            <input v-model="editSemester" type="text" placeholder="Semester">
                        </div>
                    </div>
                </div>

                <button @click="editCountry" class="create-btn">Edit</button>

            </div>
            <h2 v-else>No country selected yet</h2>
        </div>
        <div class="create">
            <h1>Create Country</h1>
            <form class="create-inputs">
                <input v-model="newCountryName" type="text" placeholder="Name">
                <input v-model="newCountryCities" type="text" placeholder="Cities">
                <input v-model="newCountryAb" type="text" placeholder="Abbreviation">
                <input v-model="newCountryRepeat" type="text" placeholder="Pay per trip Price">
                <input v-model="newCountryWeekly" type="text" placeholder="Weekly Price">
                <input v-model="newCountrySemester" type="text" placeholder="Semester Price">
                <input v-model="newcountryImg" type="text" placeholder="Image src">
            </form>
            <button @click="createCountry" class="create-btn">Create</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
$success: #00B74A;

.price {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.edit-cities {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.edit-prices {
    display: flex;
}

.edit-country {
    display: flex;
    width: 50%;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
}

.create-inputs {
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-direction: row !important;
}

.create-btn {
    width: 30%;
    height: 50px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.5em;
    margin: 20px;
    color: black;
    background: none;
    transition: all 200ms ease;
    border: 1px solid gray;
    border-radius: 10px;

    &:hover {
        background-color: $success;
        color: white;
    }
}

.edit {
    @extend .item;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.create {
    @extend .item;
    gap: 2vh;
}

.countries {
    @extend .item;
    flex-direction: row !important;
    flex-wrap: wrap;
}

.item {
    border: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
}

.admin-countries-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10vh 0 0 20px;
    width: 100%;
    font-family: 'Lato', sans-serif;
}
</style>