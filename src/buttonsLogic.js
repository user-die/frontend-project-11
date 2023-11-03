const buttonsLogic = (modalText, posts) => {
    const postButtons = document.querySelectorAll('.btn-outline-primary');
  
    postButtons.forEach((i) => i.addEventListener('click', () => {
      document.querySelector('.modal').style = 'display: block';
      document.querySelector('.modal').classList = 'modal fade show';
      modalText = document.getElementById(`${i.id}`).textContent;
      document.querySelector('h5').textContent = modalText;
      document.querySelector('.full-article').href = document.getElementById(
        `${i.id}`,
      ).href;
      document.getElementById(`${i.id}`).classList = 'fw-normal link-secondary';
      document.querySelector('.text-break').textContent = posts[i.id - 1].item.querySelector('description').textContent;
    }));
  
    document.querySelectorAll('.fw-bold').forEach((i) => i.addEventListener('click', () => {
      document.getElementById(`${i.id}`).classList = 'fw-normal link-secondary';
    }));
  
    document.querySelector('.btn-secondary').addEventListener('click', () => {
      document.querySelector('.modal').style = 'display: none';
      document.querySelector('.modal').classList = 'modal fade';
    });
  
    document.querySelector('.close').addEventListener('click', () => {
      document.querySelector('.modal').style = 'display: none';
      document.querySelector('.modal').classList = 'modal fade';
    });
};

export default buttonsLogic;
