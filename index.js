const github = require("@actions/github");
const core = require("@actions/core");

async function run() {

    const { GITHUB_TOKEN } = process.env;
    let prHasComment = false;
    if (!GITHUB_TOKEN) {
        core.setFailed('If "reaction" is supplied, GITHUB_TOKEN is required');
        return;
    }    

    const { payload } = github.context;
    const labelNameToWatchFor = core.getInput("label-name-to-watch-for");

    let prHasLabel = false;
    payload.pull_request.labels.forEach((label) => {
        if (label.name === labelNameToWatchFor) {
            prHasLabel = true;
        }
    });

    if (context.eventName === "issue_comment" && !context.payload.issue.pull_request) { // issue
        console.log("Not a PR comment skipping !!!");
        return;
    } 

    if (context.eventName === "issue_comment" && context.payload.issue.pull_request) { // comment on PR
        console.log("Payload :" + context.payload);
        const body = context.payload.pull_request.body;
        const listOfStrings = core.getInput("string-list");
        listOfStrings.forEach(function (item) {
            if (body.startWith(item) || !body.includes(item)) {
                prHasComment = true;
            }
        });

        const author = context.payload.pull_request.author;
        console.log("Author: " + author);
    }

       

    }


run().catch(err => {
    console.error(err);
    core.setFailed("Unexpected error");
});


