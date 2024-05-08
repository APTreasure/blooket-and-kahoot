javascript: (async () => {
    const cheat = async () => {
        // Set interval to answer questions continuously
        setInterval(() => {
            const { stateNode: { state, props } } = Object.values(
                (function findStateNode(node = document.querySelector("body > div")) {
                    // Recursively find the stateNode in the React component tree
                    return Object.values(node)[1]?.children?.[0]?._owner.stateNode
                        ? node
                        : findStateNode(node.querySelector(":scope > div"));
                })()
            )[1].children[0]._owner;

            const question = state.question || props.client.question;

            // Iterate over all answer options and click the correct ones
            [...document.querySelectorAll(`[class*="answerContainer"]`)].forEach((answer, i) => {
                if (question.correctAnswers.includes(question.answers[i])) {
                    answer.click(); // Click the correct answer option
                }
            });
        }, 500); // Interval set to 500ms to check and answer questions
    };

    cheat(); // Start answering questions
})();
