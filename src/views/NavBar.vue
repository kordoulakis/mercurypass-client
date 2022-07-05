<template>
    <div class="row">
        <div class="navigation-header">
            <ul class="navigation-list-global">
                <li>
                    <router-link class="logo-link" to="/">
                        <img class="logo-img" src="../assets/logo.svg">
                    </router-link>
                </li>
                <li>
                    <ul class="navigation-list">
                        <NavButton navRoute="Countries" fa_icon="fa-solid fa-earth-europe" />
                        <NavButton navRoute="News" fa_icon="fa-solid fa-newspaper" />
                        <NavButton navRoute="About" fa_icon="fa-solid fa-people-group" />
                    </ul>
                </li>

                <li>
                    <ul class="profile-list">
                        <li class="profile-list-item ">
                            <p :style="getDisplayNameStyle()" v-if="authStore.getUser.displayName"
                                class="my-profile-text">{{
                                        authStore.getUser.displayName.split(' ')[0]
                                }}</p>
                            <p v-else style="width: 10ch;" class="my-profile-text">My Profile</p>
                            <div class="dropdown">
                                <button tabindex="-1" class="utility-link">
                                    <img class="profile-picture" :src="getProfilePicture()" />
                                </button>
                                <div class="dropdown-menu" tabindex="-1">
                                    <router-link v-if="authStore.getUser" class="profile-router-button" to="/me/passes">
                                        My Passes
                                    </router-link>
                                    <router-link v-if="authStore.getUser" class="profile-router-button" to="/account">
                                        Account
                                    </router-link>
                                    <button v-else class="profile-router-button" id="show-modal"
                                        @click="showModal = true">Log In</button>
                                    <button v-if="authStore.getUser" @click="signOutUser"
                                        class="profile-router-button">Log Out</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="search-row" v-if="showSearchElement">
        <Search />
    </div>
    <!-- Login Modal -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :showModal="showModal" @close="showModal = false">
            <template>
            </template>
        </modal>
    </Teleport>
</template>

<script setup>
import Modal from '../components/LoginModal.vue'
import Search from '../components/Search/Search.vue'

import { getAuth, signOut } from 'firebase/auth'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import { useAuth } from '../stores/authentication';
import NavButton from '../components/NavButton.vue';
//Firebase authentication from store
const authStore = useAuth();

//When to show the search bar
const searchRoutes = ["/", "/countries", "/about", "/news"]
const showSearchElement = ref(false)

const avatarURL = 'https://www.svgrepo.com/show/13644/avatar.svg'

function getDisplayNameStyle() {
    if (authStore.getUser) {
        const nameWidth = authStore.getUser
            .displayName.split(' ')[0].length.toString() + 'ch'
        return {
            width: nameWidth
        }
    }
}
function getProfilePicture() {
    try {
        const url = authStore.getUser != '' && authStore.getUser.photoURL != null ? authStore.getUser.photoURL : avatarURL
        return url
    } catch (error) {
        console.log(error)
        return avatarURL;
    }
}

function signOutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
        router.push('/')
    }).catch((error) => {
        alert(error)
    });
}

const showModal = ref(false)

const route = useRoute()
const router = useRouter()

watch(() => route.name, () => {
    showSearchElement.value = searchRoutes.includes(route.path)
})


</script>

<style scoped lang="scss">
$hover-color: rgb(245, 250, 255);
$profile-button-color-light: rgb(53, 53, 53);
$brand-blue: #3c6ef7;

.my-profile-text {
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: large;
    pointer-events: none;
}


.profile-picture {
    width: 100%;
}

.logo-link {
    text-decoration: none;
}

.dropdown {
    position: relative;
}

.profile-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2c2c2c17;
    padding: 0px 10px 0 10px;
    margin: 0;
    border-radius: 20px 20px 20px 20px;
}

.dropdown-menu {
    position: absolute;
    right: 0;
    top: calc(110% + 0.25rem);

    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 lightgray;
    opacity: 0;
    pointer-events: none;

    transform: translateY(-10px);
    transition: all 150ms ease-in-out;

    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    min-width: 100px;
    width: 200px;

    outline: 1px solid lightgray;
    z-index: 1000;
}


.profile-router-button {
    text-decoration: none;
    display: flex;
    justify-content: left;
    padding: 1.3vh 0vw 1vh 0.4vw;
    margin: 0;
    background-color: white;
    border: none;
    border-bottom: 1px solid rgba(128, 128, 128, 0.26);

    color: black;
    font-size: large;
    font-family: 'Raleway', sans-serif;


    &:hover {
        background-color: $hover-color;
        pointer-events: all;
    }
}

.dropdown button.utility-link {
    background: none;
    width: 35px;
    height: 35px;

    border: 0;
    border-radius: 50%;
    overflow: hidden;
    outline: 1px solid black;

    padding: 0;
    cursor: pointer;
}

.utility-link:focus+.dropdown-menu {
    opacity: 1;
    pointer-events: auto;
}

.row {
    display: flex;
    justify-content: center;
    min-width: 300px;

}

.search-row {
    display: flex;
    margin-bottom: 1vh;
    padding-bottom: 2vh;
    padding-top: 1vh;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 1px 0 rgba(0, 0, 0, 0.04);
}

.navigation-header {
    flex: 1;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}


.navButtonExtended {
    flex: 2;
    background-color: white;
    color: gray;
    border: 0;
    text-decoration: none;
    font-family: 'Raleway', sans-serif;

    padding: 7px 15px 7px 15px;
    margin: 0px 15px 0px 15px;

    min-width: 7.3vw;
    min-height: 3.6vh;

    font-size: 1.1em;
    border-radius: 20px;
    transition: all 0.2s ease-in-out;
    background-color: $brand-blue;
    color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.navButton {
    flex: 2;
    background-color: white;
    color: gray;
    border: 0;
    text-decoration: none;
    font-family: 'Raleway', sans-serif;


    padding: 7px 15px 7px 15px;
    margin: 0px 15px 0px 15px;

    min-width: 5vw;
    min-height: 3.6vh;
    font-size: 1.1em;
    border-radius: 20px;
    transition: all 0.2s ease-in-out;
    box-shadow: none;
}

.navButton:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

.profile-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100px;
}

.navigation-list-global {
    list-style-type: none;
    margin: 0;
    padding: 0;

    flex: 1;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-around;
}

.navigation-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-img {
    width: 100px;
    height: 100px;
    align-self: flex-start;
}

@media (max-width: 600px) {
    .dropdown-menu {
        width: 200px;
    }

    .navigation-list {
        flex-direction: column;
    }

    .row {
        max-width: 100vw;
        margin: 0;
    }

    .profile-list-item {
        background-color: transparent;
        padding: 0;
        border-radius: 0;
    }

    .my-profile-text {
        display: none;
    }

    .profile-router-button {
        height: 50px;
        align-items: center;
        font-weight: bold;
        justify-content: center;
    }
}
</style>

