<template>
        <div class="settings">
            <form>
                <span class="encryptionType">
                <h2>Encrption Type:</h2>
                <select name="encryptions" id="lbET" @click="setEncryptionType()">
                    <option value="AES">AES</option>
                    <option value="DES">DES</option>
                    <option value="TripleDES">TripleDES</option>
                    <option value="Rabbit">Rabbit</option>
                </select>
                </span>
                <label id="lblDefault">Default: AES</label>
                <label id="lblDefault">Requires A Longer Save Time To Convert Your Already Saved Data</label>
                <span class="arcSlides">
                    <h2>Arc Startup Slides:</h2>
                    <input type="checkbox" id="cbSlides" value="Enabled" v-model="ckSlidesEnabled" />
                    <label for="cbSlides" id="lblSlides">Enabled</label>
                </span>
                <span class="dAD">
                    <h2 id="lbldAD">Delete All Arc Data</h2>
                    <input class="main-btn" id="deleteBtn" type="button" value="Delete Data" @click="deleteArcData"/>
                </span>
                <label id="lblDefault">Action Cannot Be Undone - App Will Exit</label>
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
import store from "@/store";

export default {
    name: "Settings",
    data: () => {
        return {
            encryptionType: "",
            ckSlidesEnabled: "",
        };
    },
    methods: {
        deleteArcData(){
            localStorage.clear();
            const remote = require('electron').remote
            let w = remote.getCurrentWindow()
            w.close()
        },
        loadSettings() {
            let encryptionType = store.getters.encryptionType;
            let ckSlidesEnabled = store.getters.slidesEnabled;
            let checkedValue = document.getElementById("cbSlides");

            this.encryptionType = encryptionType;
            document.getElementById('lbET').value = encryptionType;
/*
            if(this.encryptionType != encryptionType){
                this.convertEncryptions();
            }
*/
            if (ckSlidesEnabled == "true") {
                checkedValue.checked = true;
                this.ckSlidesEnabled = true;
                this.checkedValue = true;
            } else {
                checkedValue.checked = false;
                this.ckSlidesEnabled = false;
                this.checkedValue = false;
            }
        },
        saveSettings() {
            let encryptionType = this.encryptionType;
            let ckSlidesEnabled = this.ckSlidesEnabled;

            if (encryptionType != undefined) {
                localStorage.setItem("encryptionType", encryptionType);
            }

            if (ckSlidesEnabled != undefined) {
                localStorage.setItem("slidesEnabled", ckSlidesEnabled);
            }
        },
        setEncryptionType(){
            var e = document.getElementById("lbET");
            var type = e.options[e.selectedIndex].text;
            if(this.encryptionType != type){
                this.encryptionType = type;
            }
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

.dAD{
    display: flex;
    flex-direction: row;
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
    background-color: white;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#lbldAD{
    margin-top: 0.5rem;
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

#deleteBtn{
    margin-left: 1rem;
    height: 30px;
}

#formBtns{
    background-color: white;
    width: 175px;
    height: 50px;
}
</style>
