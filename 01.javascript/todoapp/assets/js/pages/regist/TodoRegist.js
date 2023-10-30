// 할일 등록

const TodoRegist = function () {
  const page = document.createElement('div');
  const saveBtn = document.createElement('button');
  saveBtn.innerHTML = '저장';
  const cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = '취소';
  const inputTitle = document.createElement('input');
  const inputDetail = document.createElement('input');


  page.appendChild(saveBtn);
  page.appendChild(cancelBtn);
  page.appendChild(inputTitle);
  page.appendChild(inputDetail);

  return page;
};

export default TodoRegist;
