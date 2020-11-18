const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const html = `
<button type="button" onclick="upload()" style="position: fixed;top:0;right:0;width: 200px;height: 4rem;margin: 5rem 0 2.2rem;color: rgba(255, 255, 255, 0.8);background: #FF3366;font-size: 1.5rem;border-radius: 3rem;cursor: pointer;overflow: hidden;">Upload</button>
`;

document.body.insertAdjacentHTML("beforeend", html);

const sendData = async (q) => {
  const request = await fetch("https://inha-quiz.herokuapp.com/getInfo", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(q),
  });

  const result = await request.json();
  alert("Uploaded");
  console.log(result);
};

const questions = $$(".que.multichoice");

const obj = [];

for (const question of questions) {
  let text = question.querySelector(".qtext").innerText;
  let answer = question.querySelector('input[checked="checked"]');
  console.log(answer);
  let pNode = answer.parentNode;
  let answerText = pNode.querySelector("label").innerText;

  obj.push({
    question: text,
    answer: answerText,
  });
}

const upload = () => {
  console.log(obj);
  sendData(obj);
};
