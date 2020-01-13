<script>
    import { problems, difficulty } from '../stores.js';
	import { randomSelect, randomNumberBetween } from '../helpers.js';
    import App from './App.svelte';

    let maxProblems = 10;
    let operator = 'all';
    let _difficulty = '10';

    let generateProblems = () => {
        if (maxProblems <= 0) 
        {
            alert('Please set at least 1 problem to generate!');
            return false;
        }

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
            let l = Math.abs(Math.floor(Math.random() * parseInt(_difficulty, 10)));
            let r = Math.abs(Math.floor(Math.random() * l) - 1);
            let op = randomSelect(operators);
            let a = eval(`${l}${op}${r}`);
            a = a === Infinity ? 0 : a;
            if (a % 1 !== 0) a = eval(a.toFixed(2));
            arr.push({id, op, l, r, a});
        }
        problems.set(arr);
        difficulty.set(_difficulty);
    }
</script>

<div>
    <label>Difficulty</label>
    <select bind:value={_difficulty}>
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

<style>
    input, button, select {
        width: 100%;
        text-align: center;
    }
    select {
        text-align-last: center;
    }
    button {
        transition: all .25s ease-in-out;
    }
    button:hover {
        background: lightgray;
    }
</style>