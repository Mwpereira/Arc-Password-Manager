<template>
    <div class="autoGenPassForm">
        <form @submit.prevent="generatePassword">
            <span>
                <label>Suggested Password:</label>
                <label autofocus class="password" type="text" />
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
                    id="cbAd"
                    value="Enabled"
                    v-model="ckSpecialChars"
                    checked="true"
                />
                <label for="cbLength" id="lblLength">Enabled</label>
            </span>
            <span>
                <input class="action-btn" type="submit" value="Refresh" @click="generatePassword" />
                <input class="action-btn" type="submit" value="Cancel" @click="cancel" />
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
            var retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
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
    },
    mounted() {
        this.generatePassword();
    },
};
</script>

<style scoped>
div {
    position: relative;
    height: 100%;
    width: 100%;
    margin-top: 1rem;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
}

span {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    align-items: center;
    justify-content: flex-end;
}

h1 {
    color: black;
}

label {
    font-size: 24px;
    cursor: default;
    margin-right: 1rem;
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
    height: auto;
    width: 38rem;
    background-color: rgb(229, 229, 229);
}

.slidecontainer {
    width: 25%;
    margin-top: 3rem;
    margin-left: 2rem;
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
</style>
