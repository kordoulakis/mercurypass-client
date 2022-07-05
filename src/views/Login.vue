<template>
    <div class="container">
        <h1>Login</h1>
        <Form class="form-container" @submit="emailSignIn" :validation-schema="schema">
            <FormInput name="email" type="email" label="Email" placeholder="someone@somewhere.com" />
            <FormInput name="password" type="password" label="Password" placeholder="**********" />
            <button class="submit-btn" type="submit">Log In</button>
        </Form>
    </div>
</template>

<script setup>
import FormInput from '../components/FormInput.vue'
import { Form } from 'vee-validate';
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'

const router = useRouter()

// refs have already been set up for email & password
// access the through email.value & password.value
async function emailSignIn() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            router.push('/admin')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

// Using yup to generate a validation schema
const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required')
});

</script>

<style scoped lang="scss">
$primary-color: #0071fe;
$myblue :#3c6ef7;
$cancel: #F93154;

.form-container {
    width: 300px;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;

    height: 100vh;

    font-family: 'Raleway', sans-serif;
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

.invalidSubmit-btn {
    background-color: $cancel;
    color: white;
}
</style>