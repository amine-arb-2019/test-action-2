const github = require("@actions/github");
const core = require("@actions/core");

async function run() {


    const { context } = github;
    core.debug(`context`)

    const { GITHUB_TOKEN } = core.getInput("github-token");
    core.debug("Github token " + core.getInput("github-token"));
    let prHasComment = false;

    core.info(`context ${context}!`);

//    core.debug("context.payload" + context.payload);


    const { payload } = github.context;
    const labelNameToWatchFor = core.getInput("string-list");

/**  let prHasLabel = false;
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
        console.log("Author: " + author); */  
}


run().catch(err => {
    core.error(err);
    core.setFailed("Unexpected error");
});


