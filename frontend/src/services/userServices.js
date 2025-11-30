import api from './api';

export const getPublicTools = async () => {
  try {
    const response = await api.get('/tools');
    
    return response.data.map(tool => ({
      id: tool.id,
      name: tool.name,
      category: tool.category_id,
      type: tool.type,
      size: tool.size,
      dimensions: tool.dimensions,
      weight_cap: tool.weight_cap,
      description: tool.description,
      stock: tool.stock,
      condition: tool.condition,
      image_url: tool.image_url,
    }));
  } catch (error) {
    console.error("Gagal ambil alat:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data; 
  } catch (error) {
    console.error("Gagal ambil kategori:", error);
    return [
      { id: 'mobilitas', name: 'Mobilitas' },
      { id: 'rehabilitasi', name: 'Rehabilitasi' },
      { id: 'pernapasan', name: 'Pernapasan' },
    ];
  }
};