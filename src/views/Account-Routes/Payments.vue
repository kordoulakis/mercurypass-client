<template>
    <div class="container">
        <div class="history">
            <router-link to="/account">
                <p>About</p>
            </router-link>
            <p> > Payments </p>
        </div>

        <div class="route">Payments</div>

        <div class="cards-container">
            <div class="card">
                <div class="details">
                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="">
                    <p>4302*** **** 4004</p>
                </div>

                <button @click="editCard" class="edit-button"><i class="fa-solid fa-ellipsis fa-xl"></i></button>

            </div>
            <div class="card">
                <div class="details">
                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt="">
                    <p>4302*** **** 4004</p>
                </div>

                <button @click="editCard" class="edit-button"><i class="fa-solid fa-ellipsis fa-xl"></i></button>
            </div>
        </div>
        <div class="btn-wrapper">
            <button @click="addCard" class="btn-add-card">
                Add a new card
            </button>
        </div>

    </div>

</template>


<script setup>
function editCard() {
    alert("oh no, you can't edit cards yet")
}
function addCard() {
    alert("oh no, you can't add cards yet")
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
$brand-blue :#3c6ef7;
$brand-blue-hover :#4b7afa;

.btn-wrapper {
    margin: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.btn-add-card {
    min-width: 10vw;
    min-height: 5vh;

    background-color: $brand-blue;
    color: white;
    font-size: large;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: $brand-blue-hover;
    }
}

.edit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 2vw;
    height: 2vw;
    border: none;

    &:hover {
        background-color: rgb(204, 204, 204);
    }
}


.details {
    display: flex;
    align-content: center;
    align-items: center;

    & p {
        font-size: 1.25rem;
    }
}

.card {
    display: flex;
    margin: 20px;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    font-family: 'Roboto', sans-serif;
}

.cards-container {
    display: flex;
    flex-direction: column;
}

p {
    margin: 5px;
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

.route {
    margin: 20px 0px 20px 0px;
    font-size: 3rem;
    text-decoration: underline $brand-blue;
    text-underline-offset: 1rem;
}

.history {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: flex-start;

}

.container {
    display: flex;
    flex-direction: column;
    padding: 0 25vw 0 25vw;
    margin: 0;
    min-height: 100vh;

    font-family: 'Raleway', sans-serif;
}

@media (max-width:600px) {
    .container {
        justify-content: flex-start;
        padding: 10px;
    }

    .card {
        width: 100%;
        margin: 10px 0 0 0;
    }
}
</style>