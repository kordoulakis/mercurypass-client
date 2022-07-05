<template>
    <router-link class="pass-link" :to="{ name: 'Pass', params: { passId: pass.passId } }">
        <div class="pass-container">
            <img class="flagImage" :src="'https://flagcdn.com/' + pass.country.abbreviation + '.svg'" />
            <div class="details">
                <h1>{{ pass.country.name }}</h1>
                <h2>{{ types[pass.type] }} Pass</h2>
            </div>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps({ pass: Object })

const types = {
    1: 'Repeat',
    2: 'Weekly',
    3: 'Semester'
}
</script>

<style scoped lang="scss">
$deep-gray: rgb(44, 44, 44);

h2 {
    font-style: italic;
}

.flagImage {
    width: 100%;
    margin: 0;
    padding: 0;

    object-fit: cover;
    max-height: 30vh;
}

.pass-link {
    flex-basis: 33.333333%;
    text-decoration: none;
    color: $deep-gray;
}

.pass-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 10px;

    width: 25vw;

    border-radius: 10px;
    overflow: hidden;
    outline: 1px solid rgba(48, 48, 48, 0.158);
    box-shadow: 0px 4px 1px 0px rgba(99, 99, 99, 0.123);

    transition: all 100ms ease;

    &:hover {
        transform: scale(1.01);
        box-shadow: 0px 4px 10px 0px rgba(99, 99, 99, 0.623);
    }
}

.details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
    height: auto;
}

@media screen and (max-width: 600px) {
    .pass-container {
        width: 90vw;
    }
}
</style>