import api from '../api/api.js'; // Importamos la instancia de axios configurada

export const updateUserField = async (field, value) => {
  try {
    const response = await api.patch('/users/me', { [field]: value });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar el campo');
  }
};

export const updatePassword = async (newPassword) => {
  try {
    const response = await api.patch('/users/me/password', { password: newPassword });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar la contraseña');
  }
};

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append('profilePicture', file);
  
  try {
    const response = await api.post('/users/me/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al subir la imagen');
  }
};