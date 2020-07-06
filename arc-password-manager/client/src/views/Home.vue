<template>
    <div class="home">
        <keep-alive>
            <Accounts />
        </keep-alive>
        <span>
            <span class="buttons">
                <input
                    @click="component = 'AddForm'"
                    id="addAccount"
                    class="main-btn"
                    type="submit"
                    value="+ Add Account"
                />
                <input
                    @click="component = 'AutoGenPass'"
                    id="autoGenPass"
                    class="main-btn"
                    type="submit"
                    value="+ Auto Generate Password"
                />
            </span>
            <component @eventname="clearComponent" :is="component"></component>
        </span>
    </div>
</template>

<script>
import Accounts from "@/components/Accounts";
import AddForm from "@/components/AddForm";
import AutoGenPass from "@/components/AutoGeneratePassword";

export default {
    name: "Home",
    components: { Accounts, AddForm, AutoGenPass },
    data: () => {
        return {
            component: "",
        };
    },
    methods: {
        clearComponent() {
            this.component = "";
        },
    },
    mounted() {},
};
</script>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
}

span {
    justify-content: flex-start;
    width: 60vh;
}

.buttons {
    display: flex;
    flex-direction: row;
}

#addAccount {
    cursor: pointer;
    margin-top: 1.5rem;
    margin-left: 1rem;
}

#autoGenPass {
    cursor: pointer;
    margin-top: 1.5rem;
    margin-left: 1rem;
    width: 18rem;
}
</style>
