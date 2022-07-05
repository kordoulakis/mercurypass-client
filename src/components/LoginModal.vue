<script setup>
import { Form } from 'vee-validate';
import * as Yup from "yup";
import FormInput from './FormInput.vue';
import LoadingSpinner from './LoadingSpinner.vue';

import { ref } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider, sendSignInLinkToEmail } from "firebase/auth";


function onInvalidSubmit() {
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.classList.add("invalid");
    setTimeout(() => {
        submitBtn.classList.remove("invalid");
    }, 1000);
}
// Using yup to generate a validation schema
const schema = Yup.object().shape({
    email: Yup.string().email().required()
});

function googleSignIn() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signingIn.value = true;
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            closeModal()
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            signingIn.value = false;
        });
}

async function emailSignIn() {
    const actionCodeSettings = {
        url: 'https://mercury-eu.web.app/signInConfirmation'
        , handleCodeInApp: true
    };

    const auth = getAuth();
    const userEmail = email.value
    sendSignInLinkToEmail(auth, userEmail, actionCodeSettings)
        .then(() => {
            //email has been sent, save in localStorage for confirmation function
            window.localStorage.setItem('emailForSignIn', userEmail);
            emailSent.value = true;
            usermail.value = userEmail;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("code: " + errorCode)
            console.log("message: " + errorMessage)
        });
}

//Conditional booleans to control what is shown inside the modal 
const usermail = ref('')
const signingIn = ref(false)
const emailSent = ref(false)

const emit = defineEmits(['close'])

function closeModal() {
    signingIn.value = false;
    emailSent.value = false;
    usermail.value = '';
    emit('close')
}

const props = defineProps({
    showModal: Boolean
})

</script>

<template>
    <Transition name="modal">
        <div v-if="showModal" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" v-if="signingIn">
                    <p class="loading-text"><strong>Waiting for Google</strong></p>
                    <LoadingSpinner class="loading-spinner" />
                </div>
                <div v-else-if="!signingIn && !emailSent" class="modal-container">
                    <div class="button-wrapper">
                        <button class="close-button" @click="closeModal">
                            <!-- <i class="fa-solid fa-xmark fa-2x"></i> -->
                            <img src="../assets/icons/x-mark-thin.svg" alt="">
                        </button>
                    </div>
                    <div>
                        <h1>Create an account or log in</h1>
                        <p>Create a new account or log in with your Mercury account</p>
                    </div>
                    <Form @submit="emailSignIn" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
                        <FormInput name="email" type="email" label="Email" placeholder="someone@somewhere.com" />
                        <button class="submit-btn" type="submit">Next</button>
                    </Form>

                    <p style="color:black; font-size:large"><strong>or</strong></p>

                    <button class="google-btn" @click="googleSignIn">
                        <img src="../assets/google-logo.svg" alt="">
                        Continue with Google
                    </button>
                </div>

                <!-- Show when email log in link has been sent -->
                <div v-else class="modal-container">
                    <p class="loading-text">An email has been sent to: <br><br>
                        {{ usermail }}
                    </p>
                    <button @click="closeModal" class="close-btn">Close</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
$myblue :#3c6ef7;
$cancel: #F93154;

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

.close-btn {
    min-width: 9vw;
    min-height: 5vh;
    margin: 10px;
    border-radius: 2px;
    background: none;
    border: 1px solid gray;
    font-family: 'Raleway', sans-serif;
    font-size: medium;

    transition: all 100ms ease-in-out;
    cursor: pointer;

    &:hover {
        color: white;
        background-color: $cancel;
    }
}

.google-btn {
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    outline: 1px solid gray;
    background: white;
    border: none;
    outline: 1px solid lightgray;
    width: 200px;
    height: 50px;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;

    & img {
        width: 30px;
    }
}

.button-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.close-button {
    position: absolute;
    top: -10px;
    right: -10px;

    padding: 7px;
    margin: 0;
    border-radius: 50%;
    min-width: 30px;
    min-height: 30px;
    width: 1.2vw;
    height: 1.2vw;
    overflow: hidden;
    border: none;
    transition: all 150ms ease;

    &:hover {
        background-color: lightgray;
    }
}


.submit-button {
    outline: 1px solid $myblue;
    border: none;

    width: 100%;
    height: 3vh;
    border-radius: 3px;

    font-size: 1.2rem;
    color: $myblue;

    transition: all 150ms ease-in-out;
}

h1 {
    font-size: 1.7rem;
}

p {
    color: gray;
    font-size: small;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    font-family: Arial, Helvetica, sans-serif;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    max-width: 400px;
    min-height: 400px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.2s ease;
    overflow: hidden;
    border-radius: 2%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    text-align: center;

    gap: 10px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

// Styling for form
$primary-color: #0071fe;

form {
    width: 300px;
    margin: 0px auto;
    padding-bottom: 20px;
}

.submit-btn {
    background: white;

    outline: 1px solid $primary-color;
    border: none;
    color: black;
    font-size: 18px;
    padding: 10px 15px;
    display: block;
    width: 100%;
    border-radius: 7px;
    margin-top: 40px;
    transition: transform 0.3s ease-in-out, background-color 150ms ease-in-out, color 150ms ease-in-out;


    cursor: pointer;

    &:hover {
        background-color: $myblue;
        color: white;
    }
}

.submit-btn:hover {
    background-color: $primary-color;
}

.submit-btn.invalid {
    animation: shake 0.5s;
    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
}

.loading-text {
    font-size: x-large;
    color: #3c6ef7;
}

@keyframes shake {
    0% {
        transform: translate(1px, 1px);
    }

    10% {
        transform: translate(-1px, -2px);
    }

    20% {
        transform: translate(-3px, 0px);
    }

    30% {
        transform: translate(3px, 2px);
    }

    40% {
        transform: translate(1px, -1px);
    }

    50% {
        transform: translate(-1px, 2px);
    }

    60% {
        transform: translate(-3px, 1px);
    }

    70% {
        transform: translate(3px, 1px);
    }

    80% {
        transform: translate(-1px, -1px);
    }

    90% {
        transform: translate(1px, 2px);
    }

    100% {
        transform: translate(1px, -2px);
    }
}
</style>