<template>
  <div class="settings">
    <Toggle :mode="mode" @toggle="$emit('toggle')" />
    <form @submit.prevent="saveSettings">
      <span class="salt">
        <h3 id="saltHeader">Salt Level:</h3>
        <input class="input-bar" id="salt" type="number" min="1" max="20" v-model="saltLevel" />
      </span>
      <p style="margin-left: 3rem; margin-top: 1rem;">
        - Scale: 1-20
        <br />- Default/Recommended: 10
        <br />- Higher Salt Level = Greater Security & Longer Encryption Time
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
            <input type="checkbox" id="cbDarkMode" value="Enabled" v-model="cbDarkMode" :checked="(mode === 'dark') ? 'checked' : false" 
            @change="$emit('toggle')" />
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
  props: ['mode'],
  data: () => {
    return {
      salt: 10,
      adEnabled: "",
      darkMode: ""
    };
  },
  methods: {
    loadSettings() {
      let salt = localStorage.getItem("salt");
      let adEnabled = localStorage.getItem("adEnabled");
      let darkMode = localStorage.getItem("darkMode");

      let saltValue = document.getElementById("salt");
      let checkedValue = document.getElementById("cbAd");
      let darkModeValue = document.getElementById("cbDarkMode");

      saltValue.value = salt;
      this.saltLevel = salt;

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

      localStorage.setItem("salt", salt);

      if(adEnabled != undefined){
        localStorage.setItem("adEnabled", adEnabled);
      }
    }
  },
  mounted() {
    this.loadSettings();
  }
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

.darkmode{
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
  margin-top: 2.5rem;
  margin-left: 3rem;
  color: black;
  opacity: 1
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

#cbDarkMode{
  cursor: pointer;
  justify-self: center;
  align-self: center;
  margin-left: 2rem;
  margin-top: 5rem;
}

.toggle{
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-top: 2.85rem;
    margin-left: 2rem;
}

.toggle input{
    opacity: 0;
    width: 0;
    height: 0;
}

.toggler{
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

.toggler:before{
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

input:checked + .toggler{
    background: #15202B;
}

input:focus + toggler{
    box-shadow: 0 0 2px #15202B;
}

input:checked + .toggler:before{
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.toggler.round{
    border-radius: 34px;
}

.toggler.round:before{
    border-radius: 50%;
}


.dark header {
  background: #15202B;
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
  background: #B0B0B0;
}
.dark header nav .nav-link:hover {
  background: #101520;
}
</style>