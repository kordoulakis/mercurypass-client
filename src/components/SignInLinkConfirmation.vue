<template>
    <div class="container">
        <h1>Welcome to Mercury Pass</h1>
        <LoadingSpinner />
        <h2>You're being redirected...</h2>
    </div>

</template>

<script setup>
import LoadingSpinner from '../components/LoadingSpinner.vue';

import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from 'vue-router';
const router = useRouter()

// Confirm the link is a sign-in with email link.
const auth = getAuth();
if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
        email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');
            const user = result.user
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code)
        });
}
</script>

<style scoped lang="scss">
h1,
h2 {
    font-family: 'Lato', sans-serif;
}

.container {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
}
</style>