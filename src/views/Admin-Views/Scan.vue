<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { api_global } from '../../services/api';
import { useAuth } from '../../stores/authentication';

const passToScan = ref()
const authStore = useAuth()

async function scanPass() {
    if (!passToScan.value) {
        alert('Invalid pass id')
        return;
    }

    const api = api_global + 'scan/' + passToScan.value
    console.log(api)
    const config = {
        headers: {
            token: authStore.getUser.accessToken
        }
    };

    await axios.post(api, {}, config)
    alert('Scanned: ' + passToScan.value)
}
</script>

<template>
    <div class="scan-container">
        <h1>Scan a pass</h1>
        <form class="inputForm" @submit.prevent="scanPass" action="submit">
            <input class="input" v-model="passToScan" type="text" placeholder="enter pass id">
        </form>
        <button @click="scanPass" class="scan-btn">SCAN</button>
    </div>
</template>

<style scoped lang="scss">
$brand-blue :#3c6ef7;

.test {
    display: flex;
    flex-direction: column;
}

.scan-btn {
    width: 10vw;
    height: 5vh;
    min-width: 100px;
    min-height: 50px;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    background-color: #3c6ef7;
    color: white;
    border: none;
    box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    transition: all 300ms ease;
    border-radius: 5px;

    &:hover {
        box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
    }
}

.editable {
    width: 100%;
    transition: all 100ms ease;
}

.inputForm {
    width: 100%;
    margin: 0;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input {
    width: 50%;
    height: 5vh;
    resize: none;
    font-size: medium;
    font-weight: bold;
    overflow: hidden;
    transition: all 200ms ease;
    color: black;

    border-radius: 10px;
    text-align: center;
}

::placeholder {
    text-align: center;
    font-weight: 100;
}

.rotating {
    transition: all 300ms ease;
}

.scan-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-family: 'Raleway', sans-serif;
    gap: 3vh;
}
</style>