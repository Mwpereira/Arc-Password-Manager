<template>
        <div class="settings">
            <form>
                <span class="encryptionType">
                <h2>Encrption Type:</h2>
                <select name="encryptions" id="lbET" @click="setEncryptionType('AES')">
                    <option value="AES">AES</option>
                    <option value="DES">DES</option>
                    <option value="TripleDES">TripleDES</option>
                    <option value="Rabbit">Rabbit</option>
                </select>
                </span>
                <label id="lblDefault"> Default: AES</label>
                <span class="arcSlides">
                    <h2>Arc Startup Slides:</h2>
                    <input type="checkbox" id="cbSlides" value="Enabled" v-model="ckSlidesEnabled" />
                    <label for="cbSlides" id="lblSlides">Enabled</label>
                </span>
                <span class="darkMode">
                    <h2>Dark Mode:</h2>
                    <Toggle
                        @toggle="toggle"
                        value="Enabled"
                        v-model="cbDarkMode"
                    />
                </span>
                <span class="buttons">
                    <input
                        class="main-btn"
                        id="formBtns"
                        type="submit"
                        value="Save"
                        v-on:click="saveSettings"
                    />
                    <input
                        class="main-btn"
                        id="formBtns"
                        type="submit"
                        value="Cancel"
                        v-on:click="loadSettings"
                    />
                </span>
            </form>
        </div>
</template>

<script>
import Toggle from "@/components/Toggle";

export default {
    name: "Settings",
    components: {
        Toggle,
    },
    data: () => {
        return {
            encryptionType: "",
            ckSlidesEnabled: "",
            cbDarkMode: "",
        };
    },
    methods: {
        loadSettings() {
            let encryptionType = localStorage.getItem("encryptionType");
            let ckSlidesEnabled = localStorage.getItem("slidesEnabled");
            let darkMode = localStorage.getItem("darkMode");

           // let encryptionTypeValue = document.getElementById("encryptionType");
            let checkedValue = document.getElementById("cbSlides");
            let darkModeValue = document.getElementById("cbDarkMode");

            this.encryptionType = encryptionType;

            console.log(document.getElementsByTagName('input')[0].value);


            if(encryptionType == "AES"){
                document.getElementsByTagName('input')[0].focus();
            }
            
            document.getElementsByTagName('input')[0].focus();

            if (ckSlidesEnabled == "true") {
                checkedValue.checked = true;
                this.ckSlidesEnabled = true;
                this.checkedValue = true;
            } else {
                checkedValue.checked = false;
                this.ckSlidesEnabled = false;
                this.checkedValue = false;
            }

            if (darkMode == "dark") {
                darkModeValue.checked = "dark";
                this.mode = "dark";
            } else {
                darkModeValue.checked = "light";
                this.mode = "light";
            }
        },
        saveSettings() {
            let encryptionType = this.encryptionType;
            let ckSlidesEnabled = this.ckSlidesEnabled;
            let darkMode = this.mode;

            if (encryptionType != undefined) {
                localStorage.setItem("encryptionType", encryptionType);
            }

            if (ckSlidesEnabled != undefined) {
                localStorage.setItem("slidesEnabled", ckSlidesEnabled);
            }

            if (darkMode != undefined) {
                localStorage.setItem("darkMode", darkMode);
            }
        },
        setEncryptionType(type){
            this.encryptionType = type;
        },
        toggle() {
            if (this.mode === "dark") {
                this.mode = "light";
            } else {
                this.mode = "dark";
            }
            this.$emit("toggle");
        },
    },
    mounted() {
        this.loadSettings();
    },
};
</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
    margin-left: 5rem;
}

h2{
    margin-bottom: 1rem;
}

select{
    font-size: 20px;
}

span{
    margin-top: 4rem;
}

label {
    font-size: 20px;
}

p {
    font-size: 20px;
    cursor: default;
}

.encryptionType{
    display: flex;
    flex-direction: row;
}

.arcSlides {
    display: flex;
    flex-direction: row;
}

.darkMode{
    display: flex;
    flex-direction: row;
    margin-right: 1rem;
}

.main-btn{
	color: black;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 125px;
	height: 40px;
	outline: none;
	font-size: large;
	font-weight: 550;
	margin: 5px;
	cursor: pointer;
    background-color: aliceblue;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.main-btn:hover{
    background-color: azure;
}

.main-btn:active{
    background-color: ivory;
}

#lbET{
    margin-left: 1rem;
    margin-top: 0.15rem;
    margin-bottom: 1rem;
    width: 7.5rem;
}

#lblDefault{
    font-size: 20px;
    font-style: italic;
}

#cbSlides{
    margin-top: 0.5rem;
    margin-left: 1rem;
    margin-right: 0.5rem;
}

#lblSlides{
    margin-top: 0.1rem;
}

#formBtns{
    background-color: white;
    width: 175px;
    height: 50px;
}
</style>
