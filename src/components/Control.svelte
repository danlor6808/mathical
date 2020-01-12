<script>
	import { problems, difficulty } from '../stores.js';
	import { randomSelect, randomNumberBetween } from '../helpers.js';
	import { onMount } from 'svelte';
    import Report from './Report.svelte';

	let totalProblems = $problems.length;
	let progress = 0;
	let correct = 0;
    let incorrect = 0;
    let userInput = [];
	let selected = undefined;
	let answer = undefined;
	let maxAnswers = 4;
	let answers = [];

	$: problemsFinished = totalProblems - progress;

	let next = () => {
		if (eval(selected) === answer) 
		{
			correct += 1;
		}
		else {
            incorrect += 1;
        }
        userInput = [
            ...userInput, 
            {
                id: $problems[progress].id, 
                answer: eval(selected), 
            }
        ];
		progress += 1;
		selected = undefined;
		generateAnswers();
	};

	let selectAnswer = (e) => {
		selected = e.target.value;
	}

	let generateAnswers = () => {
		let inputs = document.querySelector('input[name="answer"]:checked');
		if (inputs) inputs.checked = false; // resets radio buttons
		let problem = $problems[progress];
		let tempArr = [];
		if (problem) {
            answer = problem.a;
			tempArr.push(answer);
			for (let i = 0; i < maxAnswers - 1; i++)
			{
				let randomNumber;
				let bool = false;
				let op = ['-','+'];
				while (!bool)
				{
					randomNumber = Math.abs(eval(`${answer}${randomSelect(op)}${randomNumberBetween(1, 2)}`));
					if (randomNumber % 1 !== 0) randomNumber = eval(randomNumber.toFixed(2));
                    if (answer % 1 == 0) randomNumber = Math.floor(randomNumber);
					if (!tempArr.includes(randomNumber)) bool = true;
                }
                if (randomNumber === Infinity) randomNumber = 0;
				tempArr.push(randomNumber);
			}

			for (let i = tempArr.length - 1; i > 0; i--)
			{
				const j = Math.round(Math.random() * i);
				const temp = tempArr[i];
				tempArr[i] = tempArr[j];
				tempArr[j] = temp;
			}
			answers = tempArr;
		}
	}

    let startOver = () => {
		problems.reset();
		difficulty.reset();
    }

	// init
	onMount(() => {
		generateAnswers();
	})

</script>

<div>
	{#if totalProblems >= (progress + 1)}
		<div>
			<div class="problem">
				{$problems[progress].l} {$problems[progress].op} {$problems[progress].r}
			</div>
            <sub><p>{problemsFinished} out of {totalProblems} problems left</p></sub>
			<div class="answers">
			{#each answers as answer}
				<label>
					<input type="radio" name="answer" value={answer} on:click={selectAnswer} checked={false} />
					{answer}
				</label>
			{/each}
			</div>
		</div>

		<button on:click={next} disabled={!selected}>Next</button>
	{:else}
		<div>
			<h2>{Math.round(correct/totalProblems*100)}%</h2>
			<h3> You're finished!</h3>
			<p><span class="success">{correct}</span> out of {totalProblems} questions answered correctly</p>
            <Report problems={$problems} input={userInput} />
		</div>
		<button on:click={startOver}>Start Over</button>
	{/if}
</div>

<style>
    .problem {
        font-size: 1.5em;
    }
    .answers{
        column-count: 2;
    }
	.success {
		color: green;
	}
    button {
        margin-top: 15px;
    }
</style>