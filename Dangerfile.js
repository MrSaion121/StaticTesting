// Dangerfile.js

const commitMessages = danger.git.commits;

commitMessages.forEach((commit) => {
  const message = commit.message;
  const lines = message.split('\n');

  // 1. Check if the title exceeds 50 characters
  const title = lines[0];
  if (title.length > 50) {
    fail(`Commit title "${title}" exceeds 50 characters.`);
  }

  // 2. Check if there's an empty line between the title and the description
  if (lines.length > 1 && lines[1].trim() !== '') {
    fail(`Commit "${title}" must have an empty line between the title and the description.`);
  }

  // 3. Check if description has at least 5 characters
  const description = lines.slice(2).join(' ').trim();
  if (description.length > 0 && description.length < 5) {
    warn(`Commit "${title}" has a description that is too short (minimum 5 characters).`);
  }

  // 4. Check if any line in the description exceeds 72 characters
  lines.slice(2).forEach((line, index) => {
    if (line.length > 72) {
      warn(`Line ${index + 1} in the description of commit "${title}" exceeds 72 characters.`);
    }
  });
});
