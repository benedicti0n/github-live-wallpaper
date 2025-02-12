let timeoutId: NodeJS.Timeout | null = null;
let taskCounter = 0; // Counter to track tasks

export const removeGithubDataFromLocalStorage = async () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
        console.log(`Cleared timeout for task #${taskCounter}`);
    }
    taskCounter++;
    console.log(`Setting timeout for task #${taskCounter}`);

    timeoutId = setTimeout(() => {
        console.log(`Executing task #${taskCounter}`);
        localStorage.removeItem("githubData");
        timeoutId = null; // Reset the timeoutId after execution
    }, 10 * 60 * 1000);
}