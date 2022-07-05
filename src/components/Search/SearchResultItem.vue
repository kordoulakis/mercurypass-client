<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    country: Object
})

const { country } = toRefs(props)
const flag = "https://flagcdn.com/" + country.value.abbreviation + ".svg"

const emit = defineEmits(['countryToShow'])

function emitCountry() {
    emit('countryToShow', country.value)
}

function formatPrice(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}

</script>

<template>
    <div class="container" @click="emitCountry">
        <div class="img-container">
            <img class="country-image" :src="flag" width="30" alt="South Africa">
        </div>
        <div class="country-info">
            <h2> {{ country.name }}</h2>
            <p> {{ country.cities }} </p>
            <div class=" pricing">
                <p>{{ formatPrice(country.repeat) }} </p>
                <p>|</p>
                <p>{{ formatPrice(country.weekly) }} </p>
                <p>|</p>
                <p>{{ formatPrice(country.semester) }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$brand-blue: #3c6ef7;

.pricing {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

.country-info {
    font-family: 'Lato', sans-serif;
    width: 100%;
}

.container {
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    max-width: 400px;
    min-height: 100px;
    gap: 1vw;

    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: white;
    cursor: pointer;

    &:hover {
        color: $brand-blue;
    }
}

.img-container {
    display: flex;
    align-items: center;
    max-width: 40%;
    flex: 0 0 33%;
    max-height: 200px;
    padding: 0;
    margin: 0;
    justify-content: center;
    flex-direction: column;
}

h2 {
    padding: 0;
    margin-top: 2px;

}

p {
    @extend h2;
    color: black;
}

.country-image {
    margin-top: 2px;
    width: 100%;
    box-shadow: 0px 1px 5px 0px rgba(128, 128, 128, 0.35);
}
</style>