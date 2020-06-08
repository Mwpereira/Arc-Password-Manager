<template>
    <menu>
    <div class="settings" :class="mode">
            <span class="salt">
                <h3 id="saltHeader">Salt Level:</h3>
                <div @submit.prevent="updateSalt" class="slidecontainer">
                    <input
                        type="range"
                        min="1"
                        max="20"
                        class="slider"
                        id="saltRange"
                        v-model="saltLevel"
                        v-on:input="updateSalt"
                    />
                </div>
                <p type="number" id="salt">Null</p>
            </span>
            <p style="margin-left: 3rem; margin-top: 1rem;">
                Scale: 1-20
                <br />Default/Recommended: 10 <br />Higher Salt Level = Greater Security &
                Longer Encryption Time
            </p>
            <span class="arc-ad">
                <h3 id="adHeader">Arc Startup Ad:</h3>
                <input type="checkbox" id="cbAd" value="Enabled" v-model="ckAdEnabled" />
                <label for="cbAd" id="lblAd">Enabled</label>
                <br />
                <br />
            </span>
            <span class="darkmode">
                <h3 id="themeHeader">Dark Mode:</h3>
                <Toggle :mode="mode" @toggle="toggle" id="cbDarkMode" value="Enabled" v-model="cbDarkMode"/>
            </span>
            <span class="buttons">
            <input class="main-btn" id="save" type="submit" value="Save" v-on:click="saveSettings" />
            <input class="main-btn" id="cancel" type="submit" value="Cancel" v-on:click="loadSettings" />
        </span>  
    </div>
    </menu>
</template>

<script>
import Toggle from '@/components/Toggle';

export default {
    name: "Settings",
    props: ["mode"],
    components: {
        Toggle
    },
    data: () => {
        return {
            mode: "",
            saltLevel: "",
            adEnabled: "",
        };
    },
    methods: {
        loadSettings() {
            var slider = document.getElementById("saltRange");
            var output = document.getElementById("salt");

            let salt = localStorage.getItem("salt");
            let adEnabled = localStorage.getItem("adEnabled");
            let darkMode = localStorage.getItem("darkMode");

            let saltValue = document.getElementById("salt");
            let checkedValue = document.getElementById("cbAd");
            let darkModeValue = document.getElementById("cbDarkMode");

            saltValue.value = salt;
            this.saltLevel = salt;
            slider.value = salt;
            output.innerHTML = slider.value;
            
            if (adEnabled == "true") {
                checkedValue.checked = true;
                this.checkedValue = true;
            } else {
                checkedValue.checked = false;
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
            let salt = this.saltLevel;
            let adEnabled = this.ckAdEnabled;
            let darkMode = this.mode;

            console.log(darkMode);

            if (salt != undefined) {
                localStorage.setItem("salt", salt);
            }

            if (adEnabled != undefined) {
                localStorage.setItem("adEnabled", adEnabled);
            }

            if (darkMode != undefined){
                localStorage.setItem("darkMode", darkMode);
            }
        },
        updateSalt() {
            var slider = document.getElementById("saltRange");
            var output = document.getElementById("salt");

            slider.oninput = function() {
                output.innerHTML = this.value;
                this.saltLevel = output.innerHTML;
            };
        },  
        toggle () {
        if (this.mode === "dark") {
		this.mode = "light";
        } else {
		this.mode = "dark";
        }this.$emit('update:toggle',this.mode);
  }
    },
    mounted() {
        this.loadSettings();
    },
};
</script>

<style scoped>

menu {
  background: whitesmoke;
  color: #15202B;;
  transition: background 0.3s ease-in-out;
}
.dark menu {
  background: #15202B;
  color: white;
}

div {
    overflow: hidden;
    height: 90%;
}

label {
    font-size: 20px;
}

p {
    font-size: 20px;
    cursor: default;
}

.salt {
    display: flex;
    flex-direction: row;
}

.arc-ad {
    display: flex;
    flex-direction: row;
}

.darkmode {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 3rem;
}

.buttons{
    display: flex;
    flex-direction: row;
    align-items: center;   
    float: right;
    margin: 2rem;
}

#saltHeader {
    font-size: 22px;
    margin-top: 3rem;
    margin-left: 3rem;
    cursor: default;
}

#salt {
    align-self: center;
    width: 3rem;
    margin-top: 2.75rem;
    margin-left: 2rem;
    opacity: 1;
    font-size: 22px;
}

#save {
    float: right;
    margin: 5rem;
}

#adHeader {
    font-size: 22px;
    margin-top: 3rem;
    margin-left: 3rem;
    cursor: default;
}

#cbAd {
    cursor: pointer;
    justify-self: center;
    align-self: center;
    margin-left: 2rem;
    margin-top: 3.25rem;
}

#lblAd {
    margin-left: 1rem;
    margin-bottom: 0.05rem;
    align-self: flex-end;
}

#themeHeader {
    font-size: 22px;    
    margin-left: 3rem;
    cursor: default;
}

#cbDarkMode {
    cursor: pointer;
    justify-self: center;
    align-self: center;
    margin-left: 2rem;
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
