// your code here
function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoDisplay =
    '<ul>' +
    repos
      .map(repo => {
        const dataUsername = 'data-username="' + repo.owner.login + '"';
        const dataRepoName = 'data-repository="' + repo.name + '"';
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('repositories').innerHTML = repoDisplay;
}

function getRepositories() {
  const xhr = new XMLHttpRequest();
  const name = document.getElementById('username').value;
  const uri = 'https://api.github.com/users/' + name + '/repos';

   xhr.addEventListener('load', displayRepositories);
  xhr.open('GET', uri);
  xhr.send();
  return false;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsDisplay = `<ul>${commits
    .map(
      commit =>
        '<li><h3>' +
        commit.commit.author.name +
        ' (' +
        commit.author.login +
        ')</h3>' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsDisplay;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const uri =
  'https://api.github.com/repos/' + el.dataset.username + '/' + repoName + '/commits';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayCommits);
  xhr.open('GET', uri);
  xhr.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesDisplay = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesDisplay;
}

 function getBranches(el) {
  const repoName = el.dataset.repository;
  const uri =
    'https://api.github.com/repos/' + el.dataset.username + '/' + repoName + '/branches';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', uri);
  xhr.send();
}
