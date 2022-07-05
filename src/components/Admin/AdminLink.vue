<script setup>
const emit = defineEmits(['clicked'])

const props = defineProps({
    icon: String,
    name: String,
})
</script>

<template>
    <div @click="$emit('clicked')" class="info">
        <i :class="'fa-' + icon" class="fa-solid fa-lg"></i>
        <p class="name">{{ name }}</p>
    </div>
</template>

<style scoped lang="scss">
$sidebar-item-hover: #5369e9;

.Big {
    font-size: large;
}

.info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-family: 'Raleway', sans-serif;
    color: black;
    padding-left: 10px;
    border-bottom: 1px solid black;
    background-color: none;

    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
        background-color: $sidebar-item-hover;
        color: white;
    }
}

.name {
    font-size: medium;
    font-weight: bold;
}
</style>