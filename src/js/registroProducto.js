document.addEventListener('DOMContentLoaded', () => {
  const description = document.getElementById('productDescription');
  const charCount = document.getElementById('charCount');
  const imageInput = document.getElementById('productImage');
  const imagePreview = document.getElementById('imagePreview');
  const removeImageBtn = document.getElementById('removeImageBtn');
  const form = document.getElementById('productForm');
  const submitBtn = document.getElementById('submitBtn');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');


  // Vista previa de la imagen
  imageInput.addEventListener('change', function () {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        removeImageBtn.classList.remove('hidden');
      };
      reader.readAsDataURL(this.files[0]);
    }
  });

  removeImageBtn.addEventListener('click', () => {
    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    imageInput.value = '';
    removeImageBtn.classList.add('hidden');
  });

  // Validar y simular envío
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.productName.value.trim();
    const desc = form.productDescription.value.trim();
    const brand = form.productBrand.value.trim();
    const cat = form.productCategory.value;
    const image = form.productImage.value;

    if (!name || !desc || !brand || !cat || !image) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    if (desc.length < 50) {
      alert('La descripción debe tener al menos 50 caracteres');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

    setTimeout(() => {
      successModal.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-save"></i> Registrar Producto';
    }, 1500);
  });

  // Cerrar modal
  closeModalBtn.addEventListener('click', () => {
    successModal.classList.add('hidden');
    form.reset();
    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    removeImageBtn.classList.add('hidden');
    charCount.textContent = '0/50';
  });
});
