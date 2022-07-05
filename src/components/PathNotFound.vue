<template>
    <router-link to="/">
        <div class="container">

            <img src="../assets/404.gif" alt="lost at sea gif">
        </div>
    </router-link>

</template>

<style scoped>
a {
    text-decoration: none;
}

.container {
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
}

img {
    height: 80vh;
    width: auto;
}
</style>