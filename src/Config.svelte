<script>
// imports
    import App from './App.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let maxProblems = 10;
    let operator = 'all';
    let localDifficulty = '10';

    let generateProblems = () => {
        let arr = [];
        let operators;

        switch(operator)
        {
            case 'all':
                operators = ['*','/'];
                break;
            case 'multiplication':
                operators = ['*'];
                break;
            case 'division':
                operators = ['/'];
                break;
        }

        for(let i = 0; i < maxProblems; i++)
        {
            let id = i+1;
            let l = Math.abs(Math.floor(Math.random() * parseInt(localDifficulty, 10)));
            let r = Math.abs(Math.floor(Math.random() * l) - 1);
            let op = operators[Math.floor(Math.random() * operators.length)]
            let a = Math.round(eval(`${l}${op}${r}`) * 100) / 100;
            a = a === Infinity ? 0 : a;
            arr.push({id, op, l, r, a});
        }
        dispatch('updateConfig', {
            problems: arr,
            difficulty: localDifficulty
        });
    }
</script>

<div>
    <label>Difficulty</label>
    <select bind:value={localDifficulty}>
        <option value="10">1</option>
        <option value="100">2</option>
        <option value="1000">3</option>
    </select>
    <label>Operand</label>
    <select bind:value={operator}>
        <option value="all">Mixed</option>
        <option value="division">Division</option>
        <option value="multiplication">Multiplication</option>
    </select>
    <label>Problems to Generate</label>
    <input type="number" name="maxProblems" bind:value={maxProblems} />
</div>
<button on:click={generateProblems} disabled={!maxProblems}>Start</button>