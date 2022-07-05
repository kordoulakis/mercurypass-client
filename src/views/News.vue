<template>
    <div class="news-container">
        <div class="main-container">
            <router-link class="left-container" to="/news">
                <div>
                    <h1>Mercury | News </h1>
                </div>
            </router-link>

            <div class="right-container">
                <router-link to="/news" class="half-container-down">
                    <div class="half-container-up">
                        <h1>Mercury | News</h1>
                    </div>
                </router-link>

                <router-link to="/news" class="half-container-down">
                    <div>
                        <h1>Mercury | News</h1>
                    </div>
                </router-link>

            </div>
        </div>

        <h1>Latest News</h1>

        <div class="news-items-container">
            <div v-for="item in news" :key="item.id">
                <NewsItem :newsItem=item />
            </div>
        </div>

    </div>
</template>

<script setup>
import NewsItem from '../components/NewsItem.vue';
import data from '../json mockdbs/news.json'

const news = data

</script>

<style scoped lang="scss">
$hover-red: rgb(255, 0, 0);

.news-items-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 19vw 0 19vw;
    gap: 1vw;
    margin: 10px;
}

img {
    max-height: 50vh;
    width: auto;
}

.main-container {
    display: flex;

    height: 100%;
    min-height: 50vh;
    max-height: 50vh;
    text-align: center;
    color: white;

    font-family: 'Raleway', sans-serif;
}

.left-container {
    flex: 1 1 0;
    background: rgb(51, 71, 255);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-end;
    text-decoration: none;
    color: white;

    &:hover {
        color: $hover-red;
    }
}

.right-container {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
}

.half-container-up {
    flex: 1;
    overflow: hidden;
    background: linear-gradient(45deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-end;
    text-decoration: none;
    color: white;

    &:hover {
        color: black;
    }

}

.half-container-down {
    flex: 1;
    background: linear-gradient(343deg, rgba(34, 193, 195, 1) 0%, rgba(45, 87, 253, 1) 100%);
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-end;
    text-decoration: none;
    color: white;

    &:hover {
        color: black;
    }
}

.news-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;

    font-family: 'Raleway', sans-serif;
    padding: 0;
    margin: 0;
    min-height: 100vh;
}

@media (max-width: 600px) {
    .news-items-container {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
    }
}
</style>


