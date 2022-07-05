<template>
    <div class="container">
        <h1>Account</h1>
        <p> <strong> {{ user.displayName }}</strong> </p>
        <p class="email"> {{ user.email }} </p>
    </div>
</template>

<script setup>

const props = defineProps({
    user: Object
})

</script>

<style scoped>
.email {
    color: gray;
}

h1 {
    font-family: 'Lato', sans-serif;
    margin-bottom: 10px;
}

p {
    margin: 0;
    padding: 0;
    display: inline;
    font-family: 'Lato', sans-serif;
}

.container {
    margin-top: 5vh;
    margin-bottom: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>