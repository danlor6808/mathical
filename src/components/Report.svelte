<script>
    import { problems } from '../stores.js';
    export let input; 

    let getAnswer = (id) => {
        let filtered = input.filter((p) => {
            return p.id === id;
        });
        if (filtered) {
            return filtered[0].answer;
        }
        return ':)';
    }
</script>

<div>
    <h3>Report</h3>
    <table border="1">
        <thead>
            <tr>
                <th>Problem #</th>
                <th>Equation</th>
                <th>Answer</th>
                <th>Your Answer</th>
            </tr>
        </thead>
        <tbody>
            {#each $problems as problem}
            <tr class={problem.a !== getAnswer(problem.id) ? 'incorrect' : ''}>
                <td>{problem.id}</td>
                <td>{problem.l} {problem.op} {problem.r}</td>
                <td>{problem.a}</td>
                <td>{getAnswer(problem.id)}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    table {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }
    .incorrect {
        background-color: #ff3e00;
    }
</style>