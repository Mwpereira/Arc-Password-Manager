<template>
	<div class="accounts">
        <li class="list-accounts">
        <h2>Accounts</h2>
        </li>
	</div>
</template>

<script>
export default {
	name: 'Accounts',
    props: ['mode'],
	data: () => {
        return {
            p: "",
        };
    },
    methods: {
        loadAccounts(){
            if (sessionStorage.getItem('accounts') == undefined){
               /* try{

                }
                catch{

                }*/
            }
            else{
              //  let accounts = sessionStorage.getItem('accounts');
            }
            this.displayAccounts();
        },
        displayAccounts(){            
        }
    },
	mounted(){
        //this.loadAccounts();
	}
};
</script>

<style scoped>
div{
    width: 20%;
    height: 100%;
    z-index: 99;
    background-color: red;
}

h2{
    font-family: 'Varela Round', sans-serif;
    color: black;
    text-align: center;
    margin-top: 1rem;
}

.list-accounts{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    height: 100%;
    width: 100%;
    background-color: white;
}

</style>
