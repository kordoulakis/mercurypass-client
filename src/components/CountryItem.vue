<template>
    <div class="country" @click="showCountryModal = true">
        <img class="fullscreen" :src="country.image" alt="">
        <div class="country-text">
            <h3>{{ country.name }}</h3>
        </div>
        <div class="country-info">
            <h4>Supported cities</h4>
            <h5>{{ country.cities }}</h5>
        </div>
        <div class="pricing-info">
            <p>{{ formatPrice(country.repeat) }} </p>
            <p>|</p>
            <p>{{ formatPrice(country.weekly) }} </p>
            <p>|</p>
            <p>{{ formatPrice(country.semester) }}</p>
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

<script setup>
import Modal from './CountryModal.vue'
import { ref } from 'vue'

const props = defineProps({
    country: Object
})

const showCountryModal = ref(false)

function formatPrice(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}

</script>

<style scoped lang="scss">
.pricing-info {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
}

.country-text {
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
}

.country-info {
    @extend .country-text;
    padding-top: 10px;
    border-bottom: 1px solid rgba(19, 19, 19, 0.082);
    box-shadow: none;
}

h3 {
    font-family: 'Raleway', sans-serif;
}

h4 {
    font-size: medium;
    padding: 0;
    margin: 5px 0px 10px 0px;
    color: rgb(24, 24, 24);
}

h5 {
    @extend h4;
    color: rgb(77, 77, 77);
}

.page {
    position: relative;
    text-align: center;
    color: white;
}

.country {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 1%;
    padding: 0;
    margin-bottom: 1vh;
    overflow: hidden;
    background-color: white;

    color: black;

    min-width: 500px;
    width: 25vw;
    max-width: 27.5vw;

    min-height: 25vh;
    height: auto;
    pointer-events: auto;
    cursor: pointer;

    & img {
        padding: 0;
        margin: 0;

        max-width: 100%;
        min-height: 35vh;
        width: auto;
    }

    transition: all 150ms ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.3);
    }
}

@media (max-width: 500px) {
    .country {
        min-width: 100vw;
        width: 450px;
    }

    .fullscren {
        width: 100px;
    }

    .country-text {
        box-shadow: none;
    }
}
</style>
