<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
    description: Object,
    country: Object,
    type: String
})

const { country, type } = toRefs(props)

const icon = ref();
const cl = ref();
const price = ref();

function formatPrice(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}

switch (type.value) {
    case 'repeat':
        icon.value = 'fa-solid fa-repeat'
        cl.value = 'Pay Per Trip'
        price.value = formatPrice(country.value.repeat)
        break;
    case 'weekly':
        icon.value = 'fa-solid fa-calendar-week'
        cl.value = 'Weekly'
        price.value = formatPrice(country.value.weekly)
        break;
    case 'semester':
        icon.value = 'fa-solid fa-building-columns'
        cl.value = 'Semester'
        price.value = formatPrice(country.value.semester)
        break;
}

</script>
<template>
    <div class="option">
        <div class="icondiv">
            <i :class="icon"></i>
        </div>
        <div class="option-text">
            <h3>{{ cl }}</h3>
            <div class="description">
                <p v-for="line in description">{{ line }}</p>
            </div>
            <div class="pricing">
                <hr>
                <h4>Pricing</h4>
                <p> {{ price }} / Activation</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$brand-blue :#3c6ef7;
$success: #00B74A;
$cancel: #F93154;
$hover-gray: rgb(245, 245, 245);
$shadow: rgba(0, 0, 0, 0.22);

.pricing {
    width: 80%;
}

.option-text {
    display: flex;
    height: 100%;
    width: 80%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.icondiv {
    font-size: 50px;
    box-shadow: 0px 1px 5px -2px $shadow;
    margin-bottom: 10px;
    padding-bottom: 10px;
}

.option {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
    padding: 10px 5px 10px 5px;
    background-color: white;
    max-height: 100%;
    width: 20vw;
    border-radius: 10px;
    box-shadow: 0px 2px 10px 2px $shadow;

    cursor: pointer;
    transition: all 100ms ease-in-out;



    font-family: 'Lato',
        sans-serif;
}

@media (max-width: 600px) {

    .option-text {
        font-size: small;
    }

    .option {
        width: 100%;
        padding: 0;
        margin: 0;
    }

}
</style>