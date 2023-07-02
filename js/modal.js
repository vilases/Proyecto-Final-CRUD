const { createApp } = Vue

const modalImg = {
  template: `
    <div id="imageModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <img id="modalImage" :src="imageURL" alt="Modal Image">
          </div>
        </div>
      </div>
    </div>
  `,
  props: ['imageURL']
};

const appModal = createApp({});
appModal.component('image-modal', modalImg);

export default appModal;