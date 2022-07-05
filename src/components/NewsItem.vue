<template>
    <div class="container">
        <div class="newsImage">
            <!-- <img src="../assets/404.gif" alt=""> -->
            <img :src="src">
        </div>
        <div class="inner-container">
            <div class="date">
                <p class="mercury">Mercury Pass</p>
                <p class="dateText"> {{ newsItem.date }} </p>
            </div>
            <p class="title"> {{ newsItem.title }}</p>
            <p class="description">
                {{ newsItem.description }}
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    newsItem: Object
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const randomId = getRandomInt(250);
const src = 'https://picsum.photos/id/' + randomId + '/400/300'
</script>

<style scoped lang="scss">
$mercury-red: #e43414;

.newsImage {
    display: flex;
    background-color: black;
    height: 20vh;
    width: 100%;
    max-height: 10%;
}

.description {
    padding-top: 0;
    margin-top: 0;
    font-size: 1em;
    text-align: left;
}

.title {
    padding-top: 0;
    margin-top: 0;
    font-weight: bold;
    font-size: 1.3em;
    text-align: left;
}

.dateText {
    padding: 0;
}

.mercury {
    color: red;
}

.date {
    display: flex;
    font-size: medium;
    font-weight: bold;
    justify-content: flex-start;
    gap: .5vw;
}

img {
    max-width: 100%;
}

.inner-container {
    padding: 0 20px 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}




.container {
    width: 15vw;
    min-width: 400px;
    min-height: 40vh;
    height: auto;


    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.308);

    transition: all 500ms ease;

    cursor: pointer;

    &:hover {
        transform: translateY(-1.5vh);
        box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.5);
    }
}

@media (max-width: 600px) {
    .container {
        width: 100vw;
        padding: 0;
        margin: 0;

        gap: 20px;

        &:hover {
            transform: none;
            box-shadow: none;
        }
    }

    .newsImage {
        height: 40vh;
    }
}
</style>
