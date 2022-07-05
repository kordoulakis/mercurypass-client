<script setup>

import { ref, toRefs } from 'vue'
const props = defineProps({
    data: Object,
    editFunction: Function
})
const { data, editFunction } = toRefs(props)

const expanded = ref(false)

const editValue = ref()
function toggle() {
    expanded.value = !expanded.value
}

function saveAndClose() {
    editFunction.value(editValue.value);
    toggle()
}

</script>

<template>
    <div class="itemContainer">
        <div class="static">
            <div class="info">
                <p>{{ data.info }}</p>
                <p><strong>{{ data.toEdit }}</strong></p>
            </div>
            <div class="edit" @click="toggle">
                <p>edit</p>
                <div :class="{ 'rotate-180': expanded }" class="rotating">
                    <i class="fa-solid fa-angle-down fa-2xl"></i>
                </div>
            </div>
        </div>
        <div v-if="expanded" class="editable">
            <form class="inputForm" @submit.prevent="saveAndClose" action="submit">
                <input class="input" v-model="editValue" type="text" :placeholder="data.toEdit">
            </form>
            <button @click="saveAndClose" class="save">Save</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
$brand-blue :#3c6ef7;

.save {
    border-radius: 5px;
    background-color: none;
    background: none;
    border: 1px solid gray;
    width: 50%;

    transition: all 200ms ease;

    &:hover {
        color: white;
        background-color: $brand-blue;
    }
}

.editable {
    display: flex;
    width: 100%;
    transition: all 100ms ease;
    gap: 10px;
}

.inputForm {
    width: 100%;
    margin: 0;
    height: 5vh;
}

.input {
    width: 100%;
    height: 5vh;
    resize: none;
    font-size: medium;
    font-weight: bold;

    overflow: hidden;
    border: none;
    border-bottom: 1px solid $brand-blue;
    transition: all 200ms ease;
    background: transparent;

    &:focus {
        outline: 1px solid $brand-blue;
        border-radius: 5px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.13);
        background-color: white;
    }
}

.rotating {
    transition: all 300ms ease;
}

.itemContainer {
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2vw;

    min-width: 350px;
    align-items: center;
    text-align: center;

    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-family: 'Raleway', sans-serif;

    border: 1px solid rgba(128, 128, 128, 0.25);
    border-radius: 5px;
    transition: all 100ms ease;
    background-color: #8aa9ff13;
    cursor: pointer;

}

.static {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    text-align: left;
}

p {
    margin: 0;
}

.edit {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: underline black;
    cursor: pointer;
}

.rotate-180 {
    transform: rotate(180deg);
    left: 20px;
    transition: 300ms ease;
}

@media (max-width: 600px) {
    .itemContainer {
        width: 100%;
        min-width: 100%;
        padding: 0;
    }

    .static {
        width: 90%;
    }

    .editable {
        width: 90%;
    }

}

//DON'T DELETE ABOVE
</style>