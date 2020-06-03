<template>
  <div class="settings">
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
      <span>
        <h3 id="themeHeader">Theme:</h3>
        <input type="checkbox" id="cbDarkMode" v-model="cbDarkMode" />
        <div class="toggle"></div>
        <div class="names">
          <p class="light">Light</p>
          <p class="dark">Dark</p>
        </div>
      </span>
      <input class="action-btn" id="save" type="submit" value="Save" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Settings",
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
        this.themeValue = true;
      } else {
        darkModeValue.checked = false;
        this.themeValue = false;
      }
    },
    saveSettings() {
      let salt = this.saltLevel;
      let adEnabled = this.ckAdEnabled;
      let darkMode = this.themeValue;

      localStorage.setItem("salt", salt);
      localStorage.setItem("adEnabled", adEnabled);
      localStorage.setItem("darkMode", darkMode);
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
  margin-top: 3rem;
}

#lblAd {
  margin-left: 1rem;
  margin-bottom: 0.1rem;
  align-self: flex-end;
}

#themeHeader {
  font-size: 22px;
  margin-top: 3rem;
  margin-left: 3rem;
  cursor: default;
}
</style>