<template>
  <div class="login">
    <h1>Arc</h1>
    <form @submit.prevent="authorizeAccount" class="validation-form">
      <input
        autofocus
        class="input-bar"
        type="text"
        placeholder="Username"
        v-model="username"
        required
      />
      <input class="input-bar" type="password" placeholder="Password" v-model="password" required />
      <input class="action-btn" type="submit" value="Login" />
      <input
        class="action-btn"
        id="loginArc-btn"
        value="Need to create an account? Sign up"
        onclick="javascript:location.href='/signup'"
      />
      <p
        style="background-color: red;"
        class="login-error-message"
        v-if="errorMessage != ''"
      >{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";

export default {
  name: "Login",
  data: () => {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async authorizeAccount() {
      let form = document.getElementsByTagName("form")[0];

      let username = form.children[0].value;
      let password = form.children[1].value;

      if (username != "" && password != "") {
        try {
          if (localStorage.getItem(username) != null) {
            if (
              await bcrypt.compare(password, localStorage.getItem(username))
            ) {
              if (localStorage.getItem("adEnabled") == "false") {
                window.location.href = "/main/home";
              } else {
                window.location.href = "/newUser";
              }
            } else {
              this.errorMessage = "Username or Password Is Incorrect";
            }
          } else {
            this.errorMessage = "Username or Password Is Incorrect";
          }
        } catch {
          this.errorMessage = "Username or Password Is Incorrect";
        }
      }
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-image: url("../assets/background900.jpg");
  height: 100%;
}

p {
  display: none;
}

@media (min-width: 900px), (min-height: 700px) {
  div {
    background-image: url("../assets/background1920.jpg");
  }
}
</style>