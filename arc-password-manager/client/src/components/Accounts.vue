<template>
    <div class="accounts">
        <ul class="list-accounts">
            <li>
                <h2>Accounts</h2>
            </li>
            <li>
                <h2>Instagram</h2>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Accounts",
    props: ["mode"],
    data: () => {
        return {
            p: "",
        };
    },
    methods: {
        loadAccounts() {
            if (sessionStorage.getItem("accounts") == undefined) {
                /* try{

                }
                catch{

                }*/
            } else {
                //  let accounts = sessionStorage.getItem('accounts');
            }
            this.displayAccounts();
        },
        displayAccounts() {},
    },
    mounted() {
        //this.loadAccounts();
    },
};
</script>

<style scoped>
h2 {
    font-family: "Varela Round", sans-serif;
    color: black;
    text-align: center;
    margin-top: 1rem;
}

.accounts {
    width: 40vh;
}

.list-accounts {
    display: flexbox;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    height: 90vh;
    width: 40vh;
    background-color: white;
}
</style>
