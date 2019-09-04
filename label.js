const github = require('@actions/github');
const core = require('@actions/core');

async function label() {
    const myToken = core.getInput('myToken');
    const octokit = new github.GitHub(myToken);
    const context = github.context;

    await octokit.issues.update({
        owner: context.payload.repository.owner.name,
        repo: context.payload.repository.name,
        number: context.payload.issue.number,
        labels: ["needs-triage"]
    });

    return context.payload.issue.number;
}

label()
   .then(
      (number) => { console.log(`Labelled ${number}`) },
      (err)  => { console.log(err) }
   )
   .then(
       () => { process.exit() }
    )