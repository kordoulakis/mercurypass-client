<template>
    <li>
        <button @click="goToRoute" class="navButton"
            :class="[route.name === navRoute ? 'navButtonExtended' : 'navButton']">
            <i :class="fa_icon"></i>
            {{ navRoute }}
        </button>
    </li>
</template>

<script setup>
import { toLower } from 'lodash';
import { toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    navRoute: String,
    fa_icon: String
})

const route = useRoute()
const router = useRouter()

const { navRoute, fa_icon } = toRefs(props)

function goToRoute() {
    router.push('/' + toLower(navRoute.value))
}

</script>

<style scoped lang="scss">
$brand-blue: #3c6ef7;

.navButton {
    background-color: white;
    color: gray;
    border: 0;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;

    padding: 7px 15px 7px 15px;
    margin: 0px 15px 0px 15px;

    min-width: 5vw;
    min-height: 3.3vh;
    font-size: 1.1em;
    border-radius: 12px;
    transition: all 0.2s ease-in-out;
    box-shadow: none;

    &:hover {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }

    cursor: pointer;
}

.navButtonExtended {
    @extend .navButton;

    min-width: 7vw;
    min-height: 3.3vh;

    background-color: $brand-blue;
    color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}
</style>