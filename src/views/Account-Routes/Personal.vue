<template>
    <div class="container">
        <div class="history">
            <router-link to="/account">
                <p>About</p>
            </router-link>
            <p> > Personal Information </p>
        </div>

        <div class="route">Personal Information</div>

        <div class="items">
            <!-- Display name -->
            <AccountEditableItem :data="nameData" :editFunction="editName" />
        </div>
    </div>

</template>

<script setup>
import { useAuth } from '@/stores/authentication.js'
import AccountEditableItem from '@/components/AccountEditableItem.vue'

const authStore = useAuth();

const nameData = {
    info: 'Display Name',
    toEdit: authStore.getUser.displayName,
}

async function editName(name) {
    await authStore.editDisplayName(name)

}

</script>

<style scoped lang="scss">
$brand-blue :#3c6ef7;
$brand-blue-hover :#4b7afa;

.items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2vh;
}

.route {
    margin: 20px 0px 20px 0px;
    font-size: 3rem;
    text-decoration: underline $brand-blue;
    text-underline-offset: 0.2rem;
}

a {
    padding: 0;
    margin: 0;
    text-decoration: none;
    color: black;

    &:hover {
        color: black;
        text-decoration: underline;
    }
}

.history {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    width: 300px;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 100%;
    padding: 0 25vw 0 25vw;
    margin: 0;
    min-height: 100vh;

    font-family: 'Raleway', sans-serif;
}

@media (max-width:600px) {
    .container {
        justify-content: flex-start;
        padding: 10px;
        width: 100%;
    }

    .route {
        font-size: 2em;
        text-align: center;
        justify-self: center;
        align-self: center;
    }
}
</style>