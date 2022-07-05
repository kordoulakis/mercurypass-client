<script setup>
import axios from 'axios';
import { Form } from 'vee-validate';
import * as Yup from "yup";
import FormInput from '../components/FormInput.vue';

import { api_global } from '../services/api';

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    message: Yup.string().required()
});

async function sendMessage() {
    const mapi = api_global + 'messages/new'
    console.log(mapi)
    const payload = {
        headers: {
            email: email.value,
            message: message.value
        }
    };
    await axios.post(mapi, {}, payload)
    alert("Message sent")
}

</script>

<template>
    <!-- DON'T DELETE CONTAINER -->
    <div class="container">
        <h1>Contact us</h1>
        <Form class="form" @submit="sendMessage" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
            <FormInput class="email" name="email" type="email" label="Email" placeholder="Your email" />
            <FormInput :height="100" class="message" name="message" type="text" label="Message"
                placeholder="Your message to us" />
            <button type="submit">
                <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path fill="currentColor"
                                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
                            </path>
                        </svg>
                    </div>
                </div>
                <span>Send</span>
            </button>
        </Form>
    </div>
</template>

<style scoped lang="scss">
$brand-dark: #2b2b2b;

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 30%;
    font-family: 'Raleway', sans-serif;
    background-color: rgba(65, 65, 65, 0.05);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 10px 2px rgba(12, 12, 12, 0.2);
}



.email {
    width: 40%;
}

.message {
    width: 70%;
}

button {
    font-family: inherit;
    font-size: 20px;
    background: royalblue;
    color: white;
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
    align-self: flex-end;
    position: absolute;
}

button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
}

button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
}

button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
}

button:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

button:hover span {
    transform: translateX(5em);
}

button:active {
    transform: scale(0.95);
}

@keyframes fly-1 {
    from {
        transform: translateY(0.1em);
    }

    to {
        transform: translateY(-0.1em);
    }
}

.container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    width: 100vw;

    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    font-family: 'Raleway', sans-serif;
    align-self: center;
}

@media (max-width: 600px) {
    .form {
        width: 95%;
    }
}

//DON'T DELETE ABOVE
</style>