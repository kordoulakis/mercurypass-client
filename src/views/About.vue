<template>
    <section class="info">
        <div class="container">
            <div class="content">
                <div class="text">
                    <h1>About Us</h1>
                    <p>We are a young startup based in Greece.
                        A team comprised of students that look forward to a brighter future for everyone.
                    </p>
                </div>
                <div class="side-image">
                    <img src="../assets/santorini-2-color-pr_generated.jpg" alt="About Us image">
                    <a target="_" href="https://www.vecteezy.com/free-vector/greece">Greece Vectors by Vecteezy</a>
                </div>
            </div>
        </div>
    </section>

    <section class="mission">
        <div class="container">
            <div class="content-2">
                <div class="side-image">
                    <img src="../assets/vecteezy_announce-future-business-earnings-and-targets_.jpg"
                        alt="About Us image">
                    <a target="_" href="https://www.vecteezy.com/free-vector/public-transport">Public Transport Vectors
                        by Vecteezy</a>
                </div>
                <div class="text">
                    <h1>Our Mission</h1>
                    <p>
                        Creating a simple, unified and seamless way to use public transport across the whole of the
                        European Union.<br>
                        Every Country, even every city structures its public transport in different ways. <br>
                        When travelling you need to research all the different ways you'll have to pay and use your
                        tickets. <br>
                        Mercury Pass aims to make this process a distant memory. <br>
                        In time, with the support of the various Countries of Europe, you will be using the Mercury
                        Platform to fill all your public transport needs.
                    </p>
                </div>
            </div>

        </div>
    </section>
    <Contact />

</template>

<script setup>
import Contact from '../components/Contact.vue';
</script>

<style scoped lang="scss">
section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5em 2em;
    /* height: 100vh; */
}

a {
    text-decoration: none;
    color: black;
}

h1 {
    font-size: 2em;
}

.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.info {
    font-family: 'Lato', sans-serif;
}

.info h1 {
    font-size: 4em;
}

.mission h1 {
    font-size: 4em;
}

.mission {
    font-family: 'Lato', sans-serif;
}

.contact {
    font-family: Arial, Helvetica, sans-serif;
}

.content-2 {
    @extend .content;
}

.container .content {
    margin-left: 20%;
    margin-right: 20%;
}

.container .content {
    display: flex;
    flex-direction: row;
    gap: 5em;
}

.text {
    font-size: 1.2em;
}

.side-image img {
    max-width: 100%;
    overflow: hidden;
    border-radius: 10px;
}


.members {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}

.cards {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cards .members-card {
    border-radius: 1em;
    margin: 0 1em 0em 1em;
}

.members .container .heading {
    display: flex;
    justify-content: center;
}

.members-card {
    position: relative;
    width: 50%;
}

.image {
    display: block;
    width: 100%;
    border-radius: 1em;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.7em;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.25s;
    border-radius: 1em;
}

.overlay:hover {
    opacity: 1;
}

@media (max-width: 40rem) {
    .cards {
        flex-direction: column;
    }

    .cards .members-card {
        border-radius: 1em;
        margin: 1em 0 1em 0;
    }

    .overlay {
        font-size: 1em;
    }

}

@media (max-width: 60rem) {
    .overlay {
        font-size: 1.5em;
    }

    .container .content {
        flex-direction: column;
        font-size: .8em;
    }


    .info .heading {
        margin-bottom: 0;
    }

}

@media (max-width: 20rem) {
    .overlay {
        font-size: 0.7em;
    }
}

@media (max-width: 600px) {
    .side-image img {
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
    }

    .mission {
        padding: 0;
    }

    .content {
        margin: 0 !important;
    }

    .mission {
        padding: 0;
    }

    .info {
        margin: 0;
        padding: 0;
    }

    .text {
        padding: 10px;
    }

    .content-2 {
        @extend .content;
        flex-direction: column-reverse !important;
    }
}
</style>