const TodoInfo = () => {


  return <section>
    <div className="info-container">
        <input type="text" placeholder="TODO 제목을 입력하세요" className="title-input" disabled={true} maxLength={25} />
        <div className="time"></div>
        <textarea className="content-textarea" placeholder="TODO 상세 내용을 입력하세요" disabled={true}></textarea>
      <div className="button-container">
        <button className="info-button edit">수정</button>
        <button className="info-button delete">삭제</button>
      </div>
    </div>;
  </section>
};

export default TodoInfo;