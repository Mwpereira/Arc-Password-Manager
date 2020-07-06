<template>
    <div class="autoGenPassForm">
        <form @submit.prevent="generatePassword">
            <span id="password">
                <label>Suggested Password:</label>
                <label id="password" class="password" type="text" />
            </span>
            <span>
                <label>Length:</label>
                <div @submit.prevent="updateLength" class="slidecontainer">
                    <input
                        type="range"
                        min="9"
                        max="16"
                        class="slider"
                        id="passwordLength"
                        v-model="passwordLength"
                        v-on:input="updateLength"
                    />
                </div>
                <p type="number" id="length">9</p>
            </span>
            <span>
                <label>Special Characters:</label>
                <input
                    type="checkbox"
                    id="cbSC"
                    value="Enabled"
                    v-model="ckSpecialChars"
                    checked="true"
                />
                <label for="cbLength" id="lblLength">Enabled</label>
            </span>
            <span>
                <input class="action-btn" type="submit" value="Refresh" @click="generatePassword" />
                <input class="action-btn" type="submit" value="Cancel" @click="cancel" />
                <img class="cTCB" src="../assets/clipboard.png" v-on:click="copyToClipBoard()" />
            </span>
        </form>
    </div>
</template>

<script>
export default {
    name: "AutoGenPass",
    props: ["component"],
    data: () => {
        return {
            passwordLength: "",
            ckSpecialChars: "",
        };
    },
    methods: {
        cancel() {
            this.$emit("eventname");
        },
        randomPassword(len, specialChars) {
            var length = len;
            var charset;
            if (specialChars == true) {
                charset =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*./'";
            } else {
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            }
            var pass = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                pass += charset.charAt(Math.floor(Math.random() * n));
            }
            return pass;
        },
        generatePassword() {
            let length = this.passwordLength; //document.getElementsById("length");
            let specialChars = this.ckSpecialChars; // document.getElementById("cbLength");

            let p = this.randomPassword(length, specialChars);

            var lblPassword = document.getElementsByTagName("label");
            lblPassword[1].innerText = p;
        },
        updateLength() {
            var slider = document.getElementById("passwordLength");
            var output = document.getElementById("length");

            slider.oninput = function() {
                output.innerHTML = this.value;
                this.passwordLength = output.innerHTML;
            };
        },
        copyToClipBoard() {
            var lblPassword = document.getElementsByTagName("label")[1];
            lblPassword.select();
            lblPassword.setSelectionRange(0, 99999);
            document.execCommand("Copy");
        },
    },
    mounted() {
        this.passwordLength = 9;
        this.ckSpecialChars = true;
        this.generatePassword();
    },
};
</script>

<style scoped>
span {
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 78vh;
}

h1 {
    color: black;
}

label {
    font-size: 24px;
    cursor: default;
    margin-right: 0.5rem;
    margin-top: -0.5rem;
}

p {
    font-size: 20px;
    cursor: default;
}

input {
    background-color: white;
    color: black;
}

.autoGenPassForm {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40%;
    width: 78vh;
    margin-left: 1rem;
    background-color: rgb(229, 229, 229);
    justify-content: center;
    position: absolute;
}

.password {
    width: 8rem;
}

.slidecontainer {
    width: 25%;
    margin-top: 0rem;
    margin-right: 2rem;
    margin-left: 0rem;
}

.slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.25s;
    transition: opacity 0.25s;
}

.slider:hover {
    opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: lightskyblue;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: indigo;
    cursor: pointer;
}

.cTCB {
    margin-top: 1rem;
    margin-left: 0.5rem;
    width: 5vh;
    height: 5vh;
    cursor: pointer;
}

#password {
    align-content: flex-start;
    background: red;
}

#cbSC {
    margin-right: 0.5rem;
    cursor: pointer;
}
</style>
