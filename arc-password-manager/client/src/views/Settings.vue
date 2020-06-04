<template>
    <div class="settings">
        <Toggle :mode="mode" @toggle="$emit('toggle')" />
        <form @submit.prevent="saveSettings">
            <span class="salt">
                <h3 id="saltHeader">Salt Level:</h3>
                <div @submit.prevent="updateSalt" class="slidecontainer">
                    <input
                        type="range"
                        min="1"
                        max="20"
                        class="slider"
                        id="saltRange"
                        v-on:click="updateSalt"
                    />
                </div>
                <p type="number" id="salt">Null</p>
            </span>
            <p style="margin-left: 3rem; margin-top: 1rem;">
                - Scale: 1-20
                <br />- Default/Recommended: 10 <br />- Higher Salt Level = Greater Security &
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

                <div class="toggle-wrapper">
                    <label class="toggle">
                        <input
                            type="checkbox"
                            id="cbDarkMode"
                            value="Enabled"
                            v-model="cbDarkMode"
                            :checked="mode === 'dark' ? 'checked' : false"
                            @change="$emit('toggle')"
                        />
                        <span class="toggler round"></span>
                    </label>
                </div>
            </span>

            <input class="main-btn" id="save" type="submit" value="Save" />
        </form>
    </div>
</template>

<script>
export default {
    name: "Settings",
    props: ["mode"],
    data: () => {
        return {
            saltLevel: 10,
            adEnabled: "",
            darkMode: "",
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

            output.innerHTML = slider.value; // Display the default slider value

            if (adEnabled == "true") {
                checkedValue.checked = true;
                this.checkedValue = true;
            } else {
                checkedValue.checked = false;
                this.checkedValue = false;
            }

            if (darkMode == "true") {
                darkModeValue.checked = true;
                this.darkMode = true;
            } else {
                darkModeValue.checked = false;
                this.darkMode = false;
            }
        },
        saveSettings() {
            let salt = this.saltLevel;
            let adEnabled = this.ckAdEnabled;

            if (adEnabled != undefined) {
                localStorage.setItem("salt", salt);
            }

            if (adEnabled != undefined) {
                localStorage.setItem("adEnabled", adEnabled);
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
    },
    mounted() {
        this.loadSettings();
    },
};
</script>

<style scoped>
div {
    overflow: hidden;
    height: 90%;
}

label {
    font-size: 20px;
}

p {
    font-size: 18px;
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
    margin-left: 3rem;
    color: black;
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
    margin-top: 3rem;
    margin-left: 3rem;
    cursor: default;
}

#cbDarkMode {
    cursor: pointer;
    justify-self: center;
    align-self: center;
    margin-left: 2rem;
    margin-top: 5rem;
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
    background: blue;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: blue;
    cursor: pointer;
}

.toggle {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-top: 2.85rem;
    margin-left: 2rem;
}

.toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggler {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2196f3;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.toggler:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .toggler {
    background: #15202b;
}

input:focus + toggler {
    box-shadow: 0 0 2px #15202b;
}

input:checked + .toggler:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.toggler.round {
    border-radius: 34px;
}

.toggler.round:before {
    border-radius: 50%;
}

.dark header {
    background: #15202b;
}

header h1 {
    font-size: 32px;
    text-transform: uppercase;
    font-weight: 900;
}
header nav {
    display: flex;
    height: 60px;
}
header nav .nav-link {
    display: flex;
    align-items: center;
    padding: 0px 15px;
}
header nav .nav-link:hover {
    background: #b0b0b0;
}
.dark header nav .nav-link:hover {
    background: #101520;
}
</style>
