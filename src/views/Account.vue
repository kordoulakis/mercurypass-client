<template>
    <div class="account-container">
        <AccountInfo :user="authStore.getUser" />
        <button @click="admin" v-if="authStore.getUser.email === 'admin@mercurypasseu.com'" class="admin">
            <i class="fa-solid fa-toolbox"></i>
            Go to admin page</button>
        <div class="account-items">
            <AccountItem :info="personal" />
            <AccountItem :info="payments" />
        </div>
        <router-link to="/account-delete">Deactivate my account</router-link>
    </div>
</template>

<script setup>
import { useAuth } from '../stores/authentication';
import AccountInfo from '../components/AccountInfo.vue';
import AccountItem from '../components/AccountItem.vue';
import { useRouter } from 'vue-router';

//Import useAuth and reference it here, can get the user object through it
const authStore = useAuth();

const personal = {
    image: "fa-solid fa-address-card fa-2x",
    title: "Personal Info",
    description: "Provide personal details",
    route: "/account/personal-info"
}
const payments = {
    image: "fa-solid fa-money-bill fa-2x",
    title: "Payments",
    description: "Choose your default payment methods",
    route: "/account/payments"
}

const router = useRouter()
function admin() {
    router.push('/admin')
}
</script>

<style scoped lang="scss">
a {
    margin-top: 2vh;

    color: none;
}

.admin {
    width: 200px;
    height: 70px;
    align-self: center;
    background-color: rgb(33, 119, 233);
    color: white;
    font-size: large;
    border: none;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 gray;
    cursor: pointer;

    &:hover {
        background-color: red;
    }
}

.account-items {
    display: flex;
    justify-content: space-evenly;
    gap: 2vw;
}

.account-container {
    height: 100vh;

    padding: 0;
    margin-left: 20vw;
    margin-right: 20vw;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* Deactivate text */
    text-align: center;
    gap: 2vh;
    font-family: 'Raleway', sans-serif;
}

@media (max-width: 600px) {
    .account-items {
        flex-direction: column;
    }
}
</style>