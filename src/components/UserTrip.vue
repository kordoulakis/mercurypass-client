<template>
    <li class="trip">
        <div class="info">
            <p> Date: {{ formatDate() }} {{ formatTime() }}</p>
            <p>City: {{ trip.city }}</p>
            <p> Transportation Mode: {{ trip.transport }}</p>
        </div>

        <i class="icon" :class="getFontAwesomeIcon()"></i>
    </li>
</template>

<script setup>
import { toRefs } from 'vue'
const props = defineProps({
    trip: Object
})

const { trip } = toRefs(props)

function getFontAwesomeIcon() {
    switch (trip.value.transport) {
        case 'Bus':
            return 'fa-solid fa-bus fa-2xl'
        case 'Metro':
            return 'fa-solid fa-train-subway fa-2xl'
        case 'Tram':
            return 'fa-solid fa-train-tram fa-2xl'
    }
}

function formatDate() {
    return new Date(trip.value.createdAt).toLocaleDateString('en-us')
}

function formatTime() {
    return new Date(trip.value.createdAt).toLocaleTimeString('en-us', { weekday: "long", month: "long", day: "numeric" })
}

</script>

<style scoped lang="scss">
$brand-blue :#3c6ef7;
$success: #00B74A;
$cancel: #F93154;


.trip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    // box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);

    text-align: left;

    user-select: none;
    transition: all 50ms ease;

    font-family: 'Roboto', sans-serif;
    color: #2c2c2c;

    padding: 10px;
    transition: all 100ms ease;

    background-color: white;

    border-bottom: 1px solid #2c2c2c3b;

    &:hover {
        color: white;
        background-color: $brand-blue;
    }
}

.icon {
    padding-right: 20px;
}

p {
    font-size: large;
    font-weight: normal;
    color: inherit;
    line-height: 1.5em;
    padding-left: 20px;
}

@media (max-width: 600px) {
    .trip {
        padding: 0;
        margin: 0;
        justify-content: center;
        align-items: flex-start;
        padding-top: 10px;
        box-shadow: none;
        border: none;
        border-top: 1px solid rgba(34, 34, 34, 0.116);
        border-right: 1px solid #2c2c2c28;
    }

    .icon {
        visibility: collapse;
    }

    .info {
        font-size: small;
        justify-content: center;
        padding: 0;
        margin: 0;
        text-align: center;
        height: 50%;
    }

    .p {
        line-height: 0;
        width: 100%;
        font-size: small !important;
    }

}
</style>

<script>

</script>
