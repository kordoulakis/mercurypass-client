<template>
    <footer>
        <div class="items">
            <img src="../assets/logo.svg" alt="">
            <div class="column">
                <h1 style="font-size: 1em">Made with</h1>
                <a style="color: green" target="_blank" href="https://vuejs.org/"><i class="fa-brands fa-vuejs"></i>
                    Vue3</a>
                <a target="_blank" href="https://firebase.google.com/"><i class="fa-brands fa-google icon"></i>
                    Firebase</a>
                <a target="_blank" href="https://nodejs.org/en/"><i class="fa-brands fa-node"></i> Node</a>
                <a target="_blank" href="https://fontawesome.com/"><i class="fa-brands fa-font-awesome"></i> Font
                    Awesome</a>
                <a target="_blank" href="https://aws.amazon.com/"><i class="fa-brands fa-aws"></i> AWS</a>
            </div>
            <div class="brands">
                <h1>Social</h1>
                <div class="row">
                    <i class="fa-brands fa-facebook icon"></i>
                    <i class="fa-brands fa-twitter icon"></i>
                    <i class="fa-brands fa-google icon"></i>
                    <i class="fa-brands fa-instagram icon"></i>
                    <i class="fa-brands fa-linkedin icon "></i>
                    <a target="_blank" href=""><i class="fa-brands fa-github icon"></i></a>
                </div>
            </div>
            <div class="links">
                <h1>Links</h1>
                <a href="/">Mercury Pass</a>
                <a href="/countries">Countries</a>
                <a href="/news">News</a>
                <a href="/about">About Us</a>
            </div>
        </div>
        <p>Copyright &copy; Ilias Kordoulas 2022</p>
    </footer>
</template>

<style scoped>
.links {
    display: flex;
    flex-direction: column;

    text-decoration: underline 2px black;
}

.column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    font-size: 1.3em;
}

p {
    margin: 0;
}

a {
    text-decoration: none;
    color: black;
    padding: 0;
    margin: 0;
}

.icon {
    cursor: pointer;
}

.row {
    display: flex;
    align-items: center;
    font-size: 30px;
    gap: 15px;
}

.brands {
    display: flex;
    flex-direction: column;
}

.items {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 80%;
}

img {
    width: 100px;
}

footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    background-color: rgb(238, 238, 238);
    padding: 0 20px 0 20px;
}
</style>