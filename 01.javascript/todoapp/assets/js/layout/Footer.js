const Footer = function () {
  const footerNode = document.createElement("footer");
  const pNode = document.createElement("p");
  const content = document.createTextNode(
    "Developed By 김진우 김영채 김도현 현지수"
  );
  pNode.appendChild(content);
  footerNode.appendChild(pNode);
  return footerNode;
};

export default Footer;
