<template>
    <div class="account-item" @click="route">
        <div class="image-row">
            <i :class="info.image" />
        </div>
        <div class="row">
            <h3> {{ info.title }} </h3>
        </div>
        <div class="row">
            <p> {{ info.description }} </p>
        </div>
    </div>
</template>

<script>
import router from '../router'

export default {
    props: {
        info: Object
    },
    methods: {
        route() {
            router.push({ path: this.info.route })
        }
    }
}

</script>

<style scoped lang="scss">
.settings-link {
    text-decoration: none;
    color: black;
}

h3 {

    margin-top: 10px;
    margin-bottom: 0px;
}

.account-item {
    font-family: 'Raleway', sans-serif;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    max-width: 25vw;
    width: 25vw;
    min-height: 15vh;

    //top right bottom left 
    padding: 30px 10px 0px 15px;
    border-radius: 10px;

    box-shadow: 0px 5px 10px 0px rgba(53, 53, 53, 0.205);
    margin: 0;

    text-decoration: none;
    color: black;

    min-width: 200px;
    cursor: pointer;
}

.row {
    display: flex;
    justify-content: flex-start;
}

.image-row {
    margin-bottom: 1vh;
}
</style>