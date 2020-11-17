const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const sendData = async (q) => {
  const request = await fetch("http://localhost:3000/getInfo", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(q),
  });

  const result = await request.json();

  console.log(result);
};

const questions = $$(".que.multichoice");

const obj = [];

for (const question of questions) {
  let text = $(".qtext").innerText;
  let answer = $('input[checked="checked"]');
  console.log(answer);
  let pNode = answer.parentNode;
  let answerText = pNode.querySelector("label").innerText;

  obj.push({
    question: text,
    answer: answerText,
  });
}

console.log(obj);
sendData(obj);
