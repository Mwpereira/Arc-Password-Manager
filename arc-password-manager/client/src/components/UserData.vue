<template>
    <div class="userData">
    </div>
</template>

<script>
export default {
    name: "UserData",
    props: ["component"],
    data: () => {
        return {
            passwordLength: "",
            ckSpecialChars: "",
        };
    },
    methods: {
        cancel() {
            this.$emit("clearComponent");
        },
    },
    mounted() {
    },
};
</script>

<style scoped>
span {
    padding: 2vh;
    margin-left: -2.2%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

h1 {
    color: black;
}

label {
    font-size: 22px;
    cursor: default;
    margin-right: 0.5rem;
    margin-top: -0.5rem;
    width: auto;
}

p {
    font-size: 20px;
    cursor: default;
}

input {
    background-color: white;
    color: black;
}

form{
    margin-top: 1rem;
}

#spanPassword {
    align-content: flex-start;
}

#cbSC {
    margin-right: 0.5rem;
    cursor: pointer;
}
</style>
